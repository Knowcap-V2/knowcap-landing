'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Download, RefreshCw, Mail, Building, User, Calendar, Lock, LogOut } from 'lucide-react'

interface BetaApplication {
  id: string
  name: string
  email: string
  company: string
  role: string
  motivation: string
  createdAt: string
}

export default function BetaApplicationsPage() {
  const [applications, setApplications] = useState<BetaApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [passcodeError, setPasscodeError] = useState('')

  // Check if already authenticated from session
  useEffect(() => {
    const authenticated = sessionStorage.getItem('betaapp_authenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
    } else {
      setLoading(false)
    }
  }, [])

  const handlePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasscodeError('')
    
    if (passcode === '2686') {
      setIsAuthenticated(true)
      sessionStorage.setItem('betaapp_authenticated', 'true')
      setPasscode('')
    } else {
      setPasscodeError('Invalid passcode. Please try again.')
      setPasscode('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('betaapp_authenticated')
    setApplications([])
  }

  const fetchApplications = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/beta-applications')
      if (!response.ok) {
        throw new Error('Failed to fetch applications')
      }
      const data = await response.json()
      setApplications(data.applications || [])
    } catch (err) {
      setError('Failed to load applications. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications()
    }
  }, [isAuthenticated])

  const downloadCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Company', 'Role', 'Submitted', 'Motivation']
    const rows = applications.map(app => [
      app.id,
      app.name,
      app.email,
      app.company,
      app.role,
      new Date(app.createdAt).toLocaleString(),
      `"${app.motivation.replace(/"/g, '""')}"`
    ])
    
    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `beta-applications-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Show passcode form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-[#E5E5E5] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#005EFF]/10 mb-4">
              <Lock className="w-8 h-8 text-[#005EFF]" />
            </div>
            <h1 className="text-2xl font-bold text-[#0A0D12] mb-2">Admin Access Required</h1>
            <p className="text-gray-600">Enter passcode to view beta applications</p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="text-center text-lg tracking-widest"
                autoFocus
              />
            </div>

            {passcodeError && (
              <p className="text-sm text-red-600 text-center">{passcodeError}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-[#005EFF] text-white hover:bg-[#0047CC] transition-colors"
              disabled={!passcode}
            >
              Access Dashboard
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-[#E5E5E5] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-[#0A0D12] mb-2">Beta Applications</h1>
              <p className="text-gray-600">
                Total Applications: <span className="font-semibold text-[#005EFF]">{applications.length}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Button
                onClick={fetchApplications}
                disabled={loading}
                className="bg-white text-[#005EFF] border border-[#005EFF] hover:bg-[#005EFF] hover:text-white transition-colors"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                onClick={downloadCSV}
                disabled={applications.length === 0}
                className="bg-[#005EFF] text-white hover:bg-[#0047CC] transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="p-4 mb-6 bg-red-50 border-red-200">
            <p className="text-red-600">{error}</p>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <Card className="p-12 text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-[#005EFF]" />
            <p className="text-gray-600">Loading applications...</p>
          </Card>
        )}

        {/* Empty State */}
        {!loading && applications.length === 0 && !error && (
          <Card className="p-12 text-center">
            <Mail className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Yet</h3>
            <p className="text-gray-600">Beta applications will appear here once submitted.</p>
          </Card>
        )}

        {/* Applications List */}
        {!loading && applications.length > 0 && (
          <div className="space-y-4">
            {applications.map((app, index) => (
              <Card key={app.id} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-[#005EFF]">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-[#0A0D12]">{app.name}</h3>
                          <Badge variant="outline" className="bg-[#005EFF]/10 text-[#005EFF] border-[#005EFF]/20">
                            #{index + 1}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${app.email}`} className="hover:text-[#005EFF] transition-colors">
                              {app.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            <span>{app.company}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{app.role}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Motivation */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">What brings them to Knowcap:</h4>
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{app.motivation}</p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="lg:text-right space-y-2">
                    <div className="flex items-center gap-2 lg:justify-end text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {new Date(app.createdAt).toLocaleTimeString()}
                    </p>
                    <p className="text-xs text-gray-400 font-mono">ID: {app.id}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        {!loading && applications.length > 0 && (
          <Card className="mt-8 p-6 bg-gradient-to-r from-[#005EFF]/5 to-[#443AFF]/5 border-[#005EFF]/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-[#005EFF]">{applications.length}</p>
                <p className="text-sm text-gray-600 mt-1">Total Applications</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#005EFF]">
                  {new Set(applications.map(a => a.company)).size}
                </p>
                <p className="text-sm text-gray-600 mt-1">Unique Companies</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#005EFF]">
                  {applications.filter(a => {
                    const date = new Date(a.createdAt)
                    const today = new Date()
                    return date.toDateString() === today.toDateString()
                  }).length}
                </p>
                <p className="text-sm text-gray-600 mt-1">Today</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
