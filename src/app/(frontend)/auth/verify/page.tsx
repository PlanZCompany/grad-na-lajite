'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { verifyUser } from '@/action/auth/verify'

export default function VerifyPage() {
  const params = useSearchParams()
  const router = useRouter()
  const ran = useRef(false)
  const [status, setStatus] = useState<'idle' | 'verifying' | 'ok' | 'error' | 'missing'>('idle')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    if (ran.current) return
    ran.current = true
    const token = params.get('token')
    if (!token) {
      setStatus('missing')
      setMessage('Verification link is missing or invalid.')
      return
    }
    ;(async () => {
      try {
        setStatus('verifying')
        await verifyUser(token)
        setStatus('ok')
        setMessage('Email verified! You can now sign in.')
        setTimeout(() => router.replace('/auth/login'), 800)
      } catch (err) {
        console.error(err)
        setStatus('error')
        setMessage('Линкът е навалиден или изтекъл')
      }
    })()
  }, [params, router])

  return (
    <section className="px-6 pb-6 pt-[52px] md:pt-[140px] max-w-md">
      <h1 className="text-xl font-semibold">Потвърди Имейл</h1>
      <p className="mt-3">
        {status === 'idle' && 'Preparing…'}
        {status === 'verifying' && 'Verifying your email…'}
        {(status === 'ok' || status === 'error' || status === 'missing') && message}
      </p>
      {status === 'error' && (
        <p className="mt-3 text-sm text-gray-600">
          You can request a new verification email by registering again or contacting support.
        </p>
      )}
    </section>
  )
}
