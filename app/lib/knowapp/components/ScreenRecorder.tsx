
import React, { useState, useRef, useEffect } from 'react';
import { Square, Loader2, User, Check, X, Users, AlertTriangle, Monitor } from 'lucide-react';
import { analyzeScreenRecording } from '../services/geminiService';
import { getKnownSpeakers, saveKnownSpeaker } from '../services/storage';
import { Notebook, Speaker } from '../types';

interface ScreenRecorderProps {
  notebooks: Notebook[];
  onSave: (notebookId: string, mediaData: string, transcription: string, speakers: Speaker[], summary: string) => void;
  onCancel: () => void;
}

type RecorderState = 'recording' | 'processing' | 'identifying' | 'selecting';

export const ScreenRecorder: React.FC<ScreenRecorderProps> = ({ notebooks, onSave, onCancel }) => {
  const [recorderState, setRecorderState] = useState<RecorderState>('recording');
  const [elapsed, setElapsed] = useState(0);
  const [mediaBlob, setMediaBlob] = useState<Blob | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{ summary: string; speakers: { id: string; label: string; voiceProfile: string }[]; transcription: string } | null>(null);
  const [speakerMappings, setSpeakerMappings] = useState<Record<string, string>>({});
  const [autoIdentifiedNames, setAutoIdentifiedNames] = useState<string[]>([]);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | undefined>(undefined);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const latestBlobRef = useRef<Blob | null>(null);
  
  // Store the mime type we selected to force the blob to use it if recorder doesn't report one
  const selectedMimeTypeRef = useRef<string>('video/webm');

  // Start recording on mount
  useEffect(() => {
    startScreenRecording();
    return () => stopRecordingCleanup();
  }, []);

  const startScreenRecording = async () => {
    let tempScreenStream: MediaStream | null = null;
    let tempMicStream: MediaStream | null = null;

    try {
      // 1. Get Screen Stream (Video)
      // Optimized for text readability vs file size
      // 1280x720 is a good balance. 10fps is sufficient for docs.
      tempScreenStream = await navigator.mediaDevices.getDisplayMedia({ 
        video: {
            width: { ideal: 1280, max: 1920 }, 
            height: { ideal: 720, max: 1080 },
            frameRate: { ideal: 10, max: 15 } 
        }, 
        audio: true 
      });
      
      // 2. Get Mic Stream (Audio)
      tempMicStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
            echoCancellation: true,
            noiseSuppression: true
        } 
      });

      // 3. Combine Tracks
      const tracks = [
        ...tempScreenStream.getVideoTracks(),
        ...tempMicStream.getAudioTracks()
      ];
      
      const combinedStream = new MediaStream(tracks);
      streamRef.current = combinedStream;

      // Handle user stopping stream via browser UI
      tempScreenStream.getVideoTracks()[0].onended = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            handleStop();
        } else {
            // If stopped before recording started (e.g. during setup)
            onCancel();
        }
      };

      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = combinedStream;
      }

      // 4. Setup Recorder
      // Robust MimeType detection
      let mimeType = 'video/webm';
      if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')) {
        mimeType = 'video/webm;codecs=vp9,opus'; // VP9 is more efficient
      } else if (MediaRecorder.isTypeSupported('video/webm')) {
        mimeType = 'video/webm';
      } else if (MediaRecorder.isTypeSupported('video/mp4')) {
        mimeType = 'video/mp4'; // Essential for Safari
      }

      selectedMimeTypeRef.current = mimeType;

      const options: MediaRecorderOptions = { 
        mimeType, 
        // 100 kbps video + ~32 kbps audio approx.
        // This yields ~1MB per minute. 
        // 20MB limit allows for ~15-20 minutes safely.
        videoBitsPerSecond: 100000 
      };

      const mediaRecorder = new MediaRecorder(combinedStream, options);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const cleanType = selectedMimeTypeRef.current.split(';')[0];
        const blob = new Blob(chunksRef.current, { type: cleanType });
        console.log(`Recording stopped. Blob size: ${(blob.size / 1024 / 1024).toFixed(2)} MB. Type: ${blob.type}`);
        setMediaBlob(blob);
        latestBlobRef.current = blob;
      };

      mediaRecorder.start(1000); // 1s chunks
      
      timerRef.current = window.setInterval(() => {
        setElapsed(prev => {
            // Auto-stop at 15 minutes (900s) as a safe upper bound
            if (prev >= 900) {
                handleStop();
                return prev;
            }
            return prev + 1;
        });
      }, 1000);

    } catch (err: any) {
      // Cleanup partial streams if setup failed
      if (tempScreenStream) tempScreenStream.getTracks().forEach(t => t.stop());
      if (tempMicStream) tempMicStream.getTracks().forEach(t => t.stop());

      // Graceful exit if user cancels permission
      if (
        err.name === 'NotAllowedError' || 
        err.name === 'PermissionDeniedError' || 
        err.message?.includes('denied') ||
        err.message?.includes('Permission denied')
      ) {
        console.log("Recording cancelled by user.");
        onCancel();
      } else {
        console.error("Error accessing screen/mic:", err);
        alert("Could not start recording. Please check permissions.");
        onCancel();
      }
    }
  };

  const stopRecordingCleanup = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const handleStop = () => {
    stopRecordingCleanup();
    setRecorderState('processing');
    
    // Increased delay to ensure all chunks are processed and blob is created
    setTimeout(() => {
        processVideo();
    }, 1500); 
  };

  const processVideo = async () => {
    const blobToProcess = latestBlobRef.current || mediaBlob;
    
    if (!blobToProcess || blobToProcess.size === 0) {
      console.error("No media blob found or blob is empty");
      handleAnalysisFailure("Recording failed (empty file).");
      return;
    }

    // Client-side size check (19.5MB limit to leave room for overhead)
    if (blobToProcess.size > 19.5 * 1024 * 1024) {
         handleAnalysisFailure(`File too large (${(blobToProcess.size / 1024 / 1024).toFixed(1)}MB). Limit is ~20MB. Please record shorter segments.`);
         return;
    }

    const safetyTimeout = setTimeout(() => {
        console.warn("Analysis timed out");
        handleAnalysisFailure("Analysis timed out. Saving raw video.");
    }, 1800000); // 30 min timeout for analysis

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const resultString = reader.result as string;
        const base64data = resultString.split(',')[1];
        
        try {
          const knownSpeakers = getKnownSpeakers();
          const result = await analyzeScreenRecording(base64data, blobToProcess.type, knownSpeakers);
          clearTimeout(safetyTimeout);
          
          setAnalysisResult(result);

          // Speaker Logic
          const speakers = result.speakers || [];
          if (speakers.length === 0) {
             setRecorderState('selecting');
             return;
          }

          const initialMappings: Record<string, string> = {};
          const autoFound: string[] = [];
          speakers.forEach(s => {
             const label = s.label || "";
             const isGeneric = label.toLowerCase().includes('speaker') || label === s.id;
             if (!isGeneric && label) {
                initialMappings[s.id] = label;
                autoFound.push(label);
             }
          });
          setSpeakerMappings(initialMappings);
          setAutoIdentifiedNames(autoFound);

          if (speakers.length > 0 && speakers.every(s => s.label && !s.label.toLowerCase().includes('speaker') && s.label !== s.id)) {
            setRecorderState('selecting'); 
          } else {
            setRecorderState('identifying');
          }

        } catch (apiError: any) {
          clearTimeout(safetyTimeout);
          console.error("API Analysis Error:", apiError);
          const msg = apiError.message || "Unknown API error";
          handleAnalysisFailure(`Analysis failed (${msg}). Saving raw video.`);
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
        summary: "Screen Recording (Analysis unavailable)",
        transcription: "(Transcript unavailable)",
        speakers: []
    });
    setRecorderState('selecting');
  };

  const handleSpeakerNameChange = (id: string, name: string) => {
    setSpeakerMappings(prev => ({ ...prev, [id]: name }));
  };

  const handleIdentifyDone = () => {
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

    const blobToUse = latestBlobRef.current || mediaBlob;
    if (!blobToUse) {
        alert("Error: Video data missing.");
        setIsSaving(false);
        return;
    }

    try {
      const finalSpeakers: Speaker[] = (analysisResult?.speakers || []).map(s => {
        const label = s.label || s.id;
        const name = speakerMappings[s.id] || label;
        const colors = ['bg-red-100 text-red-700', 'bg-blue-100 text-blue-700', 'bg-green-100 text-green-700', 'bg-purple-100 text-purple-700'];
        const colorIdx = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

        return {
          id: s.id,
          label: label,
          name: name,
          color: colors[colorIdx],
          voiceProfile: s.voiceProfile
        };
      });

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const fullDataUri = event.target?.result as string; 
          
          let finalTranscription = analysisResult?.transcription || "";
          const speakerIds = Object.keys(speakerMappings).sort((a,b) => b.length - a.length);
          speakerIds.forEach(id => {
             const name = speakerMappings[id];
             if (name && name.trim()) {
                const regex = new RegExp(id, 'g');
                finalTranscription = finalTranscription.replace(regex, name);
             }
          });

          onSave(notebookId, fullDataUri, finalTranscription, finalSpeakers, analysisResult?.summary || "No summary.");
        } catch (err) {
          console.error("Save error:", err);
          alert("Failed to save.");
          setIsSaving(false);
        }
      };
      reader.readAsDataURL(blobToUse);
    } catch (e) {
        alert("Error saving.");
        setIsSaving(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative">
        <button onClick={onCancel} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-400 z-10">
          <X className="w-5 h-5" />
        </button>

        {/* State: Recording */}
        {recorderState === 'recording' && (
          <div className="flex flex-col items-center justify-center py-8 px-6 text-center">
            
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden mb-6 shadow-lg border border-gray-800">
                <video ref={videoPreviewRef} autoPlay muted className="w-full h-full object-cover opacity-80" />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div> REC
                </div>
                {elapsed >= 870 && (
                    <div className="absolute bottom-4 left-0 right-0 text-center text-yellow-400 text-xs font-bold bg-black/50 py-1">
                        Approaching time limit (15m)
                    </div>
                )}
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">Recording Screen</h2>
            <div className="text-3xl font-mono font-medium text-gray-900 mb-6 tracking-wider">
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
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-6" />
            <h2 className="text-xl font-medium text-gray-800 mb-2">Analyzing Video</h2>
            <p className="text-gray-500 text-sm">Identifying clicks, actions, and speakers...</p>
          </div>
        )}

        {/* State: Identifying Speakers */}
        {recorderState === 'identifying' && (
          <div className="flex flex-col h-[500px]">
            <div className="p-6 border-b bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" /> Identify Speakers
              </h2>
              <p className="text-sm text-gray-500 mt-1">Who was speaking during the recording?</p>
              
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
                      placeholder="e.g. Alice"
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      value={speakerMappings[speaker.id] || ""}
                      onChange={(e) => handleSpeakerNameChange(speaker.id, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button onClick={handleIdentifyDone} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">Continue</button>
            </div>
          </div>
        )}

        {/* State: Selecting Notebook */}
        {recorderState === 'selecting' && (
          <div className="flex flex-col h-[500px]">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-purple-600" /> Save Screen Recording
              </h2>
            </div>

            {analysisError && (
              <div className="px-6 pt-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-800">Warning: {analysisError}</h4>
                    <p className="text-xs text-yellow-700 mt-1">Video is safe, but transcription unavailable.</p>
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
                        <span className="text-sm font-medium text-gray-600">Saving Video...</span>
                    </div>
                 </div>
              )}
              {notebooks.length === 0 ? (
                <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-xl">No notebooks yet.</div>
              ) : (
                notebooks.map(n => (
                    <button key={n.id} onClick={() => handleNotebookSelect(n.id)} disabled={isSaving} className="w-full text-left p-4 rounded-xl border hover:border-blue-500 hover:bg-blue-50 transition-all group flex items-center gap-4 bg-white disabled:opacity-50">
                    <div className={`w-12 h-12 rounded-lg ${n.coverColor} shrink-0`}></div>
                    <div><h4 className="font-medium text-gray-800">{n.title}</h4><span className="text-xs text-gray-500">{n.sources.length} sources</span></div>
                    </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
