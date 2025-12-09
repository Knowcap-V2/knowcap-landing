import React, { useState, useRef, useEffect } from 'react';
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
  
  // Fade-in animation on scroll
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');
        
        :root {
          --primary: #005EFF;
          --primary-dark: #0046bd;
          --primary-light: rgba(0, 94, 255, 0.08);
          --dark: #191F2E;
          --gray-text: #414651;
          --bg-light: #F5F7FA;
          --surface-glass: rgba(255, 255, 255, 0.95);
          --shadow-sm: 0 2px 4px rgba(0,0,0,0.02);
          --shadow-md: 0 12px 24px -6px rgba(0,0,0,0.05);
          --shadow-lg: 0 20px 40px -10px rgba(0,0,0,0.1);
          --radius-lg: 16px;
        }
        
        .pitch-container {
          font-family: 'Inter', sans-serif;
          background: var(--bg-light);
          min-height: 100vh;
          padding: 3rem 1.5rem;
        }
        
        .pitch-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: var(--dark);
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .pitch-subtitle {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.3;
          color: var(--dark);
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #005EFF 0%, #00C6FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        
        .slide-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
          display: inline-block;
          background: var(--primary-light);
          padding: 4px 12px;
          border-radius: 100px;
        }
        
        .pitch-card {
          background: var(--surface-glass);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
        }
        
        .pitch-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        .pitch-card-dark {
          background: var(--dark);
          color: white;
          border: 1px solid #333;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          text-align: center;
        }
        
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .hero-bg {
          background: radial-gradient(circle at 50% 0%, #E3F2FD 0%, #F8FAFC 70%);
          padding: 3rem 1.5rem;
          margin: -3rem -1.5rem 3rem -1.5rem;
          border-radius: 0 0 2rem 2rem;
        }
        
        @media (min-width: 768px) {
          .pitch-title {
            font-size: 3.5rem;
          }
          .pitch-subtitle {
            font-size: 2.5rem;
          }
        }
      `}</style>
      
      <div className="pitch-container">
        <div className="hero-bg fade-in">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="pitch-title">
              Welcome to <span className="gradient-text">Knowcap MVP</span>
            </h1>
            <div className="pitch-card-dark max-w-3xl mx-auto" style={{ marginTop: '2rem' }}>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.6', marginBottom: 0, color: 'white' }}>
                AI That Turns Meetings and Screen Work Into Verified Project Documents
              </p>
            </div>
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

      <div className="max-w-6xl mx-auto mb-16 fade-in">
        <div className="text-center mb-8">
          <span className="slide-label">Your Notebooks</span>
          <h2 className="pitch-subtitle">Project Intelligence Hub</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Create New Card */}
          <button 
            onClick={onCreateNotebook}
            className="pitch-card aspect-[4/3] rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 hover:border-[var(--primary)] hover:bg-[var(--primary-light)] transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-[var(--dark)] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-7 h-7" />
            </div>
            <span className="font-semibold text-[var(--gray-text)] text-lg">New Notebook</span>
          </button>

          {/* Notebook Cards */}
          {notebooks.map(notebook => (
            <button 
              key={notebook.id}
              onClick={() => onSelectNotebook(notebook.id)}
              className="pitch-card aspect-[4/3] relative rounded-2xl p-6 flex flex-col justify-between text-left overflow-hidden group"
            >
              {/* Cover Decoration */}
              <div className={`absolute top-0 left-0 w-full h-full ${notebook.coverColor} opacity-30 group-hover:opacity-40 transition-opacity z-0`}></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/30 rounded-bl-full z-0"></div>

              <div className="relative z-10">
                 <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md mb-4">
                   <Book className="w-6 h-6 text-[var(--primary)]" />
                 </div>
                 <h3 className="text-xl font-semibold text-[var(--dark)] leading-tight line-clamp-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                   {notebook.title}
                 </h3>
              </div>

              <div className="relative z-10 flex justify-between items-end">
                <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wide">
                  {notebook.sources.length} Sources
                </span>
                <span className="text-xs text-[var(--gray-text)]">
                  {new Date(notebook.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto mb-16 fade-in">
        <div className="text-center mb-8">
          <span className="slide-label">Recent Activity</span>
          <h2 className="pitch-subtitle">Latest Sources Across Projects</h2>
        </div>
        
        {recentSources.length === 0 ? (
          <div className="pitch-card rounded-2xl p-8 min-h-[100px] flex items-center justify-center text-[var(--gray-text)] text-base">
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
                  className="pitch-card group rounded-2xl p-5 cursor-pointer hover:border-[var(--primary)]"
                  onClick={() => onSelectNotebook(notebookId)}
                  style={{ border: '1px solid rgba(0, 0, 0, 0.08)' }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                        source.type === 'video' ? 'bg-purple-100 text-purple-600' : 
                        source.type === 'pdf' ? 'bg-red-100 text-red-600' : 
                        'bg-[var(--primary-light)] text-[var(--primary)]'
                      }`}>
                        {source.type === 'video' ? <Monitor className="w-6 h-6" /> : 
                         source.type === 'pdf' ? <FileText className="w-6 h-6" /> : 
                         <Mic className="w-6 h-6" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[var(--dark)] truncate text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {source.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-[var(--gray-text)]">from</span>
                          <span className="text-xs font-semibold text-[var(--primary)] truncate max-w-[200px]">{notebookTitle}</span>
                        </div>
                        {isUploading ? (
                          <div className="flex items-center gap-2 text-xs text-[var(--primary)] mt-1 font-medium">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span>{source.processingProgress}% Uploading...</span>
                          </div>
                        ) : isAnalyzing ? (
                          <div className="flex items-center gap-2 text-xs text-[var(--gray-text)] mt-1">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span>Loading Intelligence...</span>
                          </div>
                        ) : isFailed ? (
                          <div className="flex items-center gap-2 text-xs text-red-500 mt-1 font-medium">
                            <AlertCircle className="w-3 h-3" />
                            <span>Failed</span>
                          </div>
                        ) : (
                          <span className="text-xs text-[var(--gray-text)]">{new Date(source.createdAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 relative z-10">
                      {!isUploading && (
                        <button
                          onClick={(e) => handleViewSource(notebookId, e)}
                          className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-200 hover:bg-[var(--primary-light)] hover:border-[var(--primary)] text-[var(--gray-text)] hover:text-[var(--primary)] transition-all"
                          title="Open in Notebook"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      
                      {!isUploading && (source.type === 'audio' || source.type === 'video') && source.audioData && (
                        <button
                          onClick={(e) => toggleAudio(source, e)}
                          className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-200 hover:bg-[var(--primary-light)] hover:border-[var(--primary)] text-[var(--gray-text)] hover:text-[var(--primary)] transition-all"
                          title={playingSourceId === source.id ? "Pause" : "Play"}
                        >
                          {playingSourceId === source.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </div>

                  {isUploading && (
                    <div className="mt-3 bg-gray-100 rounded-full h-2 w-full overflow-hidden">
                      <div className="h-full transition-all duration-300" style={{ width: `${source.processingProgress}%`, background: 'var(--primary)' }}></div>
                    </div>
                  )}
                  
                  {!isUploading && source.content && (
                    <div className="text-sm text-[var(--gray-text)] line-clamp-2 bg-[var(--primary-light)] p-3 rounded-lg font-mono text-xs mt-3">
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
    </>
  );
};