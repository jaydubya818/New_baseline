import 'server-only'

// ============================================================
// EMAIL UTILITY (Resend)
// Configure RESEND_API_KEY and EMAIL_FROM in .env.local.
// If Resend is not configured, emails are logged to console.
// ============================================================

export interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
}

interface EmailResult {
  success: boolean
  id?: string
  error?: string
}

const FROM = process.env['EMAIL_FROM'] ?? 'noreply@example.com'

export async function sendEmail(options: SendEmailOptions): Promise<EmailResult> {
  const apiKey = process.env['RESEND_API_KEY']

  if (!apiKey) {
    // Dev mode: log email to console instead of sending
    // eslint-disable-next-line no-console
    console.log('[email] RESEND_API_KEY not set — logging email:')
    // eslint-disable-next-line no-console
    console.log(`  To: ${Array.isArray(options.to) ? options.to.join(', ') : options.to}`)
    // eslint-disable-next-line no-console
    console.log(`  Subject: ${options.subject}`)
    // eslint-disable-next-line no-console
    console.log(`  Body: ${options.text ?? options.html.slice(0, 200)}...`)
    return { success: true, id: 'dev-mode' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: options.to,
        subject: options.subject,
        html: options.html,
        ...(options.text ? { text: options.text } : {}),
        ...(options.replyTo ? { reply_to: options.replyTo } : {}),
      }),
    })

    if (!response.ok) {
      const body = await response.text()
      return { success: false, error: `Resend API error: ${response.status} ${body}` }
    }

    const data = (await response.json()) as { id: string }
    return { success: true, id: data.id }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown email error' }
  }
}
