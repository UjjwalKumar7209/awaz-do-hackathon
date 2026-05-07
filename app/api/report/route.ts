import { NextRequest, NextResponse } from 'next/server'
import { SYSTEM_PROMPT, PROMPT_TEMPLATE } from '@/prompt'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const issueDescription = formData.get('issueDescription') as string
    const location = formData.get('location') as string
    const landmark = formData.get('landmark') as string
    const extraContext = formData.get('extraContext') as string
    const images = formData.getAll('images') as File[]

    // Validate required fields
    if (!issueDescription || !location) {
      return NextResponse.json(
        { error: 'Issue description and location are required' },
        { status: 400 }
      )
    }

    // Build the user query using the template
    let userQuery = PROMPT_TEMPLATE.replace(
      '{{USER_QUERY}}',
      issueDescription
    ).replace('{{LOCATION}}', location)

    const optionalContext = [
      landmark ? `Landmark/Address: ${landmark}` : '',
      extraContext ? `Additional Context: ${extraContext}` : '',
      images.length > 0 ? `Images attached: ${images.length} file(s)` : ''
    ]
      .filter(Boolean)
      .join('\n')

    userQuery = userQuery.replace(
      '{{EXTRA_CONTEXT}}',
      optionalContext || 'None'
    )

    // Call OpenRouter API
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not configured')
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' },
        { status: 500 }
      )
    }

    const aiResponse = await callOpenRouter(SYSTEM_PROMPT, userQuery, apiKey)

    // Parse the AI response
    const parsedResponse = parseReportResponse(aiResponse)

    return NextResponse.json(parsedResponse)
  } catch (error) {
    console.error('Report processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process report. Please try again.' },
      { status: 500 }
    )
  }
}

// Call OpenRouter API
async function callOpenRouter(
  systemPrompt: string,
  userMessage: string,
  apiKey: string
): Promise<string> {
  const response = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://awaz-do.vercel.app',
        'X-Title': 'Awaz Do - Civic Grievance Assistant'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    }
  )

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      `OpenRouter API error: ${response.status} - ${JSON.stringify(errorData)}`
    )
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content

  if (!content) {
    throw new Error('Invalid response from OpenRouter API')
  }

  return content
}

// Helper function to parse the response from AI
function parseReportResponse(aiResponse: string): {
  issueSummary: string
  authority: string
  emailSubject: string
  email: string
  nextSteps: string[]
} {
  // Extract sections from the AI response using regex
  const extractSection = (tagName: string): string => {
    const regex = new RegExp(`<${tagName}>([\\s\\S]*?)<\/${tagName}>`, 'i')
    const match = aiResponse.match(regex)
    return match ? match[1].trim() : ''
  }

  const extractListSection = (tagName: string): string[] => {
    const regex = new RegExp(`<${tagName}>([\\s\\S]*?)<\/${tagName}>`, 'i')
    const match = aiResponse.match(regex)
    if (!match) return []

    const content = match[1]
    // Extract all <question> or <item> tags, or lines starting with numbers
    const items =
      content.match(/<question>.*?<\/question>/gi) ||
      content.match(/<item>.*?<\/item>/gi) ||
      content.match(/\d+\.\s*(.+)/g) ||
      []

    return items
      .map((item) => {
        // Remove XML tags and numbering
        return item
          .replace(/<[^>]*>/g, '')
          .replace(/^\d+\.\s*/, '')
          .trim()
      })
      .filter(Boolean)
  }

  const issueSummary = extractSection('ISSUE_SUMMARY')
  const authority = extractSection('AUTHORITY')
  const emailSubject = extractSection('EMAIL_SUBJECT')
  const email = extractSection('EMAIL')

  // Extract next steps
  let nextSteps = extractListSection('NEXT_STEPS')

  // Fallback if extraction didn't work as expected
  if (nextSteps.length === 0) {
    nextSteps = [
      'Send the complaint to the identified department',
      'Attach supporting images if available',
      'Follow up within 3-5 working days if unresolved'
    ]
  }

  return {
    issueSummary: issueSummary || 'Issue received for processing',
    authority: authority || 'Civic Authority Department',
    emailSubject: emailSubject || 'Civic Complaint Report',
    email: email || 'Professional complaint email will be generated',
    nextSteps: nextSteps.slice(0, 5)
  }
}
