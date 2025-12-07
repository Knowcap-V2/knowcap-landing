
import React, { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { NotebookView } from './components/NotebookView';
import { QuickRecorder } from './components/QuickRecorder';
import { ScreenRecorder } from './components/ScreenRecorder';
import { Notebook, Source, Speaker } from './types';
import { loadNotebooks, saveNotebooks, createNotebook, hydrateNotebook, getKnownSpeakers, saveKnownSpeaker } from './services/storage';
import { analyzeAudio, analyzeScreenRecording, analyzeDocument } from './services/geminiService';
import { saveMediaToDB, getMediaFromDB, deleteMediaFromDB } from './services/db';
import { Loader2, Key } from 'lucide-react';

const App: React.FC = () => {
  const [hasApiKey, setHasApiKey] = useState(false);
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [activeNotebookId, setActiveNotebookId] = useState<string | null>(null);
  const [hydratedNotebook, setHydratedNotebook] = useState<Notebook | null>(null);
  const [isHydrating, setIsHydrating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenRecording, setIsScreenRecording] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  // Track active abort controllers for cancelling tasks
  const [abortControllers, setAbortControllers] = useState<Record<string, AbortController>>({});

  useEffect(() => {
    const checkKey = async () => {
      // Check if Gemini API key is configured (updated for production)
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      setHasApiKey(!!apiKey && apiKey !== 'placeholder_will_be_configured');
    };
    checkKey();
    setNotebooks(loadNotebooks());
  }, []);

  useEffect(() => {
    const hydrate = async () => {
        if (!activeNotebookId) {
            setHydratedNotebook(null);
            return;
        }
        const nb = notebooks.find(n => n.id === activeNotebookId);
        if (nb) {
            setIsHydrating(true);
            try {
                const fullNb = await hydrateNotebook(nb);
                setHydratedNotebook(fullNb);
            } catch (e) {
                console.error("Failed to hydrate notebook", e);
                setHydratedNotebook(nb);
            } finally {
                setIsHydrating(false);
            }
        }
    };
    hydrate();
  }, [activeNotebookId, notebooks]);

  const handleStartCreate = () => { setNewTitle(''); setIsCreating(true); };

  const handleCreateConfirm = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const newNotebook = createNotebook(newTitle);
      const updated = [newNotebook, ...notebooks];
      setNotebooks(updated);
      await saveNotebooks(updated);
      setIsCreating(false);
      setActiveNotebookId(newNotebook.id);
    } catch (err) {
      alert("Failed to create notebook. Storage quota might be exceeded.");
    }
  };

  const handleUpdateNotebook = async (updated: Notebook) => {
    const newNotebooks = notebooks.map(n => n.id === updated.id ? updated : n);
    setNotebooks(newNotebooks);
    try { await saveNotebooks(newNotebooks); } catch (err) { console.error(err); }
  };

  const handleCancelUpload = async (sourceId: string) => {
    console.log('[DELETE] Cancelling/deleting source:', sourceId);
    
    // Abort ongoing upload if there's an active controller
    if (abortControllers[sourceId]) {
      console.log('[DELETE] Aborting active upload for source:', sourceId);
      abortControllers[sourceId].abort();
      setAbortControllers(prev => {
        const next = {...prev};
        delete next[sourceId];
        return next;
      });
    }
    
    // Always remove source from notebook (works for both active uploads and old stuck files)
    if (activeNotebookId) {
      const nb = notebooks.find(n => n.id === activeNotebookId);
      if (nb) {
        console.log('[DELETE] Removing source from notebook:', sourceId);
        const sourceToDelete = nb.sources.find(s => s.id === sourceId);
        
        // Clean up media blob from IndexedDB if it exists
        if (sourceToDelete) {
          try {
            console.log('[DELETE] Cleaning up media from IndexedDB for source:', sourceId);
            await deleteMediaFromDB(sourceId);
            console.log('[DELETE] Successfully deleted media from IndexedDB');
          } catch (err) {
            console.error('[DELETE] Failed to delete media from IndexedDB:', err);
          }
        }
        
        const updated = { ...nb, sources: nb.sources.filter(s => s.id !== sourceId) };
        await handleUpdateNotebook(updated);
        console.log('[DELETE] Source successfully removed from notebook');
      }
    }
  };

  // 1. Create Source Immediately (Instant UI Feedback)
  // 2. Persist Media & Start Analysis in Background
  const handleUploadFiles = async (notebookId: string, files: FileList) => {
    console.log(`[Knowapp] handleUploadFiles called with ${files.length} file(s)`);
    const nb = notebooks.find(n => n.id === notebookId);
    if (!nb) {
      console.error('[Knowapp] Notebook not found:', notebookId);
      return;
    }

    const newSources: Source[] = [];
    const backgroundQueue: { sourceId: string, file: File, type: Source['type'] }[] = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const sourceId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString() + Math.random();
        
        let type: Source['type'] = 'text';
        if (file.type.startsWith('audio/')) type = 'audio';
        else if (file.type.startsWith('video/')) type = 'video';
        else if (file.type === 'application/pdf') type = 'pdf';

        console.log(`[Knowapp] Processing file: ${file.name} (${file.type}) -> type: ${type}, size: ${file.size} bytes`);

        // Use Blob URL for immediate playback/display without waiting for Base64 conversion
        const blobUrl = (type === 'audio' || type === 'video' || type === 'pdf') ? URL.createObjectURL(file) : undefined;
        console.log(`[Knowapp] Created blob URL for ${file.name}: ${blobUrl}`);

        // Initial Source State
        const source: Source = {
            id: sourceId,
            title: file.name,
            type,
            content: "", 
            createdAt: Date.now(),
            processingStatus: 'processing', // Explicitly 'processing' = Upload Phase
            processingProgress: 1, 
            originalFileName: file.name,
            audioData: type === 'audio' ? blobUrl : undefined,
            // We use videoData to store PDF blobs as well, as they are "visual" media content
            videoData: (type === 'video' || type === 'pdf') ? blobUrl : undefined,
        };

        console.log(`[Knowapp] Created source object for ${sourceId}:`, { id: sourceId, title: file.name, type, status: 'processing' });
        newSources.push(source);
        backgroundQueue.push({ sourceId, file, type });
        
        // Handle text immediately if simple
        if (type === 'text') {
             console.log(`[Knowapp] Reading text file immediately: ${file.name}`);
             const reader = new FileReader();
             reader.onload = (e) => {
                 source.content = e.target?.result as string || "";
                 source.processingStatus = 'completed';
                 source.processingProgress = 100;
                 console.log(`[Knowapp] Text file ${sourceId} completed immediately`);
                 updateSourceInState(notebookId, source);
             };
             reader.readAsText(file);
        }
    }

    // 1. Update UI IMMEDIATELY
    console.log(`[Knowapp] Updating UI with ${newSources.length} new source(s)`);
    const updatedNb = { ...nb, sources: [...newSources, ...nb.sources] };
    handleUpdateNotebook(updatedNb);

    // 2. Process Background Tasks (DB Save + AI Analysis)
    // Run this async to not block
    (async () => {
        for (const item of backgroundQueue) {
            if (item.type === 'text') continue;

            try {
                // Save File object directly to IndexedDB (Fast!)
                console.log(`[Knowapp] Saving ${item.file.name} to IndexedDB`);
                if (item.type === 'audio' || item.type === 'video' || item.type === 'pdf') {
                    await saveMediaToDB(item.sourceId, item.file);
                    console.log(`[Knowapp] Successfully saved ${item.file.name} to IndexedDB`);
                }
                
                // Now start AI
                console.log(`[Knowapp] Starting AI analysis for ${item.file.name}`);
                processSourceBackground(notebookId, item.sourceId, item.file);

            } catch (err) {
                console.error(`[Knowapp] Background processing failed for ${item.file.name}:`, err);
                updateSourceInState(notebookId, {
                    id: item.sourceId,
                    processingStatus: 'failed',
                    processingError: "Failed to save or process file."
                });
            }
        }
    })();
  };

  const handleRetrySource = async (sourceId: string) => {
      if (!activeNotebookId) return;
      const nb = notebooks.find(n => n.id === activeNotebookId);
      if (!nb) return;
      const source = nb.sources.find(s => s.id === sourceId);
      if (!source) return;

      // Reset state to processing
      updateSourceInState(activeNotebookId, {
          id: sourceId,
          processingStatus: 'analyzing', // Go straight to analyzing if we have the file
          processingProgress: 1,
          processingError: undefined
      });

      // Retrieve media from DB
      let blob: Blob | string | undefined;

      // Try IndexedDB first
      const dbData = await getMediaFromDB(sourceId);
      if (dbData) {
          blob = dbData;
      } else if ((source.type === 'audio' || source.type === 'video') && source.audioData && source.audioData.startsWith('blob:')) {
           // Fallback: try fetching from blob url (might fail if revoked)
           try {
              const r = await fetch(source.audioData || source.videoData || "");
              blob = await r.blob();
           } catch(e) { console.error("Could not fetch blob for retry"); }
      }

      if (blob) {
          processSourceBackground(activeNotebookId, sourceId, blob);
      } else {
          updateSourceInState(activeNotebookId, {
              id: sourceId,
              processingStatus: 'failed',
              processingError: "Original file not found for retry."
          });
      }
  };

  const updateSourceInState = (notebookId: string, updatedSource: Partial<Source> & { id: string }) => {
     setNotebooks(prev => prev.map(n => {
         if (n.id !== notebookId) return n;
         return {
             ...n,
             sources: n.sources.map(s => s.id === updatedSource.id ? { ...s, ...updatedSource } : s)
         };
     }));
  };

  const processSourceBackground = async (notebookId: string, sourceId: string, fileOrBlob: File | Blob | string) => {
      console.log(`[Knowapp] Starting background processing for source ${sourceId}`);
      const abortController = new AbortController();
      setAbortControllers(prev => ({...prev, [sourceId]: abortController}));
      
      // Update status to analyzing to switch UI mode
      console.log(`[Knowapp] Transitioning source ${sourceId} to 'analyzing' status`);
      updateSourceInState(notebookId, { id: sourceId, processingStatus: 'analyzing' });

      let progressInterval: number | undefined;
      let currentP = 0;

      const setProgress = (val: number) => {
          currentP = val;
          console.log(`[Knowapp] Progress update for ${sourceId}: ${val}%`);
          updateSourceInState(notebookId, { 
              id: sourceId, 
              processingStatus: 'analyzing', 
              processingProgress: Math.min(val, 99) 
          });
      };

      const onProgress = (status: string) => {
          console.log(`[Knowapp] Progress status for ${sourceId}: ${status}`);
          if (progressInterval) clearInterval(progressInterval);

          let p = 10;
          const lower = (status || "").toLowerCase();
          
          if (lower.includes('uploading large file')) p = 30; 
          else if (lower.includes('initializing') || lower.includes('sending')) p = 15;
          else if (lower.includes('file uploaded')) p = 50;
          else if (lower.includes('processing')) p = 60;
          else if (lower.includes('analyzing') || lower.includes('generating') || lower.includes('transcribing')) p = 75;
          
          setProgress(p);

          // Simulate progress during generation
          if (p >= 75) {
             progressInterval = window.setInterval(() => {
                 if (currentP < 98) {
                    setProgress(currentP + 1);
                 }
             }, 800); 
          }
      };

      try {
          let mimeType = 'application/octet-stream';
          if (fileOrBlob instanceof File || fileOrBlob instanceof Blob) {
             mimeType = fileOrBlob.type;
          }
          console.log(`[Knowapp] Processing file with mimeType: ${mimeType}`);

          const knownSpeakers = getKnownSpeakers();
          let result;

          if (mimeType.startsWith('video/')) {
              console.log(`[Knowapp] Calling analyzeScreenRecording for ${sourceId}`);
              result = await analyzeScreenRecording(fileOrBlob, mimeType, knownSpeakers, onProgress, abortController.signal);
          } else if (mimeType.startsWith('audio/')) {
              console.log(`[Knowapp] Calling analyzeAudio for ${sourceId}`);
              result = await analyzeAudio(fileOrBlob, mimeType, knownSpeakers, onProgress, abortController.signal);
          } else if (mimeType === 'application/pdf') {
              console.log(`[Knowapp] Processing PDF for ${sourceId}`);
              // Convert blob to base64 for PDF analysis helper
              let b64 = "";
              if (typeof fileOrBlob === 'string') b64 = fileOrBlob;
              else {
                 const ab = await (fileOrBlob as Blob).arrayBuffer();
                 const bytes = new Uint8Array(ab);
                 let binary = '';
                 const len = bytes.byteLength;
                 for (let i = 0; i < len; i++) { binary += String.fromCharCode(bytes[i]); }
                 b64 = btoa(binary);
              }
              result = await analyzeDocument(b64, mimeType, onProgress, abortController.signal);
          }

          if (result) {
               console.log(`[Knowapp] Analysis completed successfully for ${sourceId}`, result);
               // Auto-save known speakers logic...
               const speakers = (result as any).speakers || [];
               speakers.forEach((s: any) => {
                   // Ensure we have a valid label before using string methods
                   const label = s.label || s.name || "";
                   if (label && label !== s.id && !label.toLowerCase().includes('speaker')) {
                       saveKnownSpeaker({ name: label, voiceProfile: s.voiceProfile });
                   }
               });

               const finalSpeakers = speakers.map((s: any) => {
                    const label = s.label || s.id || "Unknown";
                    const safeLabel = (label || "").toString();
                    const name = safeLabel; 
                    const colors = ['bg-red-100 text-red-700', 'bg-blue-100 text-blue-700', 'bg-green-100 text-green-700', 'bg-purple-100 text-purple-700'];
                    const colorIdx = name.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) % colors.length;
                    return { ...s, name, color: colors[colorIdx] };
               });

               console.log(`[Knowapp] Setting source ${sourceId} to 'completed' status`);
               updateSourceInState(notebookId, {
                   id: sourceId,
                   content: `${result.summary}\n\n--- TRANSCRIPT ---\n\n${result.transcription}`,
                   speakers: finalSpeakers,
                   processingStatus: 'completed',
                   processingProgress: 100
               });
          } else {
               console.error(`[Knowapp] Analysis returned null/undefined for ${sourceId}`);
               updateSourceInState(notebookId, {
                   id: sourceId,
                   processingStatus: 'failed',
                   processingError: "Analysis returned no results"
               });
          }
      } catch (err: any) {
          if (err.message !== 'Aborted') {
            console.error(`[Knowapp] Analysis failed for ${sourceId}:`, err);
            console.error(`[Knowapp] Error stack:`, err.stack);
            updateSourceInState(notebookId, {
                id: sourceId,
                processingStatus: 'failed',
                processingError: err.message || "Analysis failed"
            });
          } else {
            console.log(`[Knowapp] Processing aborted for ${sourceId}`);
          }
      } finally {
          if (progressInterval) clearInterval(progressInterval);
          setAbortControllers(prev => {
             const next = {...prev};
             delete next[sourceId];
             return next;
          });
          console.log(`[Knowapp] Cleanup completed for ${sourceId}`);
      }
  };

  const handleUpdateSpeakerName = async (notebookId: string, sourceId: string, speakerId: string, newName: string) => {
     const nb = notebooks.find(n => n.id === notebookId);
     const source = nb?.sources.find(s => s.id === sourceId);
     if (!source) return;

     // Ensure we handle "Ad-hoc" speakers (labels found in transcript but not in original metadata)
     const speakers = source.speakers || [];
     const existingSpeaker = speakers.find(s => s.id === speakerId);
     
     // 1. Capture the previous name (if any) to perform a comprehensive find-and-replace
     const oldName = existingSpeaker ? existingSpeaker.name : null;

     let updatedSpeakers: Speaker[];
     if (existingSpeaker) {
        updatedSpeakers = speakers.map(s => s.id === speakerId ? { ...s, name: newName } : s);
     } else {
        // Create new speaker entry if identifying a label found in text
        const colors = ['bg-red-100 text-red-700', 'bg-blue-100 text-blue-700', 'bg-green-100 text-green-700'];
        const colorIdx = newName.length % colors.length;
        updatedSpeakers = [...speakers, { id: speakerId, label: speakerId, name: newName, color: colors[colorIdx] }];
     }

     let content = source.content;
     
     // 2. Build Regex to target BOTH the Speaker ID AND the Old Name (if different)
     // This ensures we catch "SPEAKER_01" AND "Sam" when renaming to "Ali"
     const targets = [speakerId];
     if (oldName && oldName !== speakerId) {
         targets.push(oldName);
     }

     // Escape special regex characters in all targets and join with OR (|)
     const pattern = targets.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
     
     // Global case-insensitive replacement
     const regex = new RegExp(`(${pattern})`, 'gi'); 
     content = content.replace(regex, newName);

     if (existingSpeaker?.voiceProfile) {
         saveKnownSpeaker({ name: newName, voiceProfile: existingSpeaker.voiceProfile });
     }

     updateSourceInState(notebookId, { id: sourceId, speakers: updatedSpeakers, content });
     
     const updatedNb = { ...nb!, sources: nb!.sources.map(s => s.id === sourceId ? { ...s, speakers: updatedSpeakers, content } : s) };
     handleUpdateNotebook(updatedNb);
  };

  const handleSaveMedia = async (notebookId: string, mediaData: string, transcription: string, speakers: Speaker[], summary: string) => {
    // Legacy support for QuickRecorder / ScreenRecorder saving
    const currentNotebooks = loadNotebooks();
    const notebook = currentNotebooks.find(n => n.id === notebookId);
    if (!notebook) return;

    const isVideo = mediaData.includes('video/');
    const type: 'audio' | 'video' = isVideo ? 'video' : 'audio';
    const finalMediaData = mediaData.startsWith('data:') ? mediaData : `data:${type}/webm;base64,${mediaData}`;
    
    let finalTranscription = transcription || "";
    speakers.forEach(s => {
        if (s.name && s.name !== s.id) {
           finalTranscription = finalTranscription.replace(new RegExp(s.id, 'g'), s.name);
        }
    });

    const newSource: Source = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      title: isVideo ? `Screen Recording` : `Audio Recording`,
      type: type,
      content: `${summary}\n\n--- TRANSCRIPT ---\n\n${finalTranscription}`,
      audioData: !isVideo ? finalMediaData : undefined,
      videoData: isVideo ? finalMediaData : undefined,
      createdAt: Date.now(),
      speakers: speakers,
      processingStatus: 'completed'
    };

    const updated = { ...notebook, sources: [newSource, ...notebook.sources], updatedAt: Date.now() };
    await handleUpdateNotebook(updated);
    setIsRecording(false);
    setIsScreenRecording(false);
  };

  if (!hasApiKey) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                <Key className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Knowapp</h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
                To start creating audio notebooks and transcribing content, please configure your Google Gemini API key in the environment variables.
            </p>
            
            <div className="text-sm text-gray-600 bg-gray-50 rounded-xl p-4 text-left mb-6">
                <p className="font-semibold mb-2">Setup Instructions:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Get your API key from Google AI Studio</li>
                    <li>Set NEXT_PUBLIC_GEMINI_API_KEY in .env</li>
                    <li>Restart the development server</li>
                </ol>
            </div>
            
            <div className="mt-6 text-xs text-gray-400">
                Need a key? <a href="https://ai.google.dev/gemini-api/docs/api-key" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Get Gemini API Key</a>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 relative">
      {activeNotebookId ? (
        isHydrating ? (
           <div className="flex flex-col items-center justify-center h-screen">
             <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
             <p className="text-gray-500 font-medium">Loading Notebook...</p>
           </div>
        ) : hydratedNotebook ? (
            <NotebookView 
                notebook={hydratedNotebook} 
                onBack={() => setActiveNotebookId(null)}
                onUpdateNotebook={handleUpdateNotebook}
                onUploadFiles={handleUploadFiles}
                onCancelUpload={handleCancelUpload}
                onUpdateSpeaker={(sid, spkId, name) => handleUpdateSpeakerName(activeNotebookId, sid, spkId, name)}
                onRetrySource={handleRetrySource}
            />
        ) : <div className="p-10">Error loading.</div>
      ) : (
        <HomePage 
          notebooks={notebooks} 
          onSelectNotebook={setActiveNotebookId}
          onStartRecording={() => setIsRecording(true)}
          onStartScreenRecording={() => setIsScreenRecording(true)}
          onCreateNotebook={handleStartCreate}
        />
      )}

      {isRecording && <QuickRecorder notebooks={notebooks} onCancel={() => setIsRecording(false)} onSave={handleSaveMedia} />}
      {isScreenRecording && <ScreenRecorder notebooks={notebooks} onCancel={() => setIsScreenRecording(false)} onSave={handleSaveMedia} />}
      
      {isCreating && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-xl font-semibold mb-1">New Notebook</h2>
            <p className="text-sm text-gray-500 mb-4">Name your collection.</p>
            <form onSubmit={handleCreateConfirm}>
              <input autoFocus type="text" placeholder="Notebook Title" className="w-full border rounded-xl px-4 py-2 mb-4" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 rounded text-gray-600 hover:bg-gray-100">Cancel</button>
                <button type="submit" disabled={!newTitle.trim()} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
