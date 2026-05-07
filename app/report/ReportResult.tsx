'use client'

import React, { useState } from 'react'

interface ReportResultProps {
  result: {
    issueSummary: string
    authority: string
    emailSubject: string
    email: string
    nextSteps: string[]
  }
  onReset: () => void
}

export default function ReportResult({ result, onReset }: ReportResultProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const copyToClipboard = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(sectionName)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  return (
    <div id="report-results" className="space-y-8">
      {/* Issue Summary Card */}
      <div className="bg-gradient-to-br from-accent/20 via-muted/40 to-muted/40 border border-accent/30 rounded-lg p-8 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 className="text-2xl font-bold text-white">Issue Summary</h2>
          <span className="px-3 py-1 bg-accent/20 border border-accent/50 rounded text-xs font-bold tracking-widest text-accent">
            SUMMARY
          </span>
        </div>
        <p className="text-white/80 leading-relaxed">{result.issueSummary}</p>
      </div>

      {/* Authority Card */}
      <div className="bg-muted/40 border border-white/10 rounded-lg p-8 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 className="text-2xl font-bold text-white">
            Identified Authority
          </h2>
          <button
            onClick={() => copyToClipboard(result.authority, 'authority')}
            className="px-3 py-2 text-xs font-bold tracking-widest text-accent/70 hover:text-accent transition-colors bg-accent/10 border border-accent/20 rounded hover:border-accent/50"
          >
            {copiedSection === 'authority' ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <p className="text-lg text-white font-semibold">{result.authority}</p>
      </div>

      {/* Email Template Cards */}
      <div className="space-y-6">
        {/* Subject */}
        <div className="bg-muted/40 border border-white/10 rounded-lg p-8 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-bold tracking-widest text-white/60 uppercase mb-1">
                Email Subject
              </p>
              <h3 className="text-xl font-bold text-white">
                {result.emailSubject}
              </h3>
            </div>
            <button
              onClick={() => copyToClipboard(result.emailSubject, 'subject')}
              className="px-3 py-2 text-xs font-bold tracking-widest text-accent/70 hover:text-accent transition-colors bg-accent/10 border border-accent/20 rounded hover:border-accent/50 whitespace-nowrap"
            >
              {copiedSection === 'subject' ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Email Body */}
        <div className="bg-muted/40 border border-white/10 rounded-lg p-8 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-bold tracking-widest text-white/60 uppercase">
                Professional Email
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(result.email, 'email')}
              className="px-3 py-2 text-xs font-bold tracking-widest text-accent/70 hover:text-accent transition-colors bg-accent/10 border border-accent/20 rounded hover:border-accent/50 whitespace-nowrap"
            >
              {copiedSection === 'email' ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <div className="bg-black/30 rounded p-6 text-white/80 text-sm leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
            {result.email}
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-muted/40 border border-white/10 rounded-lg p-8 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
        <div className="space-y-3">
          {result.nextSteps.map((step, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center text-accent font-bold text-sm">
                {index + 1}
              </div>
              <p className="text-white/80 pt-1">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-2 gap-4 pt-6">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-white/10 border border-white/20 hover:border-white/40 text-white font-bold tracking-widest uppercase rounded-md transition-all duration-200 text-sm"
        >
          Report Another Issue
        </button>
        <a
          href="/"
          className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-bold tracking-widest uppercase rounded-md transition-all duration-200 text-sm text-center"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}
