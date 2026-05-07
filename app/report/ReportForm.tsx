'use client'

import React, { useState } from 'react'
import ReportResult from './ReportResult'

interface FormData {
  issueDescription: string
  location: string
  landmark?: string
  extraContext?: string
  images?: FileList
}

interface ReportResponse {
  issueSummary: string
  authority: string
  emailSubject: string
  email: string
  nextSteps: string[]
}

export default function ReportForm() {
  const [formData, setFormData] = useState<FormData>({
    issueDescription: '',
    location: '',
    landmark: '',
    extraContext: ''
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ReportResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [fileNames, setFileNames] = useState<string[]>([])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setFormData((prev) => ({
        ...prev,
        images: files
      }))
      setFileNames(Array.from(files).map((f) => f.name))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Create FormData for multipart submission
      const submitData = new FormData()
      submitData.append('issueDescription', formData.issueDescription)
      submitData.append('location', formData.location)
      submitData.append('landmark', formData.landmark || '')
      submitData.append('extraContext', formData.extraContext || '')

      if (formData.images) {
        Array.from(formData.images).forEach((file) => {
          submitData.append('images', file)
        })
      }

      const response = await fetch('/api/report', {
        method: 'POST',
        body: submitData
      })

      if (!response.ok) {
        throw new Error('Failed to process report. Please try again.')
      }

      const data = await response.json()
      setResult(data)

      // Scroll to results
      setTimeout(() => {
        const resultsSection = document.getElementById('report-results')
        resultsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return <ReportResult result={result} onReset={() => setResult(null)} />
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-muted/40 border border-white/10 rounded-lg p-8 md:p-12 backdrop-blur-sm"
    >
      <div className="space-y-6">
        {/* Issue Description */}
        <div>
          <label
            htmlFor="issueDescription"
            className="block text-sm font-bold tracking-widest text-white/80 uppercase mb-3"
          >
            Issue Description <span className="text-accent">*</span>
          </label>
          <textarea
            id="issueDescription"
            name="issueDescription"
            value={formData.issueDescription}
            onChange={handleInputChange}
            placeholder="Describe the civic issue in detail (e.g., large pothole, garbage dumping, broken streetlight...)"
            required
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all resize-none h-28"
          />
        </div>

        {/* Location */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-bold tracking-widest text-white/80 uppercase mb-3"
            >
              Location <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="City/Area name"
              required
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
            />
          </div>

          {/* Landmark/Address */}
          <div>
            <label
              htmlFor="landmark"
              className="block text-sm font-bold tracking-widest text-white/80 uppercase mb-3"
            >
              Landmark / Address (Optional)
            </label>
            <input
              type="text"
              id="landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleInputChange}
              placeholder="Nearby landmark or exact address"
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
            />
          </div>
        </div>

        {/* Extra Context */}
        <div>
          <label
            htmlFor="extraContext"
            className="block text-sm font-bold tracking-widest text-white/80 uppercase mb-3"
          >
            Additional Context (Optional)
          </label>
          <textarea
            id="extraContext"
            name="extraContext"
            value={formData.extraContext}
            onChange={handleInputChange}
            placeholder="Any additional information that might be helpful (e.g., when did you first notice this, how many people are affected...)"
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all resize-none h-20"
          />
        </div>

        {/* File Upload */}
        <div>
          <label
            htmlFor="images"
            className="block text-sm font-bold tracking-widest text-white/80 uppercase mb-3"
          >
            Upload Images (Optional)
          </label>
          <div className="relative">
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleFileChange}
              accept="image/*"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="px-4 py-3 bg-black/40 border-2 border-dashed border-white/20 rounded-md text-white/60 text-center hover:border-accent/50 hover:text-accent/70 transition-all cursor-pointer">
              {fileNames.length > 0 ? (
                <div>
                  <p className="font-semibold">
                    {fileNames.length} file(s) selected
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    {fileNames.join(', ')}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-md text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold tracking-widest uppercase rounded-md transition-all duration-200 text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⊙</span>
                Processing...
              </span>
            ) : (
              'Generate Complaint'
            )}
          </button>
        </div>

        {/* Info Message */}
        <p className="text-xs text-white/50 text-center pt-2">
          Your report will be analyzed to identify the right authority and
          generate a professional complaint email.
        </p>
      </div>
    </form>
  )
}
