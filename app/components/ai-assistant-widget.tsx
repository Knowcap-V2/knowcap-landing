'use client'

import { useState, useEffect, useRef } from 'react'
import { Bot, User, Send, Minimize2, MessageCircle, X } from 'lucide-react'

export default function AIAssistantWidget() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string, timestamp: Date}>>([])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Load expanded state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('ai_assistant_expanded')
    if (savedState === 'true') {
      setIsExpanded(true)
    }
  }, [])

  // Save expanded state to localStorage
  useEffect(() => {
    localStorage.setItem('ai_assistant_expanded', isExpanded.toString())
  }, [isExpanded])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, chatLoading])

  const handleSendMessage = async () => {
    if (!chatInput.trim() || chatLoading) return
    
    const userMessage = {
      role: 'user' as const,
      content: chatInput,
      timestamp: new Date()
    }
    
    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setChatLoading(true)
    
    try {
      const response = await fetch('/api/chat-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: chatInput }],
          conversationHistory: chatMessages.map(m => ({ role: m.role, content: m.content }))
        })
      })
      
      if (!response.ok) throw new Error('Failed to get response')
      
      const data = await response.json()
      
      const assistantMessage = {
        role: 'assistant' as const,
        content: data.message,
        timestamp: new Date()
      }
      
      setChatMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = {
        role: 'assistant' as const,
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, errorMessage])
    } finally {
      setChatLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Widget */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-[420px]' : 'w-auto'
        }`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Minimized Button */}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center group hover:scale-110"
            aria-label="Open AI Assistant"
          >
            <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
            {chatMessages.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center animate-pulse">
                {chatMessages.filter(m => m.role === 'assistant').length}
              </div>
            )}
          </button>
        )}

        {/* Expanded Chat Window */}
        {isExpanded && (
          <div 
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            style={{ height: '600px', maxHeight: 'calc(100vh - 100px)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    AI Recruiter
                  </h3>
                  <p className="text-purple-100 text-xs">Always ready to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center justify-center"
                  aria-label="Minimize"
                >
                  <Minimize2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Welcome Message or Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {chatMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Bot className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Hi Hassan! 👋
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    I'm your AI recruitment assistant. I can help you:
                  </p>
                  <div className="space-y-2 text-left w-full">
                    <div className="p-3 bg-white rounded-lg border border-purple-100 text-sm">
                      <span className="text-purple-600 font-semibold">🔍</span> Find top candidates
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-purple-100 text-sm">
                      <span className="text-purple-600 font-semibold">📊</span> Compare profiles
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-purple-100 text-sm">
                      <span className="text-purple-600 font-semibold">✉️</span> Draft & send emails
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    Try: "Show me top AI engineers"
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div 
                      key={index}
                      className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div className={`max-w-[75%] ${
                        message.role === 'user' ? 'order-2' : ''
                      }`}>
                        <div 
                          className={`px-4 py-2 rounded-2xl ${
                            message.role === 'user' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                          }`}
                          style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                        >
                          {message.content}
                        </div>
                        <p className="text-xs text-gray-400 mt-1 px-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      
                      {message.role === 'user' && (
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 order-3">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {chatLoading && (
                    <div className="flex gap-2 justify-start">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="px-4 py-3 rounded-2xl bg-white border border-gray-200">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={chatEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about candidates..."
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm"
                  disabled={chatLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={chatLoading || !chatInput.trim()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-semibold"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by GPT-4 • Press Enter to send
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
