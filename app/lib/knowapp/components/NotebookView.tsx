
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Notebook, ChatMessage, Source, Speaker } from '../types';
import { chatWithNotebook } from '../services/geminiService';
import { getKnownSpeakers } from '../services/storage';
import { ArrowLeft, Mic, Upload, FileAudio, Play, Pause, Send, Bot, User as UserIcon, CheckSquare, Square, MinusSquare, Eye, Download, X, Loader2, Monitor, MousePointer2, Video, AlertCircle, FileText, RefreshCw, Volume2, Edit2, Check } from 'lucide-react';

interface NotebookViewProps {
  notebook: Notebook;
  onBack: () => void;
  onUpdateNotebook: (updated: Notebook) => void;
  onUploadFiles: (notebookId: string, files: FileList) => void;
  onCancelUpload: (sourceId: string) => void;
  onUpdateSpeaker: (sourceId: string, speakerId: string, newName: string) => void;
  onRetrySource: (sourceId: string) => void;
}

const getStatusText = (status?: string, progress?: number) => {
    const p = progress || 0;
    if (status === 'failed') return "Analysis Failed";
    if (status === 'processing') return "Uploading content...";
    if (status === 'analyzing' || status === 'transcribing') return "Loading Intelligence...";
    return "Processing...";
};

const FloatingPlayer = ({ source, startTime, onClose }: { source: Source; startTime: number; onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (source.type === 'video' && videoRef.current) {
        videoRef.current.currentTime = startTime;
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else if (source.type === 'audio' && audioRef.current) {
        audioRef.current.currentTime = startTime;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [startTime, source]);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-black rounded-xl shadow-2xl overflow-hidden border border-gray-800 ring-1 ring-white/10">
        <div className="bg-gray-900 px-3 py-2 flex justify-between items-start border-b border-gray-800">
            <h4 className="text-xs font-medium text-gray-300 truncate pr-4 max-w-[200px] flex items-center gap-2">
               {source.type === 'video' ? <Video className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
               {source.title}
            </h4>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <div className="relative aspect-video bg-black flex items-center justify-center">
            {source.type === 'video' && source.videoData ? (
                <video ref={videoRef} src={source.videoData} controls className="w-full h-full object-contain" />
            ) : source.audioData ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 p-4">
                    <div className="flex items-center justify-center gap-1 h-8 mb-4">
                         {[...Array(5)].map((_, i) => (
                             <div key={i} className={`w-1 bg-blue-500 rounded-full ${isPlaying ? 'animate-bounce' : 'h-2'}`} style={{ height: isPlaying ? '100%' : undefined, animationDelay: `${i * 0.1}s` }}></div>
                         ))}
                    </div>
                    <audio ref={audioRef} src={source.audioData} controls className="w-full h-8" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
                </div>
            ) : <div className="text-gray-500 text-xs">Media unavailable</div>}
        </div>
    </div>
  );
};

// --------------------------------------------------------------------------------
// SOURCE DETAIL VIEW COMPONENT (Extracted to prevent unmounting on parent update)
// --------------------------------------------------------------------------------
const SourceDetailView = ({ 
    source, 
    onClose, 
    onUpdateSpeaker, 
    onRetrySource 
}: { 
    source: Source, 
    onClose: () => void,
    onUpdateSpeaker: (sourceId: string, speakerId: string, newName: string) => void,
    onRetrySource: (sourceId: string) => void
}) => {
     const [isPlayingSnippet, setIsPlayingSnippet] = useState(false);
     const [identifyingSpeaker, setIdentifyingSpeaker] = useState<Speaker | null>(null);
     const [identifyNameInput, setIdentifyNameInput] = useState('');
     const [refreshSpeakersTrigger, setRefreshSpeakersTrigger] = useState(0);
     const playerRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
     const snippetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
     
     // Reload known speakers whenever we update one to reflect changes immediately
     const knownSpeakers = useMemo(() => getKnownSpeakers(), [refreshSpeakersTrigger]);

     const isDocument = source.type === 'pdf' || source.type === 'text';
     const isPdf = source.type === 'pdf';

     const parsedContent = useMemo(() => {
        if (!source.content) return { summary: '', rows: [], hasVisuals: false, rawText: '' };

        let summary = "";
        let rawTranscript = "";

        if (source.content.includes('--- TRANSCRIPT ---')) {
            const parts = source.content.split('--- TRANSCRIPT ---');
            summary = parts[0].trim();
            rawTranscript = parts[1] ? parts[1].trim() : '';
        } else {
            // Fallback parsing for weird AI responses
            const timestampMatch = source.content.match(/(?:\[?(\d{2}:\d{2})\]?)/);
            if (timestampMatch && timestampMatch.index !== undefined && timestampMatch.index > 50) {
                 summary = source.content.substring(0, timestampMatch.index).trim();
                 rawTranscript = source.content.substring(timestampMatch.index).trim();
            } else {
                 const timestampCount = (source.content.match(/(?:\[?(\d{2}:\d{2})\]?)/g) || []).length;
                 if (timestampCount > 2) {
                     summary = "Summary unavailable.";
                     rawTranscript = source.content;
                 } else {
                     summary = source.content; // Assume it's mostly summary/text if no timestamps
                     rawTranscript = "";
                 }
            }
        }

        // If it's a document, we just want the raw text mostly
        if (isDocument) {
            return { summary, rows: [], hasVisuals: false, rawText: rawTranscript || summary };
        }

        if (rawTranscript && !/(?:\[?(\d{2}:\d{2})\]?)/.test(rawTranscript)) {
            rawTranscript = "[00:00] " + rawTranscript;
        }

        const segments = rawTranscript.split(/((?:\[?\(?\d{2}:\d{2}\)?\]?))/g).filter(s => s.trim());
        
        const rowMap = new Map<string, { visual: string[], audio: {speaker: string, text: string}[] }>();
        
        let hasVisuals = source.type === 'video';
        let currentTime = "00:00";

        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i].trim();
            const isTimestamp = /^(?:\[?\(?(\d{2}:\d{2})\)?\]?)$/.test(segment);
            
            if (isTimestamp) {
                currentTime = segment.replace(/[\[\]\(\)]/g, '');
                if (!rowMap.has(currentTime)) rowMap.set(currentTime, { visual: [], audio: [] });
            } else {
                const match = segment.match(/^([^:]+):\s*([\s\S]+)/);
                if (match) {
                    const speaker = match[1].trim();
                    let text = match[2].trim();
                    const actionRegex = /\[(?:ACTION|VISUAL|SCREEN)\]:?\s*([^\[]+)/gi;
                    const actions: string[] = [];
                    text = text.replace(actionRegex, (match, desc) => {
                        actions.push(desc.trim());
                        return '';
                    }).trim();

                    if (actions.length > 0) hasVisuals = true;

                    const cleanSpeaker = speaker.toUpperCase().replace(/[\[\]]/g, '');
                    const isVisualSpeaker = cleanSpeaker.includes('ACTION') || cleanSpeaker.includes('VISUAL') || cleanSpeaker === 'SYSTEM' || speaker.startsWith('[');
                    
                    if (!rowMap.has(currentTime)) rowMap.set(currentTime, { visual: [], audio: [] });
                    const row = rowMap.get(currentTime)!;
                    
                    if (isVisualSpeaker) {
                        hasVisuals = true;
                        row.visual.push(text);
                    } else {
                        if (text) row.audio.push({ speaker, text });
                        if (actions.length) row.visual.push(...actions);
                    }
                } else {
                    if (!rowMap.has(currentTime)) rowMap.set(currentTime, { visual: [], audio: [] });
                    const row = rowMap.get(currentTime)!;
                    if (row && row.audio.length) {
                        row.audio[row.audio.length - 1].text += " " + segment;
                    } else {
                         row.audio.push({ speaker: 'Unknown', text: segment });
                    }
                }
            }
        }
        
        return { 
            summary, 
            rows: Array.from(rowMap.entries()).map(([time, data]) => ({ time, ...data })), 
            hasVisuals,
            rawText: rawTranscript
        };
     }, [source.content, source.type, isDocument]);

     // Calculate which speakers actually appear in the transcript to filter hallucinated speakers
     const activeTranscriptSpeakers = useMemo(() => {
        const names = new Set<string>();
        parsedContent.rows.forEach(row => {
            row.audio.forEach(a => {
                if (a.speaker) {
                    const cleanName = a.speaker.toLowerCase().trim();
                    names.add(cleanName);
                    names.add(cleanName.replace(':', ''));
                }
            });
        });
        return names;
     }, [parsedContent]);

     const getSpeakerDisplayName = (rawId: string) => {
        const cleanId = rawId.replace(':', '').trim();
        const found = source.speakers?.find(s => 
            s.id === cleanId || 
            (s.name && s.name.toLowerCase() === cleanId.toLowerCase())
        );
        if (found && found.name && found.name !== found.id) return found.name;
        if (!cleanId.toUpperCase().includes('SPEAKER')) return cleanId;
        return found ? (found.name || found.id) : cleanId;
     };

     const handleSeek = (timeString: string) => {
        if (isDocument) return;
        const parts = timeString.split(':').map(Number);
        let timeInSeconds = 0;
        if (parts.length === 2) {
            timeInSeconds = parts[0] * 60 + parts[1];
        } else if (parts.length === 3) {
            timeInSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
        }

        if (playerRef.current) {
            playerRef.current.currentTime = timeInSeconds;
            playerRef.current.play().then(() => {
                // If this was triggered by a snippet play, we update state there, 
                // otherwise we just play.
            }).catch(() => {});
        }
     };

     const playSpeakerSample = (speakerId: string) => {
        if (snippetTimeoutRef.current) {
            clearTimeout(snippetTimeoutRef.current);
            snippetTimeoutRef.current = null;
        }

        const firstRow = parsedContent.rows.find(r => r.audio.some(a => {
             const speakerName = (a.speaker || "").toLowerCase();
             const speakerObj = source.speakers?.find(s => s.id === speakerId);
             const knownName = (speakerObj?.name || "").toLowerCase();
             return speakerName.includes(speakerId.toLowerCase()) || (knownName && speakerName.includes(knownName));
        }));

        if (firstRow) {
             const parts = firstRow.time.split(':').map(Number);
             let startTime = 0;
             if (parts.length === 2) startTime = parts[0] * 60 + parts[1];
             else if (parts.length === 3) startTime = parts[0] * 3600 + parts[1] * 60 + parts[2];

             if (playerRef.current) {
                 playerRef.current.currentTime = startTime;
                 playerRef.current.play().catch(() => {});
                 setIsPlayingSnippet(true);
                 
                 // Strict 5 second limit
                 snippetTimeoutRef.current = setTimeout(() => {
                     if (playerRef.current) {
                         playerRef.current.pause();
                         // Reset to start of snippet so they can hear it again easily
                         playerRef.current.currentTime = startTime; 
                     }
                     setIsPlayingSnippet(false);
                 }, 5000); 
             }
        }
     };

     const stopSpeakerSample = () => {
         if (playerRef.current) {
             playerRef.current.pause();
         }
         setIsPlayingSnippet(false);
         if (snippetTimeoutRef.current) {
             clearTimeout(snippetTimeoutRef.current);
             snippetTimeoutRef.current = null;
         }
     };

     const startIdentification = (speaker: Speaker) => {
         setIdentifyingSpeaker(speaker);
         const existingName = (speaker.name && speaker.name !== speaker.id && !speaker.name.toLowerCase().includes('speaker')) ? speaker.name : '';
         setIdentifyNameInput(existingName);
         if (!isDocument) {
            // Slight delay to ensure modal renders
            setTimeout(() => playSpeakerSample(speaker.id), 300);
         }
     };

     const confirmIdentification = () => {
         if (identifyingSpeaker && identifyNameInput.trim()) {
             onUpdateSpeaker(source.id, identifyingSpeaker.id, identifyNameInput.trim());
             setIdentifyingSpeaker(null);
             stopSpeakerSample();
             setRefreshSpeakersTrigger(prev => prev + 1);
         }
     };

     const isLoading = source.processingStatus && source.processingStatus !== 'completed' && source.processingStatus !== 'failed';
     const isFailed = source.processingStatus === 'failed';
     const statusText = getStatusText(source.processingStatus, source.processingProgress);

     return (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-in slide-in-from-bottom-10 duration-200">
            {/* Header */}
            <div className="bg-gray-50 border-b p-4 flex flex-col gap-4 shadow-sm relative">
                <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                        {source.type === 'video' ? <Monitor className="w-5 h-5 text-purple-600" /> : source.type === 'pdf' || source.type === 'text' ? <FileText className="w-5 h-5 text-gray-600" /> : <Mic className="w-5 h-5 text-blue-600" />}
                        {source.title}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X className="w-6 h-6 text-gray-500" /></button>
                </div>
                
                {/* Media Player - Only for Audio/Video */}
                {!isDocument && (
                    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden bg-black shadow-lg">
                        {source.type === 'video' && source.videoData ? (
                            <video ref={playerRef as any} src={source.videoData} controls className="w-full max-h-[40vh] bg-black" />
                        ) : source.audioData ? (
                            <div className="p-6 flex flex-col items-center">
                                <div className="w-full max-w-md bg-gray-800 rounded-full h-2 mb-6 overflow-hidden">
                                    <div className={`h-full bg-blue-500 w-1/2 ${isPlayingSnippet ? 'animate-pulse' : ''}`}></div>
                                </div>
                                <audio ref={playerRef as any} src={source.audioData} controls className="w-full" />
                            </div>
                        ) : <div className="h-20 flex items-center justify-center text-gray-500">Media not loaded</div>}
                    </div>
                )}
            </div>

            {/* Status & Speakers (Hidden for Docs) */}
            <div className="bg-white border-b p-6">
                {isLoading ? (
                     <div className="max-w-2xl mx-auto text-center">
                         <div className="flex items-center justify-center gap-3 mb-3">
                             <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                             <span className="font-medium text-lg text-blue-900">
                                {statusText} {source.processingProgress || 0}%
                             </span>
                         </div>
                         <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                             <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${source.processingProgress || 5}%` }}></div>
                         </div>
                         <p className="text-sm text-gray-500 mt-2">Generating analysis...</p>
                     </div>
                ) : isFailed ? (
                    <div className="max-w-2xl mx-auto text-center p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 flex flex-col items-center gap-3">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                        <div>
                            <h3 className="font-semibold">Analysis Failed</h3>
                            <p className="text-sm mt-1">{source.processingError || "Unknown error occurred during analysis."}</p>
                        </div>
                        <button onClick={() => onRetrySource(source.id)} className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 shadow-sm rounded-lg text-red-600 hover:bg-red-50 font-medium text-sm transition-colors">
                            <RefreshCw className="w-4 h-4" /> Retry Analysis
                        </button>
                    </div>
                ) : (
                    // Only show Speakers for Media types
                    (!isDocument && source.speakers && source.speakers.length > 0) ? (
                        <div className="max-w-5xl mx-auto">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Speakers Detected</h3>
                            <div className="flex flex-wrap gap-4">
                                {source.speakers?.filter(s => {
                                    const name = (s.name || "").toLowerCase().trim();
                                    const id = (s.id || "").toLowerCase().trim();
                                    return activeTranscriptSpeakers.size === 0 || activeTranscriptSpeakers.has(name) || activeTranscriptSpeakers.has(id);
                                }).map(s => {
                                    const name = s.name || s.id || "Unknown";
                                    const lowerName = (name || "").toLowerCase();
                                    const isKnown = knownSpeakers.some(k => k.name.toLowerCase() === lowerName);
                                    const isDescriptive = /(speaker|unknown|male|female|voice|person)/i.test(lowerName);
                                    const isGeneric = !isKnown || isDescriptive;
                                    
                                    return (
                                        <div key={s.id} className={`flex items-center gap-3 p-3 rounded-xl border ${isGeneric ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-200'}`}>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${s.color?.split(' ')[0].replace('text-', 'bg-').replace('100', '500') || 'bg-gray-500'}`}>
                                                {name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex flex-col mr-2">
                                                <span className="text-sm font-bold text-gray-900">{name}</span>
                                                <span className="text-xs text-gray-500">{isGeneric ? "Unidentified" : "Identified"}</span>
                                            </div>
                                            {isGeneric ? (
                                                <button onClick={() => startIdentification(s)} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 flex items-center gap-1 shadow-sm">
                                                    <UserIcon className="w-3 h-3" /> Identify
                                                </button>
                                            ) : (
                                                 <button onClick={() => startIdentification(s)} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg" title="Edit Name">
                                                    <Edit2 className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : null
                )}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-gray-50/50 p-6">
                <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px] h-full flex flex-col">
                    
                    {/* DOCS VIEW */}
                    {isDocument ? (
                        isPdf ? (
                            // Native PDF Viewer using iframe (videoData holds the blob URL)
                            <div className="h-full flex flex-col bg-gray-100">
                                <div className="bg-white p-4 border-b flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Document Preview</h4>
                                    <a href={source.videoData} download={source.originalFileName || "document.pdf"} className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                                        <Download className="w-4 h-4" /> Download PDF
                                    </a>
                                </div>
                                <div className="flex-1 relative">
                                    <iframe 
                                        src={source.videoData} 
                                        className="w-full h-full absolute inset-0 border-0" 
                                        title="PDF Viewer"
                                    />
                                </div>
                                {parsedContent.summary && (
                                    <div className="p-6 bg-white border-t">
                                        <h4 className="text-xs font-bold text-blue-900 uppercase mb-2">AI Summary</h4>
                                        <p className="text-sm text-gray-700">{parsedContent.summary}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Text/Markdown Viewer
                            <div className="p-8 h-full overflow-y-auto">
                                {parsedContent.summary && (
                                    <div className="mb-8 bg-blue-50 border border-blue-100 p-6 rounded-xl">
                                        <h4 className="text-sm font-bold text-blue-900 uppercase mb-3 flex items-center gap-2">
                                            <FileText className="w-4 h-4" /> Document Summary
                                        </h4>
                                        <p className="text-gray-800 leading-relaxed">{parsedContent.summary}</p>
                                    </div>
                                )}
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Full Content</h4>
                                    <div className="prose max-w-none text-gray-700 whitespace-pre-wrap font-serif text-lg leading-loose p-4 bg-white border-l-4 border-gray-100 pl-6">
                                        {parsedContent.rawText || source.content}
                                    </div>
                                </div>
                            </div>
                        )
                    ) : (
                    /* MEDIA TRANSCRIPT VIEW */
                    <div className="h-full overflow-y-auto">
                        {parsedContent.summary && (
                            <div className="p-6 border-b bg-blue-50/30">
                                <h4 className="text-xs font-bold text-blue-900 uppercase mb-2">Summary</h4>
                                <p className="text-sm text-gray-800 leading-relaxed">{parsedContent.summary}</p>
                            </div>
                        )}
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3 text-left w-24 font-medium text-gray-500 bg-gray-50">Time</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-500 bg-gray-50">Audio (Speaker: Thought)</th>
                                    {parsedContent.hasVisuals && <th className="px-4 py-3 text-left font-medium text-gray-500 w-1/3 bg-gray-50">Visual Action</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {parsedContent.rows.map((row, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-mono text-gray-400 text-xs align-top cursor-pointer hover:text-blue-600" onClick={() => handleSeek(row.time)}>
                                            {row.time}
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            {row.audio.map((a, idx) => {
                                                const displayName = getSpeakerDisplayName(a.speaker);
                                                const lowerDisplay = displayName.toLowerCase();
                                                const isKnown = knownSpeakers.some(k => k.name.toLowerCase() === lowerDisplay);
                                                const isDescriptive = /(speaker|unknown|male|female|voice|person)/i.test(lowerDisplay);
                                                
                                                return (
                                                    <div key={idx} className="mb-2 last:mb-0 group/line">
                                                        <button 
                                                            onClick={() => startIdentification({ id: a.speaker, label: a.speaker, name: a.speaker, color: 'bg-gray-200' })}
                                                            className={`font-bold mr-2 hover:underline cursor-pointer text-left ${isKnown && !isDescriptive ? 'text-gray-900 hover:text-gray-700' : 'text-blue-600 hover:text-blue-800'}`}
                                                            title="Click to identify/rename this speaker"
                                                        >
                                                            {displayName}:
                                                        </button>
                                                        <span className="text-gray-700 leading-relaxed">{a.text}</span>
                                                    </div>
                                                );
                                            })}
                                        </td>
                                        {parsedContent.hasVisuals && (
                                            <td className="px-4 py-3 align-top bg-gray-50/30 text-gray-600 text-xs leading-relaxed">
                                                {row.visual.length > 0 ? (
                                                    <ul className="list-disc pl-4 space-y-1">
                                                        {row.visual.map((v, idx) => <li key={idx}>{v}</li>)}
                                                    </ul>
                                                ) : <span className="opacity-30">-</span>}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    )}

                    {!isDocument && parsedContent.rows.length === 0 && (
                        <div className="flex items-center justify-center h-64 text-gray-400">
                             {isLoading ? (
                                <div className="flex flex-col items-center gap-2">
                                     <Loader2 className="w-5 h-5 animate-spin" />
                                     <span>{statusText}</span>
                                </div>
                             ) : "No transcript available."}
                        </div>
                    )}
                </div>
            </div>

            {identifyingSpeaker && (
                <div className="absolute inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Identify Speaker</h3>
                            <button onClick={() => {
                                stopSpeakerSample();
                                setIdentifyingSpeaker(null);
                            }} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                        </div>
                        
                        {!isDocument && (
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-3">
                                    <UserIcon className="w-8 h-8 text-blue-600" />
                                </div>
                                <div className="text-sm font-medium text-gray-500 mb-1">ID: {identifyingSpeaker.id}</div>
                                
                                {isPlayingSnippet ? (
                                    <button onClick={stopSpeakerSample} className="mt-2 flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-full text-xs font-semibold text-red-700 transition-colors">
                                        <Pause className="w-3 h-3" /> Stop (Playing...)
                                    </button>
                                ) : (
                                    <button onClick={() => playSpeakerSample(identifyingSpeaker.id)} className="mt-2 flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-semibold text-gray-700 transition-colors">
                                        <Volume2 className="w-3 h-3" /> Play 5s Snippet
                                    </button>
                                )}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Assign Name</label>
                                <input autoFocus type="text" placeholder="e.g. Sam, Alice..." className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:border-blue-500 focus:ring-0 outline-none transition-colors" value={identifyNameInput} onChange={(e) => setIdentifyNameInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && confirmIdentification()} />
                            </div>
                            <button onClick={confirmIdentification} disabled={!identifyNameInput.trim()} className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2">
                                <Check className="w-5 h-5" /> Save & Replace
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
     );
};

export const NotebookView: React.FC<NotebookViewProps> = ({ notebook, onBack, onUpdateNotebook, onUploadFiles, onCancelUpload, onUpdateSpeaker, onRetrySource }) => {
  const [activeTab, setActiveTab] = useState<'sources' | 'chat'>('sources');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mediaPlayerState, setMediaPlayerState] = useState<{ source: Source; time: number } | null>(null);
  const [playingSourceId, setPlayingSourceId] = useState<string | null>(null);
  const [viewingSourceId, setViewingSourceId] = useState<string | null>(null);
  
  // Initialize selection only with COMPLETED sources
  const [selectedSourceIds, setSelectedSourceIds] = useState<Set<string>>(() => 
    new Set(notebook.sources.filter(s => s.processingStatus === 'completed').map(s => s.id))
  );
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory, activeTab]);

  const activeSources = useMemo(() => 
    notebook.sources.filter(s => selectedSourceIds.has(s.id) && s.processingStatus === 'completed'), 
  [notebook.sources, selectedSourceIds]);
  
  const viewingSource = useMemo(() => notebook.sources.find(s => s.id === viewingSourceId) || null, [notebook.sources, viewingSourceId]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) onUploadFiles(notebook.id, e.target.files);
  };

  const toggleSourceSelection = (source: Source) => {
    if (source.processingStatus !== 'completed') return;
    setSelectedSourceIds(prev => {
      const next = new Set(prev);
      if (next.has(source.id)) next.delete(source.id); else next.add(source.id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    const completedSources = notebook.sources.filter(s => s.processingStatus === 'completed');
    if (selectedSourceIds.size === completedSources.length) setSelectedSourceIds(new Set());
    else setSelectedSourceIds(new Set(completedSources.map(s => s.id)));
  };

  const toggleAudio = (source: Source, e: React.MouseEvent) => {
    e.stopPropagation();
    if (playingSourceId === source.id) {
      audioRef.current?.pause();
      setPlayingSourceId(null);
    } else {
      if (audioRef.current) audioRef.current.pause();
      if (source.audioData) {
        audioRef.current = new Audio(source.audioData);
        audioRef.current.onended = () => setPlayingSourceId(null);
        audioRef.current.play();
        setPlayingSourceId(source.id);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || activeSources.length === 0) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: inputMessage, timestamp: Date.now() };
    setChatHistory(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);
    try {
      const responseText = await chatWithNotebook(chatHistory, activeSources, userMsg.text);
      setChatHistory(prev => [...prev, { id: Date.now().toString(), role: 'model', text: responseText, timestamp: Date.now() }]);
    } catch (e) {
      setChatHistory(prev => [...prev, { id: 'err', role: 'model', text: 'Error generating response.', timestamp: Date.now() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleTimestampClick = (timeString: string, specificSource?: Source) => {
     const clean = timeString.replace(/[\[\]\(\)]/g, '');
     const parts = clean.split(':').map(Number);
     let timeInSeconds = 0;
     if (parts.length === 2) {
         timeInSeconds = parts[0] * 60 + parts[1];
     } else if (parts.length === 3) {
         timeInSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
     }

     const sourceToPlay = specificSource || activeSources.find(s => s.type === 'video') || activeSources.find(s => s.type === 'audio');
     if (sourceToPlay) setMediaPlayerState({ source: sourceToPlay, time: timeInSeconds });
  };

  const renderMessageText = (text: string) => {
     // Enhanced regex to catch various timestamp formats: [00:00], (00:00), 00:00
     return text.split(/(\[?\d{1,2}:\d{2}\]?)/g).map((part, index) => {
         if (/^\[?\d{1,2}:\d{2}\]?$/.test(part)) {
             const cleanTime = part.replace(/[\[\]\(\)]/g, '');
             return (
                 <button key={index} onClick={() => handleTimestampClick(cleanTime)} className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 rounded bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-bold cursor-pointer transition-colors border border-blue-200">
                    <Play className="w-3 h-3 fill-current" /> {cleanTime}
                 </button>
             );
         }
         return <span key={index}>{part}</span>;
     });
  };

  return (
    <div className="h-screen flex flex-col bg-white relative">
      {mediaPlayerState && <FloatingPlayer source={mediaPlayerState.source} startTime={mediaPlayerState.time} onClose={() => setMediaPlayerState(null)} />}
      <header className="border-b px-6 py-4 flex items-center gap-4 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
        <div className="flex-1"><h1 className="text-xl font-semibold text-gray-800">{notebook.title}</h1><p className="text-xs text-gray-500">{activeSources.length} sources active</p></div>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-64 bg-gray-50 border-r flex md:flex-col shrink-0">
          <div className="p-4 flex md:flex-col gap-2">
            <button onClick={() => setActiveTab('sources')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${activeTab === 'sources' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}><FileAudio className="w-4 h-4" /> Sources <span className="ml-auto bg-gray-100 px-2 rounded-full text-xs">{notebook.sources.length}</span></button>
            <button onClick={() => setActiveTab('chat')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${activeTab === 'chat' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}><Bot className="w-4 h-4" /> Chat</button>
          </div>
          <div className="mt-auto p-4 hidden md:block">
            <label className="flex items-center gap-2 justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-white text-gray-500 text-sm font-medium">
              <Upload className="w-4 h-4" /> Add Sources
              <input type="file" multiple className="hidden" accept=".txt,.md,.pdf,.mp3,.wav,.webm,.m4a,.mp4,.mov,.avi,.mkv" onChange={handleFileChange} />
            </label>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-white relative">
          {activeTab === 'sources' && (
            <div className="p-6 md:p-10 max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-normal text-gray-800">Sources</h2>
                <div className="flex items-center gap-4">
                  {notebook.sources.length > 0 && <button onClick={toggleSelectAll} className="flex items-center gap-2 text-sm font-medium text-gray-600">{selectedSourceIds.size === notebook.sources.filter(s => s.processingStatus === 'completed').length ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-gray-400" />} Select All</button>}
                  <label className="md:hidden p-2 bg-gray-100 rounded-full"><Upload className="w-4 h-4" /><input type="file" multiple className="hidden" accept=".txt,.md,.pdf,.mp3,.wav,.webm,.m4a,.mp4,.mov,.avi,.mkv" onChange={handleFileChange} /></label>
                </div>
              </div>

              {notebook.sources.length === 0 ? (
                <div className="text-center py-20 text-gray-400"><FileAudio className="w-16 h-16 mx-auto mb-4 opacity-20" /><p>No sources yet.</p></div>
              ) : (
                <div className="grid gap-4">
                  {notebook.sources.map(source => {
                    const isSelected = selectedSourceIds.has(source.id);
                    const isUploading = source.processingStatus === 'processing';
                    const isAnalyzing = source.processingStatus === 'analyzing' || source.processingStatus === 'transcribing';
                    const isFailed = source.processingStatus === 'failed';
                    const isCompleted = source.processingStatus === 'completed';
                    
                    const isReady = isCompleted;

                    return (
                      <div key={source.id} className={`group border rounded-2xl p-5 transition-all relative ${isSelected ? 'bg-blue-50/30 border-blue-200' : 'bg-white border-gray-200'} ${!isReady ? 'cursor-default' : 'cursor-pointer hover:border-blue-400'}`} onClick={() => isReady && toggleSourceSelection(source)}>
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`${isSelected ? 'text-blue-600' : 'text-gray-300'} ${!isReady ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`} title={!isReady ? "Processing..." : "Select for Chat"}>
                                {isSelected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                            </div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${source.type === 'video' ? 'bg-purple-100 text-purple-600' : source.type === 'pdf' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                              {source.type === 'video' ? <Monitor className="w-5 h-5" /> : source.type === 'pdf' ? <FileText className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                            </div>
                            <div>
                                <h3 className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-800'}`}>{source.title}</h3>
                                {isUploading ? (
                                    <div className="flex items-center gap-2 text-xs text-blue-600 mt-1">
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        <span>{source.processingProgress}% Uploading...</span>
                                    </div>
                                ) : isAnalyzing ? (
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                        <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
                                        <span>Loading Intelligence...</span>
                                    </div>
                                ) : isFailed ? (
                                    <div className="flex items-center gap-2 text-xs text-red-500 mt-1">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>Failed</span>
                                    </div>
                                ) : (
                                    <span className="text-xs text-gray-500">{new Date(source.createdAt).toLocaleDateString()}</span>
                                )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 relative z-10">
                            {isUploading && (
                                <button onClick={(e) => { e.stopPropagation(); onCancelUpload(source.id); }} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full"><X className="w-4 h-4" /></button>
                            )}
                            
                            {!isUploading && (
                                <button onClick={(e) => { e.stopPropagation(); setViewingSourceId(source.id); }} className="p-2 rounded-full bg-white shadow-sm border hover:bg-gray-50 text-gray-500 hover:text-blue-600" title="Open Source Details">
                                    <Eye className="w-4 h-4" />
                                </button>
                            )}
                            
                            {!isUploading && (source.type === 'audio' || source.type === 'video') && (
                              <button onClick={(e) => toggleAudio(source, e)} className="p-2 rounded-full bg-white shadow-sm border hover:bg-gray-50 text-gray-700">
                                {playingSourceId === source.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              </button>
                            )}
                          </div>
                        </div>

                        {isUploading && (
                            <div className="mt-3 bg-gray-100 rounded-full h-1.5 w-full overflow-hidden">
                                <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${source.processingProgress}%` }}></div>
                            </div>
                        )}
                        
                        {!isUploading && !isFailed && source.speakers?.some(s => {
                            const name = s.name || s.id;
                            return name === s.id;
                        }) && (
                            <div className="mt-2 text-xs bg-yellow-50 text-yellow-800 px-3 py-1.5 rounded-lg flex items-center gap-2 border border-yellow-100" onClick={(e) => { e.stopPropagation(); setViewingSourceId(source.id); }}>
                                <AlertCircle className="w-3 h-3" /> Unknown speakers detected. Click eye icon to identify.
                            </div>
                        )}

                        <div className="text-sm text-gray-600 line-clamp-2 bg-white/50 p-2 rounded-lg font-mono text-xs ml-8 mt-2">
                           {source.content ? source.content.slice(0, 150) + "..." : (isUploading ? "Uploading..." : isAnalyzing ? "Analzying content..." : isFailed ? "Analysis unavailable." : "No content")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="flex flex-col h-full max-w-3xl mx-auto">
               <div className="flex-1 overflow-y-auto p-4 space-y-6">
                 {chatHistory.map(msg => (
                   <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                     <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center ${msg.role === 'user' ? 'bg-black text-white' : 'bg-blue-600 text-white'}`}>{msg.role === 'user' ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}</div>
                     <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-gray-100' : 'bg-blue-50'}`}><p className="whitespace-pre-wrap text-sm leading-relaxed">{renderMessageText(msg.text)}</p></div>
                   </div>
                 ))}
                 <div ref={messagesEndRef} />
               </div>
               <div className="p-4 border-t bg-white">
                 <div className="relative">
                   <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Ask a question..." className="w-full bg-gray-100 rounded-full pl-6 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                   <button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping || activeSources.length === 0} className="absolute right-2 top-2 p-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50"><Send className="w-5 h-5" /></button>
                 </div>
               </div>
            </div>
          )}
        </div>
      </div>

      {viewingSource && (
        <SourceDetailView 
            source={viewingSource} 
            onClose={() => setViewingSourceId(null)}
            onUpdateSpeaker={onUpdateSpeaker}
            onRetrySource={onRetrySource}
        />
      )}
    </div>
  );
};
