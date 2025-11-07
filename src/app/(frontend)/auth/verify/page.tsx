'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { verifyUser } from '@/action/auth/verify'
import { AuthWrapper } from '@/components/Wrappers'

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
    <AuthWrapper>
      <section className="p-6">
        <h1 className="text-xl font-semibold text-white">Потвърди Имейл</h1>
        <p className="mt-3 text-white">
          {status === 'idle' && 'Preparing…'}
          {status === 'verifying' && 'Verifying your email…'}
          {(status === 'ok' || status === 'error' || status === 'missing') && message}
        </p>
        {status === 'error' && (
          <p className="mt-3 text-base text-white">
            Можете да поискате нов имейл за потвърждение, като се регистрирате отново или се
            свържете с поддръжката.
          </p>
        )}
      </section>
    </AuthWrapper>
  )
}
