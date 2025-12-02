'use client'

import { useEffect, useState } from 'react'
import { PaymentRequestButtonElement } from '@stripe/react-stripe-js'
import { loadStripe, type PaymentRequest } from '@stripe/stripe-js'
import { ExtendedProduct } from '@/store/features/checkout'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

type GooglePayButtonProps = {
  products: ExtendedProduct[]
  clientSecret: string
  discount: number
}

function calculateTotalAmount(items: ExtendedProduct[], discount: number = 0): number {
  let total = 0

  for (const item of items) {
    if (item.orderQuantity <= 0) continue

    const unitPrice = item.price || 0

    total += unitPrice * item.orderQuantity
  }

  if (total <= 0) {
    return 0
  }

  if (discount > 0) {
    total *= discount
  }

  total = Math.round(total * 100)

  return total
}

export function GooglePayButton({ products, clientSecret, discount }: GooglePayButtonProps) {
  const amount = calculateTotalAmount(products, discount)
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      const stripe = await stripePromise
      if (!stripe) {
        setError('Stripe не е инициализиран.')
        return
      }

      const pr = stripe.paymentRequest({
        country: 'BG',
        currency: 'eur',
        total: {
          label: 'Order total',
          amount,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      })

      pr.on('paymentmethod', async (ev) => {
        try {
          const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: ev.paymentMethod.id,
            },
            { handleActions: false },
          )

          if (confirmError) {
            setError(confirmError.message ?? 'Грешка при плащане.')
            ev.complete('fail')
            return
          }

          if (paymentIntent && paymentIntent.status === 'requires_action') {
            const { error: actionError } = await stripe.confirmCardPayment(clientSecret)

            if (actionError) {
              setError(actionError.message ?? 'Грешка при 3D сигурност.')
              ev.complete('fail')
              return
            }
          }

          ev.complete('success')
        } catch (err) {
          console.error(err)
          setError('Неочаквана грешка при плащане.')
          ev.complete('fail')
        }
      })

      const result = await pr.canMakePayment()

      if (!cancelled) {
        if (result && (result as any).googlePay) {
          setPaymentRequest(pr)
        } else {
          // няма Google Pay → просто не показваме бутона
        }
      }
    }

    init()

    return () => {
      cancelled = true
    }
  }, [amount, clientSecret])

  if (error) {
    return <p style={{ color: 'red' }}>Грешка: {error}</p>
  }

  if (!paymentRequest) {
    return null
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <PaymentRequestButtonElement
        options={{
          paymentRequest,
          style: {
            paymentRequestButton: {
              type: 'default',
              theme: 'dark',
              height: '48px',
            },
          },
        }}
      />
    </div>
  )
}
