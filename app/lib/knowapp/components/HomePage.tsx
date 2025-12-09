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
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .pitch-container {
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
          color: var(--dark);
          background: var(--bg-light);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        
        h1, h2, h3, h4, h5 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: var(--dark);
        }
        
        h1 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        
        h4 {
          font-size: 1.125rem;
          margin-bottom: 1rem;
        }
        
        h5 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #005EFF 0%, #00C6FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        
        p {
          margin-bottom: 1rem;
          color: var(--gray-text);
          font-size: 1rem;
        }
        
        .text-center {
          text-align: center;
        }
        
        .font-medium {
          font-weight: 500;
        }
        
        .font-bold {
          font-weight: 700;
        }
        
        .text-primary {
          color: var(--primary);
        }
        
        .text-white {
          color: white;
        }
        
        .text-sm {
          font-size: 0.875rem;
        }
        
        .text-xs {
          font-size: 0.75rem;
        }
        
        .text-lg {
          font-size: 1.125rem;
        }
        
        section {
          padding: 5rem 1.5rem;
          position: relative;
        }
        
        .container {
          max-width: 1100px;
          margin: 0 auto;
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
        
        .grid {
          display: grid;
          gap: 1.5rem;
        }
        
        .grid-cols-2 {
          grid-template-columns: 1fr;
        }
        
        .grid-cols-3 {
          grid-template-columns: 1fr;
        }
        
        .card {
          background: var(--surface-glass);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
          height: 100%;
          transition: all 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        .card-dark {
          background: var(--dark);
          color: white;
          border: 1px solid #333;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 90%;
          margin-left: auto;
          margin-right: auto;
        }
        
        .card-dark p {
          color: #9ca3af;
          margin-bottom: 0;
        }
        
        .card-dark .text-white {
          color: white;
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
        }
        
        @media (min-width: 768px) {
          h1 {
            font-size: 3.5rem;
          }
          h2 {
            font-size: 2.5rem;
          }
          section {
            padding: 7rem 2rem;
          }
          .grid-cols-2 {
            grid-template-columns: repeat(2, 1fr);
          }
          .grid-cols-3 {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
      
      <div className="pitch-container">
        <section className="hero-bg">
          <div className="container fade-in text-center" style={{ maxWidth: '900px', marginBottom: '4rem' }}>
            <h1>Welcome to <span className="gradient-text">Knowcap MVP</span></h1>
            <div className="card-dark" style={{ maxWidth: '800px', marginTop: '2rem' }}>
              <p className="text-white text-lg text-center" style={{ lineHeight: '1.6', marginBottom: 0 }}>
                AI That Turns Meetings and Screen Work Into Verified Project Documents
              </p>
            </div>
          </div>
        </section>

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

      <section style={{ background: 'var(--bg-light)' }}>
        <div className="container fade-in">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="slide-label">Your Notebooks</span>
            <h2>Project Intelligence Hub</h2>
          </div>
          
          <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
          
          {/* Create New Card */}
          <button 
            onClick={onCreateNotebook}
            className="card border-2 border-dashed border-gray-300"
            style={{ 
              aspectRatio: '4/3',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              border: '2px dashed #D1D5DB'
            }}
          >
            <div style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '50%',
              background: 'var(--dark)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Plus style={{ width: '1.75rem', height: '1.75rem' }} />
            </div>
            <span className="font-medium" style={{ color: 'var(--gray-text)', fontSize: '1.125rem' }}>New Notebook</span>
          </button>

          {/* Notebook Cards */}
          {notebooks.map(notebook => (
            <button 
              key={notebook.id}
              onClick={() => onSelectNotebook(notebook.id)}
              className="card"
              style={{ 
                aspectRatio: '4/3',
                position: 'relative',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'left',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              {/* Cover Decoration */}
              <div className={`${notebook.coverColor}`} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.3,
                zIndex: 0
              }}></div>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '6rem',
                height: '6rem',
                background: 'rgba(255, 255, 255, 0.3)',
                borderBottomLeftRadius: '100%',
                zIndex: 0
              }}></div>

              <div style={{ position: 'relative', zIndex: 10 }}>
                 <div style={{
                   width: '3rem',
                   height: '3rem',
                   background: 'white',
                   borderRadius: '0.75rem',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                   marginBottom: '1rem'
                 }}>
                   <Book style={{ width: '1.5rem', height: '1.5rem', color: 'var(--primary)' }} />
                 </div>
                 <h3 className="font-bold" style={{ 
                   fontSize: '1.25rem',
                   color: 'var(--dark)',
                   lineHeight: '1.3',
                   fontFamily: 'Space Grotesk, sans-serif',
                   overflow: 'hidden',
                   display: '-webkit-box',
                   WebkitLineClamp: 2,
                   WebkitBoxOrient: 'vertical'
                 }}>
                   {notebook.title}
                 </h3>
              </div>

              <div style={{ 
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
              }}>
                <span className="font-bold text-primary" style={{ 
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {notebook.sources.length} Sources
                </span>
                <span className="text-xs" style={{ color: 'var(--gray-text)' }}>
                  {new Date(notebook.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </button>
          ))}
        </div>
        </div>
      </section>

      <section style={{ background: '#F5F7FA' }}>
        <div className="container fade-in">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="slide-label">Recent Activity</span>
            <h2>Latest Sources Across Projects</h2>
          </div>
          
          {recentSources.length === 0 ? (
            <div className="card" style={{ 
              padding: '2rem',
              minHeight: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gray-text)'
            }}>
              No sources yet. Create a notebook and add some sources to get started!
            </div>
          ) : (
            <div className="grid" style={{ gap: '1rem', gridTemplateColumns: '1fr' }}>
            {recentSources.map(({ source, notebookId, notebookTitle }) => {
              const isUploading = source.processingStatus === 'processing';
              const isAnalyzing = source.processingStatus === 'analyzing' || source.processingStatus === 'transcribing';
              const isFailed = source.processingStatus === 'failed';
              const isCompleted = source.processingStatus === 'completed';

              return (
                <div
                  key={source.id}
                  className="card"
                  onClick={() => onSelectNotebook(notebookId)}
                  style={{ 
                    padding: '1.25rem',
                    cursor: 'pointer',
                    border: '1px solid rgba(0, 0, 0, 0.08)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                      <div style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        background: source.type === 'video' ? '#F3E8FF' : source.type === 'pdf' ? '#FEE2E2' : 'var(--primary-light)',
                        color: source.type === 'video' ? '#9333EA' : source.type === 'pdf' ? '#DC2626' : 'var(--primary)'
                      }}>
                        {source.type === 'video' ? <Monitor style={{ width: '1.5rem', height: '1.5rem' }} /> : 
                         source.type === 'pdf' ? <FileText style={{ width: '1.5rem', height: '1.5rem' }} /> : 
                         <Mic style={{ width: '1.5rem', height: '1.5rem' }} />}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 className="font-bold" style={{ 
                          color: 'var(--dark)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontSize: '1.125rem',
                          fontFamily: 'Space Grotesk, sans-serif'
                        }}>
                          {source.title}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                          <span className="text-xs" style={{ color: 'var(--gray-text)' }}>from</span>
                          <span className="text-xs font-bold text-primary" style={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '200px'
                          }}>{notebookTitle}</span>
                        </div>
                        {isUploading ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                            <Loader2 style={{ width: '0.75rem', height: '0.75rem', animation: 'spin 1s linear infinite' }} />
                            <span className="text-xs font-medium text-primary">{source.processingProgress}% Uploading...</span>
                          </div>
                        ) : isAnalyzing ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                            <Loader2 style={{ width: '0.75rem', height: '0.75rem', animation: 'spin 1s linear infinite' }} />
                            <span className="text-xs" style={{ color: 'var(--gray-text)' }}>Loading Intelligence...</span>
                          </div>
                        ) : isFailed ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                            <AlertCircle style={{ width: '0.75rem', height: '0.75rem', color: '#EF4444' }} />
                            <span className="text-xs font-medium" style={{ color: '#EF4444' }}>Failed</span>
                          </div>
                        ) : (
                          <span className="text-xs" style={{ color: 'var(--gray-text)' }}>{new Date(source.createdAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative', zIndex: 10 }}>
                      {!isUploading && (
                        <button
                          onClick={(e) => handleViewSource(notebookId, e)}
                          style={{
                            padding: '0.625rem',
                            borderRadius: '0.75rem',
                            background: 'white',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                            border: '1px solid #E5E7EB',
                            color: 'var(--gray-text)',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          title="Open in Notebook"
                        >
                          <Eye style={{ width: '1rem', height: '1rem' }} />
                        </button>
                      )}
                      
                      {!isUploading && (source.type === 'audio' || source.type === 'video') && source.audioData && (
                        <button
                          onClick={(e) => toggleAudio(source, e)}
                          style={{
                            padding: '0.625rem',
                            borderRadius: '0.75rem',
                            background: 'white',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                            border: '1px solid #E5E7EB',
                            color: 'var(--gray-text)',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          title={playingSourceId === source.id ? "Pause" : "Play"}
                        >
                          {playingSourceId === source.id ? <Pause style={{ width: '1rem', height: '1rem' }} /> : <Play style={{ width: '1rem', height: '1rem' }} />}
                        </button>
                      )}
                    </div>
                  </div>

                  {isUploading && (
                    <div style={{ 
                      marginTop: '0.75rem',
                      background: '#F3F4F6',
                      borderRadius: '9999px',
                      height: '0.5rem',
                      width: '100%',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        height: '100%',
                        width: `${source.processingProgress}%`,
                        background: 'var(--primary)',
                        transition: 'all 0.3s'
                      }}></div>
                    </div>
                  )}
                  
                  {!isUploading && source.content && (
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--gray-text)',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      background: 'var(--primary-light)',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      fontFamily: 'monospace',
                      marginTop: '0.75rem'
                    }}>
                      {source.content.slice(0, 150)}...
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        </div>
      </section>
    </div>
    </>
  );
};