'use client'

import React, { useState } from 'react'
import { useDocumentInfo } from '@payloadcms/ui'

export function RecipientsSyncButton() {
  const { id, collectionSlug } = useDocumentInfo()
  const [loading, setLoading] = useState(false)

  const disabled = !id || collectionSlug !== 'email-send-requests' || loading

  const onClick = async () => {
    if (!id) return
    const ok = window.confirm('This will overwrite Recipients with all Subscriptions. Continue?')
    if (!ok) return

    setLoading(true)
    try {
      const res = await fetch(`/api/email-send-requests/${id}/sync-recipients`, {
        method: 'POST',
        credentials: 'include',
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed')

      // simplest + reliable: reload so the array shows the new values
      window.location.reload()
    } catch (e: any) {
      window.alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32 }}>
      <button type="button" onClick={onClick} disabled={disabled}>
        {loading ? 'Syncing…' : 'Load recipients from Subscriptions'}
      </button>
      <small style={{ opacity: 0.7 }}>Overwrites recipients array.</small>
    </div>
  )
}
