'use client'

import React, { useState } from 'react'
import { useDocumentInfo } from '@payloadcms/ui'

export const EmailSendRequestPreview: React.FC = () => {
  const { id } = useDocumentInfo()
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState<{ sent: number; total: number } | null>(null)

  if (!id) return <div style={{ opacity: 0.7 }}>Запази записа, за да видиш preview.</div>

  const previewSrc = `/api/email-send-requests/${id}/preview`

  async function sendEmails() {
    setBusy(true)
    setProgress(null)

    try {
      const res = await fetch(`/api/email-send-requests/${id}/send-stream`, { method: 'POST' })
      if (!res.ok || !res.body) {
        alert('Грешка при изпращане.')
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      let buf = ''
      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        buf += decoder.decode(value, { stream: true })
        const lines = buf.split('\n')
        buf = lines.pop() || ''

        for (const line of lines) {
          if (!line.trim()) continue
          const msg = JSON.parse(line)

          if (msg.type === 'progress') {
            setProgress({ sent: msg.sent, total: msg.total })
          }
          if (msg.type === 'done') {
            setProgress({ sent: msg.sent, total: msg.total })
          }
          if (msg.type === 'error') {
            alert(msg.message || 'Грешка при изпращане.')
          }
        }
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
        <button
          type="button"
          onClick={sendEmails}
          disabled={busy}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.15)',
            background: busy ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.10)',
            color: 'white',
            cursor: busy ? 'not-allowed' : 'pointer',
          }}
        >
          {busy ? 'Sending…' : 'Send emails'}
        </button>

        <span style={{ fontSize: 12, opacity: 0.75 }}>
          Preview се обновява след Save (без да изпраща).
        </span>
      </div>

      {progress && (
        <span style={{ fontSize: 12, opacity: 0.85 }}>
          {progress.sent}/{progress.total}
          <>{progress.sent !== progress.total ? ' Progress' : ' Done'}</>
        </span>
      )}

      <iframe
        title="Email Preview"
        src={previewSrc}
        style={{
          width: '100%',
          height: 720,
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 8,
          background: '#0E0B12',
        }}
      />
    </div>
  )
}
