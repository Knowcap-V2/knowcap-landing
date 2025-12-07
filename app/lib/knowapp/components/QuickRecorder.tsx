
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader2, User, Check, X, FileAudio, Users, AlertTriangle } from 'lucide-react';
import { analyzeAudio } from '../services/geminiService';
import { getKnownSpeakers, saveKnownSpeaker } from '../services/storage';
import { Notebook, Speaker } from '../types';

interface QuickRecorderProps {
  notebooks: Notebook[];
  onSave: (notebookId: string, audioData: string, transcription: string, speakers: Speaker[], summary: string) => void;
  onCancel: () => void;
}

type RecorderState = 'recording' | 'processing' | 'identifying' | 'selecting';

export const QuickRecorder: React.FC<QuickRecorderProps> = ({ notebooks, onSave, onCancel }) => {
  const [recorderState, setRecorderState] = useState<RecorderState>('recording');
  const [elapsed, setElapsed] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [mimeType, setMimeType] = useState<string>('audio/webm');
  const [analysisResult, setAnalysisResult] = useState<{ summary: string; speakers: { id: string; label: string; voiceProfile: string }[]; transcription: string } | null>(null);
  const [speakerMappings, setSpeakerMappings] = useState<Record<string, string>>({});
  const [autoIdentifiedNames, setAutoIdentifiedNames] = useState<string[]>([]);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | undefined>(undefined);
  // Ref to hold blob for immediate access without waiting for state updates
  const latestAudioBlobRef = useRef<Blob | null>(null);

  // Start recording on mount
  useEffect(() => {
    startRecording();
    return () => stopRecordingCleanup();
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Prefer webm/opus, fallback to default
      let options = {};
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        options = { mimeType: 'audio/webm;codecs=opus' };
        setMimeType('audio/webm;codecs=opus');
      } else if (MediaRecorder.isTypeSupported('audio/webm')) {
        options = { mimeType: 'audio/webm' };
        setMimeType('audio/webm');
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        options = { mimeType: 'audio/mp4' };
        setMimeType('audio/mp4');
      }

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mediaRecorder.mimeType || 'audio/webm' });
        setAudioBlob(blob);
        latestAudioBlobRef.current = blob;
      };

      mediaRecorder.start(1000); // Collect in 1s chunks
      
      timerRef.current = window.setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error("Error accessing microphone:", err);
      onCancel();
    }
  };

  const stopRecordingCleanup = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleStop = () => {
    stopRecordingCleanup();
    setRecorderState('processing');
    
    // Allow a small delay for the onstop event to fire and blob to form
    setTimeout(() => {
        processAudio();
    }, 500);
  };

  const processAudio = async () => {
    const blobToProcess = latestAudioBlobRef.current || audioBlob;
    if (!blobToProcess) {
      console.error("No audio blob found");
      onCancel();
      return;
    }

    // Safety timeout: If analysis takes > 10m (600s), assume failure and let user save raw audio
    const safetyTimeout = setTimeout(() => {
        console.warn("Analysis timed out");
        handleAnalysisFailure("Analysis timed out. Saving raw audio.");
    }, 600000);

    try {
      // Convert Blob to Base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = (reader.result as string).split(',')[1];
        
        try {
          const knownSpeakers = getKnownSpeakers();
          const result = await analyzeAudio(base64data, blobToProcess.type, knownSpeakers);
          clearTimeout(safetyTimeout);
          
          setAnalysisResult(result);

          // Check if we have identified speakers
          const speakers = result.speakers || [];
          
          if (speakers.length === 0) {
             // No speakers found (or silence) - skip to select notebook
             setRecorderState('selecting');
             return;
          }

          // Pre-fill known speakers
          const initialMappings: Record<string, string> = {};
          const autoFound: string[] = [];

          speakers.forEach(s => {
             const label = s.label || "";
             const lowerLabel = label.toLowerCase();
             
             // Check if this label strictly matches a KNOWN SPEAKER
             const isKnown = knownSpeakers.some(k => k.name.toLowerCase() === lowerLabel);
             
             // Only auto-fill if it's a known speaker. 
             // Ignore descriptive labels like "Male Low Pitch" or generic IDs
             if (isKnown) {
                initialMappings[s.id] = label;
                autoFound.push(label);
             }
          });
          
          setSpeakerMappings(initialMappings);
          setAutoIdentifiedNames(autoFound);

          // If ALL speakers are identified (known), skip the manual identification step
          if (speakers.length > 0 && speakers.every(s => initialMappings[s.id])) {
            setRecorderState('selecting'); 
          } else {
            setRecorderState('identifying');
          }

        } catch (apiError) {
          clearTimeout(safetyTimeout);
          console.error("API Analysis Error:", apiError);
          handleAnalysisFailure("Analysis failed. Saving raw audio.");
        }
      };
      reader.readAsDataURL(blobToProcess);
    } catch (e) {
      clearTimeout(safetyTimeout);
      console.error("Processing Error:", e);
      handleAnalysisFailure("Processing failed.");
    }
  };

  const handleAnalysisFailure = (message: string) => {
    setAnalysisError(message);
    setAnalysisResult({
        summary: "Audio recording (Analysis unavailable)",
        transcription: "(Transcription unavailable due to analysis error)",
        speakers: []
    });
    setRecorderState('selecting');
  };

  const handleSpeakerNameChange = (id: string, name: string) => {
    setSpeakerMappings(prev => ({ ...prev, [id]: name }));
  };

  const handleIdentifyDone = () => {
    // Save new speaker profiles
    if (analysisResult?.speakers) {
       analysisResult.speakers.forEach(s => {
          const assignedName = speakerMappings[s.id];
          if (assignedName && assignedName.trim() !== "") {
             saveKnownSpeaker({
                name: assignedName.trim(),
                voiceProfile: s.voiceProfile
             });
          }
       });
    }
    setRecorderState('selecting');
  };

  const handleNotebookSelect = async (notebookId: string) => {
    if (isSaving) return;
    setIsSaving(true);

    const blobToUse = latestAudioBlobRef.current || audioBlob;
    if (!blobToUse) {
        alert("Error: Audio data missing. Please try again.");
        setIsSaving(false);
        return;
    }

    try {
      const finalSpeakers: Speaker[] = (analysisResult?.speakers || []).map(s => {
        const label = s.label || s.id;
        const name = speakerMappings[s.id] || label;
        const colors = ['bg-red-100 text-red-700', 'bg-blue-100 text-blue-700', 'bg-green-100 text-green-700', 'bg-purple-100 text-purple-700'];
        // Hash string to pick color
        const colorIdx = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

        return {
          id: s.id,
          label: label,
          name: name,
          color: colors[colorIdx],
          voiceProfile: s.voiceProfile
        };
      });

      // Create a new file reader to get the base64 data to save
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          // Pass the FULL data URI (including mime type) to avoid App.tsx prefixing it incorrectly
          const fullDataUri = event.target?.result as string; 
          
          // Replace generic IDs with actual names in transcript
          let finalTranscription = analysisResult?.transcription || "";
          
          // Sort keys by length desc to avoid replacing SPEAKER_10 with Alice0
          const speakerIds = Object.keys(speakerMappings).sort((a,b) => b.length - a.length);
          
          speakerIds.forEach(id => {
             const name = speakerMappings[id];
             if (name && name.trim()) {
                // Global replace of ID with Name
                const regex = new RegExp(id, 'g');
                finalTranscription = finalTranscription.replace(regex, name);
             }
          });

          onSave(notebookId, fullDataUri, finalTranscription, finalSpeakers, analysisResult?.summary || "No summary available.");
        } catch (err) {
          console.error("Error creating save payload:", err);
          alert("Failed to prepare notebook data.");
          setIsSaving(false);
        }
      };
      reader.onerror = () => {
          alert("Failed to read audio file.");
          setIsSaving(false);
      };
      reader.readAsDataURL(blobToUse);
    } catch (e) {
        console.error("Error selecting notebook:", e);
        alert("An error occurred while saving.");
        setIsSaving(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative">
        <button onClick={onCancel} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-400 z-10">
          <X className="w-5 h-5" />
        </button>

        {/* State: Recording */}
        {recorderState === 'recording' && (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 relative">
               <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping"></div>
               <Mic className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Recording...</h2>
            <div className="text-4xl font-mono font-medium text-gray-900 mb-8 tracking-wider">
              {formatTime(elapsed)}
            </div>
            <button 
              onClick={handleStop}
              className="flex items-center gap-2 px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-red-200 font-medium"
            >
              <Square className="w-4 h-4 fill-current" /> Stop & Process
            </button>
          </div>
        )}

        {/* State: Processing */}
        {recorderState === 'processing' && (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-6" />
            <h2 className="text-xl font-medium text-gray-800 mb-2">Analyzing Audio</h2>
            <p className="text-gray-500 text-sm">Identifying speakers and transcribing...</p>
          </div>
        )}

        {/* State: Identifying Speakers */}
        {recorderState === 'identifying' && (
          <div className="flex flex-col h-[500px]">
            <div className="p-6 border-b bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" /> Identify Speakers
              </h2>
              <p className="text-sm text-gray-500 mt-1">Who was speaking in this recording?</p>
              
              {autoIdentifiedNames.length > 0 && (
                 <div className="mt-3 bg-blue-50 text-blue-700 text-xs px-3 py-2 rounded-lg border border-blue-100 flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Auto-recognized: <b>{autoIdentifiedNames.join(', ')}</b></span>
                 </div>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {analysisResult?.speakers.map((speaker) => (
                <div key={speaker.id} className="bg-white rounded-xl border p-4 shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-gray-400 mb-1">{speaker.id}</div>
                      <div className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-2 rounded-md">
                        {speaker.voiceProfile}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Alice, Bob (or leave blank for 'Speaker X')"
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      value={speakerMappings[speaker.id] || ""}
                      onChange={(e) => handleSpeakerNameChange(speaker.id, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button 
                onClick={handleIdentifyDone}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* State: Selecting Notebook */}
        {recorderState === 'selecting' && (
          <div className="flex flex-col h-[500px]">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FileAudio className="w-5 h-5 text-purple-600" /> Save to Notebook
              </h2>
            </div>

            {analysisError && (
              <div className="px-6 pt-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-800">Warning: {analysisError}</h4>
                    <p className="text-xs text-yellow-700 mt-1">
                      The audio is safe, but transcription is unavailable. You can still save it to a notebook.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              <h3 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Choose Destination</h3>
              
              {isSaving && (
                 <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center backdrop-blur-sm rounded-b-3xl">
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
                        <span className="text-sm font-medium text-gray-600">Saving...</span>
                    </div>
                 </div>
              )}

              {notebooks.length === 0 ? (
                <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-xl">
                    No notebooks yet.
                </div>
              ) : (
                notebooks.map(n => (
                    <button 
                    key={n.id}
                    onClick={() => handleNotebookSelect(n.id)}
                    disabled={isSaving}
                    className="w-full text-left p-4 rounded-xl border hover:border-blue-500 hover:bg-blue-50 transition-all group flex items-center gap-4 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    <div className={`w-12 h-12 rounded-lg ${n.coverColor} group-hover:scale-105 transition-transform shrink-0 shadow-sm`}></div>
                    <div>
                        <h4 className="font-medium text-gray-800">{n.title}</h4>
                        <span className="text-xs text-gray-500">{n.sources.length} sources</span>
                    </div>
                    </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
