'use client'

import Navbar from '../components/landing/Navbar'
import CustomCursor from '../components/landing/CustomCursor'
import ReportForm from './ReportForm'

export default function ReportPage() {
  return (
    <main className="bg-background min-h-[100svh] text-foreground selection:bg-accent selection:text-white relative flex flex-col w-full overflow-hidden">
      <CustomCursor />
      <Navbar />
      <div className="w-full px-6 py-20 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 text-balance">
              Report a Civic <span className="text-accent">Issue</span>
            </h1>
            <p className="text-lg text-white/70 text-balance max-w-2xl mx-auto">
              Help us fix your city. Describe the issue, get the right
              authority, and send a professional complaint—all in one place.
            </p>
          </div>

          {/* Form Section */}
          <ReportForm />
        </div>
      </div>
    </main>
  )
}
