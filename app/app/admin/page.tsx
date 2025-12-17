'use client'

import { useState, useEffect } from 'react'
import { Lock, LogOut, Download, Trash2, RefreshCw, FileDown, Sparkles, TrendingUp, Users, Briefcase, Star, Award, AlertCircle, CheckCircle, Clock, Filter, ArrowUpDown, Eye, X, Send, Bot, User } from 'lucide-react'

export default function BetaAppDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'beta' | 'contact' | 'recruitment' | 'dashboard' | 'ai-assistant'>('dashboard')
  
  const [betaApplications, setBetaApplications] = useState<any[]>([])
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([])
  const [recruitmentApplications, setRecruitmentApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [scoringInProgress, setScoringInProgress] = useState(false)
  
  // Dashboard filters and state
  const [selectedRole, setSelectedRole] = useState<string>('all')
  const [selectedRecommendation, setSelectedRecommendation] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'score' | 'date' | 'name'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  
  // AI Assistant chat state
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string, timestamp: Date}>>([])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)

  useEffect(() => {
    document.title = 'Admin Dashboard | Knowcap.ai'
    // Check if already authenticated
    const authenticated = sessionStorage.getItem('admin_authenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
      fetchData()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch all three types of data
      const [betaRes, contactRes, recruitmentRes] = await Promise.all([
        fetch('/api/beta-applications'),
        fetch('/api/contact-submissions'),
        fetch('/api/recruitment-applications')
      ])

      if (betaRes.ok) {
        const data = await betaRes.json()
        setBetaApplications(Array.isArray(data) ? data : [])
      } else {
        setBetaApplications([])
      }
      
      if (contactRes.ok) {
        const data = await contactRes.json()
        setContactSubmissions(Array.isArray(data) ? data : [])
      } else {
        setContactSubmissions([])
      }
      
      if (recruitmentRes.ok) {
        const data = await recruitmentRes.json()
        setRecruitmentApplications(Array.isArray(data) ? data : [])
      } else {
        setRecruitmentApplications([])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      // Ensure arrays are set even on error
      setBetaApplications([])
      setContactSubmissions([])
      setRecruitmentApplications([])
    }
    setLoading(false)
  }

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === '2686') {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_authenticated', 'true')
      setError('')
      fetchData()
    } else {
      setError('Invalid passcode')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated')
    setIsAuthenticated(false)
    setPasscode('')
  }

  const exportToCSV = (data: any[], filename: string, columns: string[]) => {
    const headers = columns.join(',')
    const rows = data.map(item => 
      columns.map(col => {
        const value = item[col] || ''
        return `"${String(value).replace(/"/g, '""')}"`
      }).join(',')
    )
    const csv = [headers, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleDeleteBeta = async (id: string) => {
    if (!confirm('Are you sure you want to delete this beta application?')) return
    
    try {
      const response = await fetch(`/api/delete-beta-application?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setBetaApplications(betaApplications.filter(app => app.id !== id))
        alert('Application deleted successfully')
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete application')
    }
  }

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) return
    
    try {
      const response = await fetch(`/api/delete-contact-submission?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setContactSubmissions(contactSubmissions.filter(sub => sub.id !== id))
        alert('Submission deleted successfully')
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete submission')
    }
  }

  const handleDeleteRecruitment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this recruitment application?')) return
    
    try {
      const response = await fetch(`/api/delete-recruitment-application?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setRecruitmentApplications(recruitmentApplications.filter(app => app.id !== id))
        alert('Application deleted successfully')
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete application')
    }
  }

  const handleScoreAll = async () => {
    if (!confirm('This will score all unscored applications using AI. This may take a few minutes. Continue?')) return
    
    setScoringInProgress(true)
    try {
      const response = await fetch('/api/score-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bulkScore: true })
      })
      
      if (response.ok) {
        const result = await response.json()
        alert(`Successfully scored ${result.count} applications!`)
        await fetchData()
      } else {
        throw new Error('Scoring failed')
      }
    } catch (error) {
      console.error('Scoring error:', error)
      alert('Failed to score applications. Please try again.')
    }
    setScoringInProgress(false)
  }


  const handleDownloadResume = async (id: string, filename: string) => {
    try {
      const response = await fetch(`/api/download-resume?id=${id}`)
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to download resume')
      }
      
      const data = await response.json()
      
      // Create a temporary anchor element and trigger download
      const a = document.createElement('a')
      a.href = data.url
      a.download = filename
      a.target = '_blank'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download error:', error)
      alert('Failed to download resume. The file may not be available.')
    }
  }
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


  // Helper functions for displaying scores and recommendations
  const getScoreColor = (score: number | null) => {
    if (score === null) return 'text-gray-400'
    if (score >= 90) return 'text-green-600'
    if (score >= 75) return 'text-blue-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number | null) => {
    if (score === null) return 'bg-gray-100'
    if (score >= 90) return 'bg-green-100'
    if (score >= 75) return 'bg-blue-100'
    if (score >= 60) return 'bg-yellow-100'
    if (score >= 40) return 'bg-orange-100'
    return 'bg-red-100'
  }

  const getRecommendationBadge = (recommendation: string | null) => {
    const badges = {
      strong_fit: { label: 'Strong Fit', color: 'bg-green-500', icon: CheckCircle },
      good_fit: { label: 'Good Fit', color: 'bg-blue-500', icon: Star },
      moderate_fit: { label: 'Moderate Fit', color: 'bg-yellow-500', icon: AlertCircle },
      weak_fit: { label: 'Weak Fit', color: 'bg-red-500', icon: X }
    }
    return badges[recommendation as keyof typeof badges] || { label: 'Not Scored', color: 'bg-gray-400', icon: Clock }
  }

  const getRoleDisplayName = (role: string) => {
    const roleNames: Record<string, string> = {
      'founding-ai-engineer': 'Founding AI Engineer',
      'head-of-growth': 'Head of Growth',
      'content-creator-intern': 'Content Creator Intern',
      'product-manager': 'Product Manager',
      'qa-specialist': 'QA Specialist',
      'executive-assistant': 'Executive Assistant'
    }
    return roleNames[role] || role
  }

  // Get filtered and sorted applications
  const getFilteredApplications = () => {
    let filtered = [...recruitmentApplications]
    
    if (selectedRole !== 'all') {
      filtered = filtered.filter(app => app.role === selectedRole)
    }
    
    if (selectedRecommendation !== 'all') {
      filtered = filtered.filter(app => app.recommendation === selectedRecommendation)
    }
    
    // Sort
    filtered.sort((a, b) => {
      let comparison = 0
      if (sortBy === 'score') {
        comparison = (a.aiScore || 0) - (b.aiScore || 0)
      } else if (sortBy === 'date') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else if (sortBy === 'name') {
        comparison = a.fullName.localeCompare(b.fullName)
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })
    
    return filtered
  }

  // Calculate dashboard metrics
  const getDashboardMetrics = () => {
    const total = recruitmentApplications.length
    const scored = recruitmentApplications.filter(app => app.aiScore !== null).length
    const unscored = total - scored
    
    const scoredApps = recruitmentApplications.filter(app => app.aiScore !== null)
    const averageScore = scoredApps.length > 0
      ? Math.round(scoredApps.reduce((sum, app) => sum + app.aiScore, 0) / scoredApps.length)
      : 0
    
    const strongCandidates = recruitmentApplications.filter(app => 
      app.recommendation === 'strong_fit' || app.aiScore >= 80
    ).length
    
    // Group by role
    const byRole: Record<string, { count: number; scored: number; avgScore: number; applications: any[] }> = {}
    recruitmentApplications.forEach(app => {
      if (!byRole[app.role]) {
        byRole[app.role] = { count: 0, scored: 0, avgScore: 0, applications: [] }
      }
      byRole[app.role].count++
      byRole[app.role].applications.push(app)
      if (app.aiScore !== null) {
        byRole[app.role].scored++
      }
    })
    
    // Calculate average scores per role
    Object.keys(byRole).forEach(role => {
      const scoredInRole = byRole[role].applications.filter(app => app.aiScore !== null)
      byRole[role].avgScore = scoredInRole.length > 0
        ? Math.round(scoredInRole.reduce((sum, app) => sum + app.aiScore, 0) / scoredInRole.length)
        : 0
    })
    
    // Top candidates
    const topCandidates = recruitmentApplications
      .filter(app => app.aiScore !== null)
      .sort((a, b) => b.aiScore - a.aiScore)
      .slice(0, 5)
    
    return {
      total,
      scored,
      unscored,
      averageScore,
      strongCandidates,
      byRole,
      topCandidates
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-light-pitch)' }}>
        <div className="pitch-card max-w-md w-full" style={{ padding: '3rem' }}>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Admin Dashboard</h1>
            <p className="text-gray-600">Enter passcode to access</p>
          </div>

          <form onSubmit={handlePasscodeSubmit}>
            <div className="mb-6">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                autoFocus
              />
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white transition-all"
              style={{ background: 'var(--primary-blue)' }}
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen" style={{ background: 'var(--bg-light-pitch)' }}>
      <div className="container max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'dashboard' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            📊 Recruitment Dashboard
          </button>
          <button
            onClick={() => setActiveTab('recruitment')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'recruitment' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Recruitment ({recruitmentApplications.length})
          </button>
          <button
            onClick={() => setActiveTab('beta')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'beta' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Beta Applications ({betaApplications.length})
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'contact' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Contact Us ({contactSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('ai-assistant')}
            className={`px-6 py-3 font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'ai-assistant' 
                ? 'border-b-2 border-purple-600 text-purple-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <Bot className="w-5 h-5" />
            AI Assistant
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : (
          <>
            {/* Recruitment Dashboard Tab */}
            {activeTab === 'dashboard' && (() => {
              const metrics = getDashboardMetrics()
              return (
                <div>
                  <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Recruitment Dashboard
                  </h2>

                  {/* Overview Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    <div className="pitch-card" style={{ padding: '1.5rem' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        <p className="text-sm text-gray-600 font-medium">Total Applications</p>
                      </div>
                      <p className="text-3xl font-bold">{metrics.total}</p>
                    </div>
                    
                    <div className="pitch-card" style={{ padding: '1.5rem' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="text-sm text-gray-600 font-medium">Scored</p>
                      </div>
                      <p className="text-3xl font-bold text-green-600">{metrics.scored}</p>
                    </div>

                    <div className="pitch-card" style={{ padding: '1.5rem' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-5 h-5 text-orange-600" />
                        <p className="text-sm text-gray-600 font-medium">Unscored</p>
                      </div>
                      <p className="text-3xl font-bold text-orange-600">{metrics.unscored}</p>
                    </div>

                    <div className="pitch-card" style={{ padding: '1.5rem' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <p className="text-sm text-gray-600 font-medium">Avg Score</p>
                      </div>
                      <p className="text-3xl font-bold text-blue-600">{metrics.averageScore}</p>
                    </div>

                    <div className="pitch-card" style={{ padding: '1.5rem' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <Star className="w-5 h-5 text-yellow-600" />
                        <p className="text-sm text-gray-600 font-medium">Strong Candidates</p>
                      </div>
                      <p className="text-3xl font-bold text-yellow-600">{metrics.strongCandidates}</p>
                    </div>
                  </div>

                  {/* Applications by Role */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Applications by Role
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(metrics.byRole).map(([role, data]) => (
                        <div key={role} className="pitch-card" style={{ padding: '1.5rem' }}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-5 h-5 text-blue-600" />
                              <h4 className="font-semibold">{getRoleDisplayName(role)}</h4>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedRole(role)
                                setActiveTab('recruitment')
                              }}
                              className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                            >
                              View
                            </button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Total:</span>
                              <span className="font-semibold">{data.count}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Scored:</span>
                              <span className="font-semibold text-green-600">{data.scored}</span>
                            </div>
                            {data.avgScore > 0 && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Avg Score:</span>
                                <span className={`font-semibold ${getScoreColor(data.avgScore)}`}>
                                  {data.avgScore}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Candidates */}
                  {metrics.topCandidates.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Top Candidates
                      </h3>
                      <div className="space-y-3">
                        {metrics.topCandidates.map((app, index) => {
                          const badge = getRecommendationBadge(app.recommendation)
                          const BadgeIcon = badge.icon
                          return (
                            <div key={app.id} className="pitch-card" style={{ padding: '1.5rem' }}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-full ${getScoreBgColor(app.aiScore)} flex items-center justify-center`}>
                                    <span className={`font-bold text-lg ${getScoreColor(app.aiScore)}`}>
                                      #{index + 1}
                                    </span>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-lg">{app.fullName}</h4>
                                    <p className="text-sm text-gray-600">{getRoleDisplayName(app.role)}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className={`px-3 py-1 rounded-full ${badge.color} text-white text-sm font-medium flex items-center gap-1`}>
                                    <BadgeIcon className="w-4 h-4" />
                                    {badge.label}
                                  </div>
                                  <div className={`px-4 py-2 rounded-lg ${getScoreBgColor(app.aiScore)} flex items-center gap-1`}>
                                    <Award className="w-4 h-4 text-yellow-600" />
                                    <span className={`font-bold text-lg ${getScoreColor(app.aiScore)}`}>
                                      {app.aiScore}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => setSelectedApplication(app)}
                                    className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                    title="View details"
                                  >
                                    <Eye className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  {metrics.unscored > 0 && (
                    <div className="mt-8 text-center">
                      <button
                        onClick={handleScoreAll}
                        disabled={scoringInProgress}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                          scoringInProgress
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                      >
                        <Sparkles className="w-5 h-5" />
                        {scoringInProgress ? 'Scoring...' : `Score ${metrics.unscored} Unscored Applications`}
                      </button>
                    </div>
                  )}
                </div>
              )
            })()}

            {/* Beta Applications Tab */}
            {activeTab === 'beta' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Beta Applications</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={fetchData}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                      title="Refresh data"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Refresh
                    </button>
                    <button
                      onClick={() => exportToCSV(betaApplications, 'beta-applications.csv', ['name', 'email', 'company', 'role', 'motivation', 'createdAt'])}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </button>
                  </div>
                </div>

                {betaApplications.length === 0 ? (
                  <div className="pitch-card text-center" style={{ padding: '3rem' }}>
                    <p className="text-gray-600">No applications yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {betaApplications.map((app) => (
                      <div key={app.id} className="pitch-card" style={{ padding: '2rem', position: 'relative' }}>
                        <button
                          onClick={() => handleDeleteBeta(app.id)}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          title="Delete application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Name</p>
                            <p className="font-semibold">{app.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Email</p>
                            <p className="font-semibold">{app.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Company</p>
                            <p className="font-semibold">{app.company}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Role</p>
                            <p className="font-semibold">{app.role}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-500 mb-1">Motivation</p>
                            <p className="text-gray-700">{app.motivation}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-500">Submitted: {new Date(app.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Contact Submissions Tab */}
            {activeTab === 'contact' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Contact Submissions</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={fetchData}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                      title="Refresh data"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Refresh
                    </button>
                    <button
                      onClick={() => exportToCSV(contactSubmissions, 'contact-submissions.csv', ['name', 'email', 'company', 'subject', 'message', 'createdAt'])}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </button>
                  </div>
                </div>

                {contactSubmissions.length === 0 ? (
                  <div className="pitch-card text-center" style={{ padding: '3rem' }}>
                    <p className="text-gray-600">No submissions yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contactSubmissions.map((submission) => (
                      <div key={submission.id} className="pitch-card" style={{ padding: '2rem', position: 'relative' }}>
                        <button
                          onClick={() => handleDeleteContact(submission.id)}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          title="Delete submission"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Name</p>
                            <p className="font-semibold">{submission.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Email</p>
                            <p className="font-semibold">{submission.email}</p>
                          </div>
                          {submission.company && (
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Company</p>
                              <p className="font-semibold">{submission.company}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Subject</p>
                            <p className="font-semibold">{submission.subject}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-500 mb-1">Message</p>
                            <p className="text-gray-700 whitespace-pre-wrap">{submission.message}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-500">Submitted: {new Date(submission.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Recruitment Applications Tab */}
            {activeTab === 'recruitment' && (() => {
              const filteredApps = getFilteredApplications()
              const metrics = getDashboardMetrics()
              
              return (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Recruitment Applications
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={fetchData}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        title="Refresh data"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                      </button>
                      <button
                        onClick={handleScoreAll}
                        disabled={scoringInProgress}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          scoringInProgress
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                        title="Score all applications with AI"
                      >
                        <Sparkles className="w-4 h-4" />
                        {scoringInProgress ? 'Scoring...' : 'Score All with AI'}
                      </button>
                      <button
                        onClick={() => exportToCSV(recruitmentApplications, 'recruitment-applications.csv', ['fullName', 'email', 'role', 'referralSource', 'linkedin', 'portfolio', 'aiProject', 'additionalInfo', 'resumePath', 'aiScore', 'recommendation', 'createdAt'])}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Export CSV
                      </button>
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="pitch-card mb-6" style={{ padding: '1.5rem' }}>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Filters:</span>
                      </div>
                      
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                      >
                        <option value="all">All Roles</option>
                        {Object.keys(metrics.byRole).map(role => (
                          <option key={role} value={role}>{getRoleDisplayName(role)}</option>
                        ))}
                      </select>

                      <select
                        value={selectedRecommendation}
                        onChange={(e) => setSelectedRecommendation(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                      >
                        <option value="all">All Recommendations</option>
                        <option value="strong_fit">Strong Fit</option>
                        <option value="good_fit">Good Fit</option>
                        <option value="moderate_fit">Moderate Fit</option>
                        <option value="weak_fit">Weak Fit</option>
                      </select>

                      <div className="flex items-center gap-2 ml-auto">
                        <ArrowUpDown className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Sort by:</span>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as any)}
                          className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                        >
                          <option value="date">Date</option>
                          <option value="score">Score</option>
                          <option value="name">Name</option>
                        </select>
                        <button
                          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                          className="px-3 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors"
                        >
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                      </div>
                    </div>
                    
                    {(selectedRole !== 'all' || selectedRecommendation !== 'all') && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          Showing {filteredApps.length} of {recruitmentApplications.length} applications
                          {selectedRole !== 'all' || selectedRecommendation !== 'all' ? (
                            <button
                              onClick={() => {
                                setSelectedRole('all')
                                setSelectedRecommendation('all')
                              }}
                              className="ml-2 text-blue-600 hover:underline"
                            >
                              Clear filters
                            </button>
                          ) : null}
                        </p>
                      </div>
                    )}
                  </div>

                  {filteredApps.length === 0 ? (
                    <div className="pitch-card text-center" style={{ padding: '3rem' }}>
                      <p className="text-gray-600">No applications match your filters</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredApps.map((app) => {
                        const badge = getRecommendationBadge(app.recommendation)
                        const BadgeIcon = badge.icon
                        return (
                      <div key={app.id} className="pitch-card" style={{ padding: '2rem', position: 'relative' }}>
                        <button
                          onClick={() => handleDeleteRecruitment(app.id)}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          title="Delete application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        {/* AI Score Badge */}
                        {app.aiScore !== null && (
                          <div className="absolute top-4 left-4 flex items-center gap-2">
                            <div className={`px-3 py-1 rounded-full ${badge.color} text-white text-sm font-medium flex items-center gap-1`}>
                              <BadgeIcon className="w-4 h-4" />
                              {badge.label}
                            </div>
                            <div className={`px-3 py-1 rounded-lg ${getScoreBgColor(app.aiScore)} font-bold ${getScoreColor(app.aiScore)}`}>
                              Score: {app.aiScore}
                            </div>
                          </div>
                        )}
                        
                        <div className="grid md:grid-cols-2 gap-6" style={{ marginTop: app.aiScore !== null ? '2rem' : '0' }}>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Name</p>
                            <p className="font-semibold">{app.fullName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Email</p>
                            <p className="font-semibold">{app.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Role</p>
                            <p className="font-semibold">{app.role}</p>
                          </div>
                          {app.referralSource && (
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Heard About Us</p>
                              <p className="text-gray-700">{app.referralSource}</p>
                            </div>
                          )}
                          {app.linkedin && (
                            <div>
                              <p className="text-sm text-gray-500 mb-1">LinkedIn</p>
                              <a href={app.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{app.linkedin}</a>
                            </div>
                          )}
                          {app.portfolio && (
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Portfolio</p>
                              <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{app.portfolio}</a>
                            </div>
                          )}
                          {app.aiProject && (
                            <div className="md:col-span-2">
                              <p className="text-sm text-gray-500 mb-1">AI Project</p>
                              <p className="text-gray-700 whitespace-pre-wrap">{app.aiProject}</p>
                            </div>
                          )}
                          {app.additionalInfo && (
                            <div className="md:col-span-2">
                              <p className="text-sm text-gray-500 mb-1">Additional Information</p>
                              <p className="text-gray-700 whitespace-pre-wrap">{app.additionalInfo}</p>
                            </div>
                          )}
                          {app.resumePath && (
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Resume</p>
                              <div className="flex items-center gap-2">
                                <p className="text-gray-700">{app.resumePath}</p>
                                {app.cloud_storage_path && (
                                  <button
                                    onClick={() => handleDownloadResume(app.id, app.resumePath)}
                                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm"
                                    title="Download resume"
                                  >
                                    <FileDown className="w-4 h-4" />
                                    Download
                                  </button>
                                )}
                                {!app.cloud_storage_path && (
                                  <span className="text-xs text-gray-500 italic">(File not available)</span>
                                )}
                              </div>
                            </div>
                          )}
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-500">Submitted: {new Date(app.createdAt).toLocaleString()}</p>
                          </div>
                          {app.aiScore !== null && app.aiAnalysis && (
                            <div className="md:col-span-2">
                              <button
                                onClick={() => setSelectedApplication(app)}
                                className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                                View AI Analysis
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })()}
          </>
        )}
      </div>
    </div>

        {/* AI Assistant Tab */}
        {activeTab === 'ai-assistant' && (
          <div className="max-w-6xl mx-auto">
            {/* Welcome Card */}
            {chatMessages.length === 0 && (
              <div className="mb-6 p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      AI Recruitment Assistant
                    </h2>
                    <p className="text-purple-700 font-medium">Powered by GPT-4</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Hi Hassan! I'm your AI assistant for recruitment. I can help you:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg border border-purple-100">
                    <h3 className="font-bold text-purple-700 mb-2">🔍 Find Candidates</h3>
                    <p className="text-sm text-gray-600">Query by role, score, skills, or any criteria</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-purple-100">
                    <h3 className="font-bold text-purple-700 mb-2">📊 Compare Profiles</h3>
                    <p className="text-sm text-gray-600">Side-by-side analysis of top candidates</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-purple-100">
                    <h3 className="font-bold text-purple-700 mb-2">✉️ Draft Emails</h3>
                    <p className="text-sm text-gray-600">Personalized outreach with booking links</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-purple-100">
                    <h3 className="font-bold text-purple-700 mb-2">📧 Send Invites</h3>
                    <p className="text-sm text-gray-600">Email directly from hsa@knowcap.ai</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-purple-100 rounded-lg">
                  <p className="text-sm text-purple-800 font-medium mb-2">💡 Try asking:</p>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• "Who are my top 3 AI engineer candidates?"</li>
                    <li>• "Show me Product Managers with 75+ scores"</li>
                    <li>• "Draft an interview invite for Belal Bahr"</li>
                    <li>• "Compare Mohamed Ibrahim and Ahmed Mahdi"</li>
                  </ul>
                </div>
              </div>
            )}
            
            {/* Chat Messages */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-6" style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.length === 0 && (
                  <div className="text-center text-gray-400 py-20">
                    <Bot className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>Start a conversation to get help with recruitment</p>
                  </div>
                )}
                
                {chatMessages.map((message, index) => (
                  <div 
                    key={index}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-[70%] ${message.role === 'user' ? 'order-1' : ''}`}>
                      <div 
                        className={`px-4 py-3 rounded-2xl ${
                          message.role === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-900 border border-gray-200'
                        }`}
                        style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                      >
                        {message.content}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 px-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    
                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                
                {chatLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-gray-100 border border-gray-200">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    placeholder="Ask about candidates, draft emails, compare applicants..."
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    disabled={chatLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={chatLoading || !chatInput.trim()}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-semibold"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter to send • Shift+Enter for new line
                </p>
              </div>
            </div>
            
            {/* Quick Stats for Context */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 font-medium">Total Applications</p>
                <p className="text-2xl font-bold text-blue-900">{recruitmentApplications.length}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700 font-medium">Strong Candidates</p>
                <p className="text-2xl font-bold text-green-900">
                  {recruitmentApplications.filter(a => a.aiScore && a.aiScore >= 80).length}
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-700 font-medium">Average Score</p>
                <p className="text-2xl font-bold text-purple-900">
                  {Math.round(recruitmentApplications.reduce((sum, a) => sum + (a.aiScore || 0), 0) / recruitmentApplications.length || 0)}
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-700 font-medium">Emails Sent</p>
                <p className="text-2xl font-bold text-orange-900">
                  {chatMessages.filter(m => m.content.includes('Email sent to')).length}
                </p>
              </div>
            </div>
          </div>
        )}

    {/* Application Detail Modal */}
    {selectedApplication && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto" 
        onClick={() => setSelectedApplication(null)}
        style={{ backdropFilter: 'blur(4px)' }}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 relative" 
          style={{ maxHeight: 'calc(100vh - 4rem)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Scrollable Content */}
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 4rem)', padding: '2rem' }}>
            <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {selectedApplication.fullName}
              </h2>
              <p className="text-gray-600">{getRoleDisplayName(selectedApplication.role)}</p>
            </div>
            <button
              onClick={() => setSelectedApplication(null)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Score and Recommendation */}
          {selectedApplication.aiScore !== null && (() => {
            const badge = getRecommendationBadge(selectedApplication.recommendation)
            const BadgeIcon = badge.icon
            return (
              <div className="mb-6 p-5 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                <div className="flex items-stretch gap-4 mb-4">
                  <div className={`px-6 py-4 rounded-xl ${getScoreBgColor(selectedApplication.aiScore)} flex flex-col justify-center items-center min-w-[140px] shadow-sm`}>
                    <p className="text-xs text-gray-600 mb-2 font-medium uppercase tracking-wide">AI Score</p>
                    <p className={`text-5xl font-bold ${getScoreColor(selectedApplication.aiScore)}`}>
                      {selectedApplication.aiScore}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">out of 100</p>
                  </div>
                  <div className={`flex-1 px-5 py-4 rounded-xl ${badge.color} text-white flex flex-col justify-center shadow-sm`}>
                    <div className="flex items-center gap-2 mb-2">
                      <BadgeIcon className="w-6 h-6" />
                      <p className="font-semibold text-sm uppercase tracking-wide">Recommendation</p>
                    </div>
                    <p className="text-2xl font-bold">{badge.label}</p>
                  </div>
                </div>

                {/* AI Analysis */}
                {selectedApplication.aiAnalysis && (
                  <div className="mb-5 p-4 bg-white rounded-lg border border-gray-200">
                    <h4 className="font-bold mb-3 flex items-center gap-2 text-lg">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      AI Analysis
                    </h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedApplication.aiAnalysis}</p>
                  </div>
                )}

                {/* Strengths and Weaknesses Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  {selectedApplication.strengths && (() => {
                    try {
                      const strengths = JSON.parse(selectedApplication.strengths)
                      if (strengths.length > 0) {
                        return (
                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <h4 className="font-bold mb-3 flex items-center gap-2 text-green-700 text-lg">
                              <CheckCircle className="w-5 h-5" />
                              Strengths
                            </h4>
                            <ul className="space-y-2">
                              {strengths.map((strength: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-gray-800">
                                  <span className="text-green-600 mt-1">✓</span>
                                  <span className="flex-1">{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      }
                    } catch (e) {}
                    return null
                  })()}

                  {/* Weaknesses */}
                  {selectedApplication.weaknesses && (() => {
                    try {
                      const weaknesses = JSON.parse(selectedApplication.weaknesses)
                      if (weaknesses.length > 0) {
                        return (
                          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                            <h4 className="font-bold mb-3 flex items-center gap-2 text-orange-700 text-lg">
                              <AlertCircle className="w-5 h-5" />
                              Areas for Consideration
                            </h4>
                            <ul className="space-y-2">
                              {weaknesses.map((weakness: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-gray-800">
                                  <span className="text-orange-600 mt-1">⚠</span>
                                  <span className="flex-1">{weakness}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      }
                    } catch (e) {}
                    return null
                  })()}
                </div>
              </div>
            )
          })()}

          {/* Application Details */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Application Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">Email</p>
                <p className="font-semibold text-gray-900 break-all">{selectedApplication.email}</p>
              </div>

              {selectedApplication.referralSource && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">Heard About Us</p>
                  <p className="text-gray-900 font-medium">{selectedApplication.referralSource}</p>
                </div>
              )}

              {selectedApplication.linkedin && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">LinkedIn</p>
                  <a href={selectedApplication.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all font-medium">
                    {selectedApplication.linkedin}
                  </a>
                </div>
              )}

              {selectedApplication.portfolio && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">Portfolio</p>
                  <a href={selectedApplication.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all font-medium">
                    {selectedApplication.portfolio}
                  </a>
                </div>
              )}

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">Submitted</p>
                <p className="text-gray-900 font-medium">{new Date(selectedApplication.createdAt).toLocaleString()}</p>
              </div>

              {selectedApplication.resumePath && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-700 mb-2 font-medium uppercase tracking-wide">Resume</p>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-900 font-medium flex-1 text-sm">{selectedApplication.resumePath}</p>
                    {selectedApplication.cloud_storage_path && (
                      <button
                        onClick={() => handleDownloadResume(selectedApplication.id, selectedApplication.resumePath)}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-semibold"
                      >
                        <FileDown className="w-4 h-4" />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {selectedApplication.aiProject && (
              <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-xs text-purple-700 mb-2 font-medium uppercase tracking-wide">AI Project</p>
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{selectedApplication.aiProject}</p>
              </div>
            )}

            {selectedApplication.additionalInfo && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700 mb-2 font-medium uppercase tracking-wide">Additional Information</p>
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{selectedApplication.additionalInfo}</p>
              </div>
            )}
          </div>

            <div className="mt-8 pt-5 border-t border-gray-200 flex gap-3 sticky bottom-0 bg-white pb-2" style={{ boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <button
                onClick={() => setSelectedApplication(null)}
                className="flex-1 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all font-semibold text-base shadow-sm hover:shadow-md"
              >
                Close
              </button>
              {selectedApplication.email && (
                <a
                  href={`mailto:${selectedApplication.email}`}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all font-semibold text-base text-center shadow-md hover:shadow-lg"
                >
                  📧 Send Email
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}