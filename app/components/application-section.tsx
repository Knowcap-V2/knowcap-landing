
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileText, Send, CheckCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function ApplicationSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    experience: '',
    teamSize: '',
    avgProjects: '',
    biggestChallenge: '',
    whyInterested: '',
    commitmentLevel: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    const requiredFields = ['name', 'email', 'company', 'experience', 'teamSize', 'avgProjects', 'biggestChallenge', 'whyInterested', 'commitmentLevel']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])
    
    if (missingFields.length > 0) {
      toast({
        title: "Please fill in all required fields",
        description: "All fields are required for application review.",
        variant: "destructive"
      })
      return
    }

    // Simulate form submission
    console.log('Application submitted:', formData)
    setIsSubmitted(true)
    
    toast({
      title: "Application Submitted Successfully!",
      description: "Hassan will review your application within 48 hours.",
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (isSubmitted) {
    return (
      <section id="application" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center bg-card border border-border rounded-lg p-12"
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Application Submitted!</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Thank you for your interest in the Odoo Founders Circle. 
              Hassan will personally review your application within 48 hours.
            </p>
            <p className="text-muted-foreground mb-4">
              If selected, you'll receive a personal email from <span className="text-cyan-400">hsa@knowcap.ai</span> 
              to schedule a 30-minute discovery call.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 border-l-4 border-cyan-400">
              <p className="text-sm text-cyan-300">
                <strong>Next Steps:</strong> Watch for an email from Hassan within 48 hours. 
                Check your spam folder just in case!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="application" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <FileText className="w-6 h-6 text-cyan-400" />
            <span className="text-sm font-medium text-muted-foreground">Application Form</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Apply for the <span className="gradient-text">Founders Circle</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            This isn't a sales form. It's a partnership application. 
            I need to understand your experience, your challenges, and your commitment level.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Your full name"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="company" className="text-sm font-medium">Company Name *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="Your Odoo Partner company name"
                className="mt-2"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="experience" className="text-sm font-medium">Years of Odoo Experience *</Label>
                <Select onValueChange={(value) => handleChange('experience', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-8">5-8 years</SelectItem>
                    <SelectItem value="8-12">8-12 years</SelectItem>
                    <SelectItem value="12+">12+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="teamSize" className="text-sm font-medium">Team Size *</Label>
                <Select onValueChange={(value) => handleChange('teamSize', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">Solo practitioner</SelectItem>
                    <SelectItem value="2-5">2-5 people</SelectItem>
                    <SelectItem value="6-15">6-15 people</SelectItem>
                    <SelectItem value="16-30">16-30 people</SelectItem>
                    <SelectItem value="30+">30+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="avgProjects" className="text-sm font-medium">Average Active Projects *</Label>
              <Select onValueChange={(value) => handleChange('avgProjects', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="How many projects do you typically manage simultaneously?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3">1-3 projects</SelectItem>
                  <SelectItem value="4-8">4-8 projects</SelectItem>
                  <SelectItem value="9-15">9-15 projects</SelectItem>
                  <SelectItem value="16+">16+ projects</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="biggestChallenge" className="text-sm font-medium">
                What's your biggest project management challenge right now? *
              </Label>
              <Textarea
                id="biggestChallenge"
                value={formData.biggestChallenge}
                onChange={(e) => handleChange('biggestChallenge', e.target.value)}
                placeholder="Be specific. What keeps you up at night regarding project management?"
                className="mt-2 min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="whyInterested" className="text-sm font-medium">
                Why are you interested in the Founders Circle? *
              </Label>
              <Textarea
                id="whyInterested"
                value={formData.whyInterested}
                onChange={(e) => handleChange('whyInterested', e.target.value)}
                placeholder="What do you hope to gain? What are you willing to contribute?"
                className="mt-2 min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="commitmentLevel" className="text-sm font-medium">
                Commitment Level *
              </Label>
              <Select onValueChange={(value) => handleChange('commitmentLevel', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="How much time can you commit to testing and feedback?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light (2-3 hours/month) - Basic testing</SelectItem>
                  <SelectItem value="moderate">Moderate (5-8 hours/month) - Regular feedback</SelectItem>
                  <SelectItem value="heavy">Heavy (10+ hours/month) - Deep partnership</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-6 border-t border-border">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-4"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Application
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Applications are reviewed personally by Hassan within 48 hours. 
                If selected, you'll receive a direct email to schedule a discovery call.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
