'use client'

import { useState, useEffect } from 'react'
import { Lock, LogOut, Download, Trash2, RefreshCw, FileDown } from 'lucide-react'

export default function BetaAppDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'beta' | 'contact' | 'recruitment'>('beta')
  
  const [betaApplications, setBetaApplications] = useState<any[]>([])
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([])
  const [recruitmentApplications, setRecruitmentApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : (
          <>
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
            {activeTab === 'recruitment' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Recruitment Applications</h2>
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
                      onClick={() => exportToCSV(recruitmentApplications, 'recruitment-applications.csv', ['fullName', 'email', 'role', 'referralSource', 'linkedin', 'portfolio', 'aiProject', 'additionalInfo', 'resumePath', 'createdAt'])}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </button>
                  </div>
                </div>

                {recruitmentApplications.length === 0 ? (
                  <div className="pitch-card text-center" style={{ padding: '3rem' }}>
                    <p className="text-gray-600">No applications yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recruitmentApplications.map((app) => (
                      <div key={app.id} className="pitch-card" style={{ padding: '2rem', position: 'relative' }}>
                        <button
                          onClick={() => handleDeleteRecruitment(app.id)}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          title="Delete application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid md:grid-cols-2 gap-6">
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
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </>
  )
}
