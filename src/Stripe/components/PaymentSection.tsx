// app/checkout/payment/PaymentSection.tsx
'use client'

import { ExtendedProduct } from '@/store/features/checkout'

import { useEffect, useState, useTransition } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js'

import { PaymentForm } from './PaymentForm'
import { createPaymentIntentAction } from '../action'
import { GenericHeading } from '@/components/Generic'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
type PaymentSectionProps = {
  items: ExtendedProduct[]
  createPaymentIntentAction: (
    items: ExtendedProduct[],
    discount: number,
  ) => Promise<{ clientSecret: string | null }>
}

export default function PaymentSection({ items }: PaymentSectionProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      try {
        const result = await createPaymentIntentAction(items)

        if (!result.clientSecret) {
          setError('Грешка при създаване на плащането. Моля, опитайте отново по-късно.')
        }

        setClientSecret(result.clientSecret)
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : 'Грешка при създаване на плащането.')
      }
    })
  }, [items])

  if (error) {
    return <div>Грешка: {error}</div>
  }

  if (!clientSecret || isPending) {
    return <div>Зареждане на плащането...</div>
  }

  const options: StripeElementsOptions = {
    clientSecret,
  }

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <PaymentForm />
      </Elements>
    </div>
  )
}
