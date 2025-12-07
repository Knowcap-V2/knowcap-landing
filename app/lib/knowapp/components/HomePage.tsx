import React, { useState, useRef } from 'react';
import { Notebook, Source } from '../types';
import { Plus, Mic, Book, Monitor, Eye, Play, Pause, CheckSquare, Square, FileText, Loader2, AlertCircle } from 'lucide-react';

interface HomePageProps {
  notebooks: Notebook[];
  onSelectNotebook: (id: string) => void;
  onStartRecording: () => void;
  onStartScreenRecording: () => void;
  onCreateNotebook: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ notebooks, onSelectNotebook, onStartRecording, onStartScreenRecording, onCreateNotebook }) => {
  const [playingSourceId, setPlayingSourceId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Get all sources from all notebooks, sorted by creation date (most recent first)
  const allSources: Array<{ source: Source; notebookId: string; notebookTitle: string }> = [];
  notebooks.forEach(notebook => {
    notebook.sources.forEach(source => {
      allSources.push({
        source,
        notebookId: notebook.id,
        notebookTitle: notebook.title
      });
    });
  });
  
  // Sort by creation date, most recent first
  allSources.sort((a, b) => b.source.createdAt - a.source.createdAt);
  
  // Take only the 10 most recent sources
  const recentSources = allSources.slice(0, 10);

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

  const handleViewSource = (notebookId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectNotebook(notebookId);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-normal text-gray-800">Welcome to NotebookLM Replica</h1>
        <div className="flex gap-3">
          <button className="p-2 rounded-full hover:bg-gray-100"><Book className="w-5 h-5 text-gray-600" /></button>
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">U</div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-end">
        
        {/* Screen Record Button */}
        <div className="flex items-center gap-3 group">
             <div className="bg-white px-3 py-1.5 rounded-lg shadow-md text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Record Screen
             </div>
             <button 
                onClick={onStartScreenRecording}
                className="w-12 h-12 bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer hover:bg-gray-700"
                title="Record Screen"
             >
                <Monitor className="w-5 h-5" />
             </button>
        </div>

        {/* Audio Record Button */}
        <div className="flex flex-col items-end gap-2">
            <div className="bg-white px-4 py-2 rounded-lg shadow-lg mb-1 text-sm font-medium text-gray-600 animate-bounce origin-bottom-right">
            Record & Identify
            </div>
            <button 
            onClick={onStartRecording}
            className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-xl flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer group"
            >
            <Mic className="w-8 h-8 group-hover:animate-pulse" />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Create New Card */}
        <button 
          onClick={onCreateNotebook}
          className="aspect-[4/3] rounded-3xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 hover:border-gray-400 hover:bg-gray-50 transition-colors group"
        >
          <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-medium text-gray-600">New Notebook</span>
        </button>

        {/* Notebook Cards */}
        {notebooks.map(notebook => (
          <button 
            key={notebook.id}
            onClick={() => onSelectNotebook(notebook.id)}
            className="aspect-[4/3] relative rounded-3xl p-6 flex flex-col justify-between text-left transition-all hover:-translate-y-1 hover:shadow-xl bg-white border border-gray-100 shadow-sm overflow-hidden group"
          >
            {/* Cover Decoration */}
            <div className={`absolute top-0 left-0 w-full h-full ${notebook.coverColor} opacity-50 group-hover:opacity-60 transition-opacity z-0`}></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-bl-full z-0"></div>

            <div className="relative z-10">
               <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm mb-4">
                 <Book className="w-5 h-5 text-gray-700" />
               </div>
               <h3 className="text-xl font-medium text-gray-800 leading-tight line-clamp-2">
                 {notebook.title}
               </h3>
            </div>

            <div className="relative z-10 flex justify-between items-end">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                {notebook.sources.length} Sources
              </span>
              <span className="text-xs text-gray-500">
                {new Date(notebook.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-normal text-gray-800 mb-6">Recent Sources</h2>
        
        {recentSources.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-[100px] flex items-center justify-center text-gray-400 text-sm">
            No sources yet. Create a notebook and add some sources to get started!
          </div>
        ) : (
          <div className="grid gap-4">
            {recentSources.map(({ source, notebookId, notebookTitle }) => {
              const isUploading = source.processingStatus === 'processing';
              const isAnalyzing = source.processingStatus === 'analyzing' || source.processingStatus === 'transcribing';
              const isFailed = source.processingStatus === 'failed';
              const isCompleted = source.processingStatus === 'completed';

              return (
                <div
                  key={source.id}
                  className="group border rounded-2xl p-5 transition-all bg-white border-gray-200 hover:border-blue-300 hover:shadow-md cursor-pointer"
                  onClick={() => onSelectNotebook(notebookId)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        source.type === 'video' ? 'bg-purple-100 text-purple-600' : 
                        source.type === 'pdf' ? 'bg-red-100 text-red-600' : 
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {source.type === 'video' ? <Monitor className="w-5 h-5" /> : 
                         source.type === 'pdf' ? <FileText className="w-5 h-5" /> : 
                         <Mic className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-800 truncate">{source.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">from</span>
                          <span className="text-xs font-medium text-blue-600 truncate max-w-[200px]">{notebookTitle}</span>
                        </div>
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
                      {!isUploading && (
                        <button
                          onClick={(e) => handleViewSource(notebookId, e)}
                          className="p-2 rounded-full bg-white shadow-sm border hover:bg-gray-50 text-gray-500 hover:text-blue-600"
                          title="Open in Notebook"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      
                      {!isUploading && (source.type === 'audio' || source.type === 'video') && source.audioData && (
                        <button
                          onClick={(e) => toggleAudio(source, e)}
                          className="p-2 rounded-full bg-white shadow-sm border hover:bg-gray-50 text-gray-700"
                          title={playingSourceId === source.id ? "Pause" : "Play"}
                        >
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
                  
                  {!isUploading && source.content && (
                    <div className="text-sm text-gray-600 line-clamp-2 bg-gray-50/50 p-2 rounded-lg font-mono text-xs mt-2">
                      {source.content.slice(0, 150)}...
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};