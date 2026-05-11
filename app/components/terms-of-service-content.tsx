'use client'

import { motion } from 'framer-motion'
import {
  Scale,
  FileText,
  BookOpen,
  UserCircle,
  ShieldCheck,
  Sparkles,
  CreditCard,
  Power,
  AlertTriangle,
  Gavel,
  RefreshCw,
  Mail,
} from 'lucide-react'

const sections = [
  { id: 'acceptance', title: 'Acceptance', icon: FileText },
  { id: 'use-of-service', title: 'Use of Service', icon: BookOpen },
  { id: 'liability', title: 'Liability', icon: Scale },
  { id: 'contact-us', title: 'Contact Us', icon: Mail },
]

export default function TermsOfServiceContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Scale className="w-6 h-6 text-[#005EFF]" />
              <span className="text-sm font-medium text-muted-foreground">Legal Information</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Knowcap Service &amp; Browser Extension &bull; Last updated: May 11, 2026
            </p>

            {/* Quick Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {sections.map((section, index) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-4 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg group"
                >
                  <section.icon className="w-5 h-5 text-[#005EFF] mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-sm font-medium text-center">{section.title}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6 space-y-12">

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Knowcap. These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the Knowcap website, applications, browser extension, and API (collectively, the &ldquo;Service&rdquo;), operated by SMETOOLS LLC (&ldquo;Knowcap,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.
            </p>
          </motion.div>

          {/* 1. Acceptance of Terms */}
          <motion.div
            id="acceptance"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">1. Acceptance of Terms</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              By creating a Knowcap account, signing in with a third-party identity provider, installing the Knowcap browser extension, or otherwise accessing the Service, you confirm that you have read, understood, and agree to be bound by these Terms and our{' '}
              <a href="/policy" className="text-[#005EFF] hover:text-[#0052CC] transition-colors font-medium">Privacy Policy</a>. If you are using the Service on behalf of an organization, you represent that you have authority to bind that organization to these Terms, and &ldquo;you&rdquo; refers to both you and that organization.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If you do not have the authority, or you do not agree with these Terms, you must not accept these Terms and may not use the Service.
            </p>
          </motion.div>

          {/* 2. Description of Service */}
          <motion.div
            id="description"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">2. Description of Service</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Knowcap is a visual transcription platform that watches meetings and screen activity to automatically generate timestamp-backed product requirement documents, standard operating procedures, onboarding guides, and other structured artifacts from your work. The Service turns ephemeral work into verified, searchable memory through transcription, analysis, and AI-generated summaries. Features, integrations, and supported workflows may change over time as we improve the Service.
            </p>
          </motion.div>

          {/* 3. User Accounts */}
          <motion.div
            id="use-of-service"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <UserCircle className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">3. User Accounts</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To use most features of the Service, you must create an account.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">Eligibility.</span> You must be at least 18 years old, or the age of majority in your jurisdiction, to create an account. The Service is not directed to children.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">Accurate information.</span> You agree to provide accurate, current, and complete information during registration and to keep your account information up to date.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">Account security.</span> You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately at <a href="mailto:hsa@smetools.io" className="text-[#005EFF] hover:text-[#0052CC]">hsa@smetools.io</a> if you suspect unauthorized access.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">One person per account.</span> Unless we agree otherwise in writing, you may not share an individual account with other users. Team and organization accounts are governed by their own access controls.</p>
              </div>
            </div>
          </motion.div>

          {/* 4. Acceptable Use */}
          <motion.div
            id="acceptable-use"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">4. Acceptable Use</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree not to misuse the Service. Specifically, you will not:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">Use the Service to upload, record, transcribe, or process content that you do not have the legal right to capture, including content recorded without the consent of participants where consent is required by applicable law.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">Upload or transmit content that is illegal, infringing, defamatory, harassing, harmful, or that violates the privacy or intellectual property rights of others.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">Reverse engineer, decompile, scrape, or attempt to extract the source code of the Service, except to the extent expressly permitted by applicable law.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">Use automated means (bots, crawlers, scripts) to access the Service in a way that exceeds reasonable use, abuses our API, or interferes with normal operation.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">Resell, sublicense, or expose the Service to third parties as a standalone product without our written permission.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">Attempt to gain unauthorized access to other accounts, systems, or networks connected to the Service.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">Interfere with or disrupt the Service, including by introducing malware, denial-of-service attempts, or excessive automated traffic.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">Use the Service to develop a competing product or to train machine learning models that compete with Knowcap.</p></div>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We may suspend or terminate access for violations of this section, at our discretion.
            </p>
          </motion.div>

          {/* 5. User Content */}
          <motion.div
            id="user-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">5. User Content</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <span className="font-semibold text-[#0052CC]">Your content remains yours.</span> You retain all rights to the meetings, recordings, files, transcripts, prompts, and other materials you submit to the Service (&ldquo;User Content&rdquo;).
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <span className="font-semibold text-[#0052CC]">License to operate the Service.</span> You grant Knowcap a worldwide, non-exclusive, royalty-free license to host, store, process, transmit, transcribe, analyze, summarize, embed, and display your User Content solely for the purpose of providing and improving the Service for you and your organization. This license ends when you delete the relevant content, except to the extent that processing has already been completed or backups are subject to standard retention windows described in our Privacy Policy.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <span className="font-semibold text-[#0052CC]">No external model training.</span> We do not use your User Content to train AI or machine learning models for the benefit of any third party. We do not sell your User Content. Aggregated, fully de-identified analytics that cannot reasonably be linked back to you or your organization are an exception and may be used to improve the Service.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <span className="font-semibold text-[#0052CC]">Your responsibility for content.</span> You represent that you have all necessary rights, consents, and permissions to submit your User Content to the Service, including consent from meeting participants where required by applicable law, and that your User Content does not violate these Terms or any law.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <span className="font-semibold text-[#0052CC]">Feedback.</span> If you send us suggestions, ideas, or feedback about the Service, you grant us a perpetual, irrevocable, royalty-free license to use that feedback without obligation to you.
            </p>
          </motion.div>

          {/* 6. Subscriptions, Billing, and Cancellation */}
          <motion.div
            id="billing"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">6. Subscriptions, Billing, and Cancellation</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Knowcap offers free and paid plans. Current pricing, features, and limits are listed on our pricing page.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">Billing cycles.</span> Paid plans are billed in advance on a monthly or annual basis, depending on the plan you select. Fees are non-refundable except as required by law or as expressly stated in these Terms.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">Renewals.</span> Subscriptions automatically renew at the end of each billing cycle at the then-current price unless you cancel before the renewal date.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">Cancellation.</span> You may cancel your subscription at any time from your account settings or by emailing <a href="mailto:hsa@smetools.io" className="text-[#005EFF] hover:text-[#0052CC]">hsa@smetools.io</a>. Cancellation takes effect at the end of your current billing period; you retain access to paid features until then.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">Changes to pricing.</span> We may change pricing or plan features with at least 30 days&apos; advance notice for existing subscribers. Changes take effect at your next renewal.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">Taxes.</span> Fees are exclusive of applicable taxes, which are your responsibility.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">Failed payments.</span> If a payment fails, we may suspend access to paid features until payment is resolved.</p></div>
            </div>
          </motion.div>

          {/* 7. Service Availability */}
          <motion.div
            id="availability"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <RefreshCw className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">7. Service Availability and Modifications</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We work hard to keep the Service running, but we do not guarantee uninterrupted availability. The free tier and standard paid plans are provided without a formal uptime service level agreement. We may modify, suspend, or discontinue any part of the Service at any time, including features, integrations, and supported third-party services. We will provide reasonable notice of material changes where practical.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Scheduled maintenance, third-party outages (including Google, Supabase, and AI model providers), force majeure events, and emergency security work may cause temporary disruptions.
            </p>
          </motion.div>

          {/* 8. Termination */}
          <motion.div
            id="termination"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Power className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">8. Termination</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You may stop using the Service and delete your account at any time. We may suspend or terminate your access to the Service, with or without notice, if:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">You violate these Terms or our Acceptable Use rules.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">We are required to do so by law or by a third-party provider we depend on.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">Your account has been inactive for an extended period.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">We discontinue the Service or a feature you depend on.</p></div>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Upon termination, your right to access the Service ends. Sections that by their nature should survive (including content licenses already granted, disclaimers, limitation of liability, indemnification, and governing law) will survive termination. You may export your data prior to termination; after termination, your data will be deleted in line with the retention windows described in our Privacy Policy.
            </p>
          </motion.div>

          {/* 9. Disclaimers */}
          <motion.div
            id="disclaimers"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">9. Disclaimers</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Service is provided <span className="font-semibold text-[#0052CC]">&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</span> without warranties of any kind, whether express, implied, statutory, or otherwise. To the maximum extent permitted by law, Knowcap disclaims all warranties, including warranties of merchantability, fitness for a particular purpose, non-infringement, and any warranties arising out of course of dealing or usage of trade.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">We do not warrant that:</p>
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">The Service will be uninterrupted, error-free, or secure.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">Transcriptions, summaries, or AI-generated outputs will be accurate, complete, or suitable for any particular purpose.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">The Service will meet your requirements or expectations.</p></div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              AI-generated content can contain errors, omissions, or hallucinations. You are responsible for reviewing and verifying any outputs before relying on them for business, legal, medical, financial, or other consequential decisions.
            </p>
          </motion.div>

          {/* 10. Limitation of Liability */}
          <motion.div
            id="liability"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">10. Limitation of Liability</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To the maximum extent permitted by law, Knowcap and SMETOOLS LLC, together with our officers, directors, employees, and affiliates, will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, including loss of profits, revenue, data, goodwill, or business opportunities, arising out of or related to your use of the Service, even if we have been advised of the possibility of such damages.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our total aggregate liability for any claim arising out of or related to these Terms or the Service will not exceed the greater of (a) the amount you paid us for the Service in the 12 months immediately preceding the event giving rise to the claim, or (b) one hundred United States dollars (US$100).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Some jurisdictions do not allow the exclusion or limitation of certain damages. In those jurisdictions, our liability is limited to the maximum extent permitted by law.
            </p>
          </motion.div>

          {/* 11. Indemnification */}
          <motion.div
            id="indemnification"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">11. Indemnification</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              You agree to defend, indemnify, and hold harmless Knowcap, SMETOOLS LLC, and our officers, directors, employees, contractors, and affiliates from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or related to: (a) your User Content; (b) your use or misuse of the Service; (c) your violation of these Terms; or (d) your violation of any law or the rights of any third party, including meeting participants whose consent was required.
            </p>
          </motion.div>

          {/* 12. Governing Law */}
          <motion.div
            id="governing-law"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Gavel className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">12. Governing Law</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              These Terms are governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law principles. Any dispute, claim, or controversy arising out of or relating to these Terms or the Service will be subject to the exclusive jurisdiction of the state and federal courts located in Sacramento County, California. The United Nations Convention on Contracts for the International Sale of Goods does not apply to these Terms.
            </p>
          </motion.div>

          {/* 13. Changes to These Terms */}
          <motion.div
            id="changes"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <RefreshCw className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">13. Changes to These Terms</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms from time to time. When we make material changes, we will update the &ldquo;Last updated&rdquo; date at the top and, where appropriate, notify you by email or in-product notice. Continued use of the Service after the changes take effect constitutes acceptance of the revised Terms. If you do not agree to the changes, you must stop using the Service.
            </p>
          </motion.div>

          {/* 14. Contact — gradient highlight card */}
          <motion.div
            id="contact-us"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-8 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">Contact Us</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-[#0052CC] mb-2">SMETOOLS LLC</h3>
                <p className="text-muted-foreground">101 Dowd Ct, Folsom, CA 95630</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="mailto:hsa@smetools.io" className="text-[#005EFF] hover:text-[#0052CC] transition-colors font-medium">hsa@smetools.io</a>
                <span className="text-muted-foreground hidden sm:block">&bull;</span>
                <a href="mailto:shady@smetools.io" className="text-[#005EFF] hover:text-[#0052CC] transition-colors font-medium">shady@smetools.io</a>
              </div>
            </div>
          </motion.div>

          {/* Back to Top */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Back to Top
            </button>
          </motion.div>

        </div>
      </section>
    </div>
  )
}
