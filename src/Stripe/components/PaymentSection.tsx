// app/checkout/payment/PaymentSection.tsx
'use client'

import { ExtendedProduct } from '@/store/features/checkout'

import { useEffect, useState, useTransition } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js'

import { PaymentForm } from './PaymentForm'
import { createPaymentIntentAction } from '../action'
import { useAppSelector } from '@/hooks/redux-hooks'
import { subscribeAction } from '@/action/subscribe'
import { GooglePayButton } from '../GooglePay/GooglePayButton'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
type PaymentSectionProps = {
  items: ExtendedProduct[]
  createPaymentIntentAction: (
    items: ExtendedProduct[],
    discount: number,
  ) => Promise<{ clientSecret: string | null }>
}

export default function PaymentSection({ items }: PaymentSectionProps) {
  const userWantSubscription = useAppSelector((state) => state.checkout.userWantSubscription)
  const formData = useAppSelector((state) => state.checkout.checkoutFormData)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      try {
        if (userWantSubscription) {
          const subscription = await subscribeAction(formData.email)

          //TODO IF OK === true add discount to createPaymentIntent
          console.log(subscription.ok, subscription.message)
        }

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
    <Elements stripe={stripePromise} options={options}>
      <div>
        <GooglePayButton products={items} clientSecret={clientSecret} discount={0} />

        <PaymentForm />
      </div>
    </Elements>
  )
}
