// app/checkout/payment/PaymentSection.tsx
'use client'

import { CheckoutInitialState, ExtendedProduct } from '@/store/features/checkout'

import { useEffect, useState, useTransition } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js'

import { PaymentForm } from './PaymentForm'
import { createPaymentIntentAction } from '../action'
import { useAppSelector } from '@/hooks/redux-hooks'
import { GooglePayButton } from '../GooglePay/GooglePayButton'
import { useCheckout } from '@/hooks/useCheckout'
import { GenericParagraph } from '@/components/Generic'
import { logCheckoutFailure } from '@/action/orders'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
type PaymentSectionProps = {
  items: ExtendedProduct[]
  createPaymentIntentAction: (
    items: ExtendedProduct[],
    discount: CheckoutInitialState['checkoutFormData']['discountCode'] | null,
  ) => Promise<{ clientSecret: string | null }>
}

export default function PaymentSection({ items }: PaymentSectionProps) {
  // const userWantSubscription = useAppSelector((state) => state.checkout.userWantSubscription)
  const formData = useAppSelector((state) => state.checkout.checkoutFormData)
  const couriers = useAppSelector((state) => state.checkout.shippingOptions)
  const courier = useAppSelector((state) => state.checkout.checkoutFormData.shipping)
  const userId = useAppSelector((state) => state.root.user?.id)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const { calculateTotalPriceWithoutDiscount } = useCheckout()

  const calculateShippingPrice = () => {
    let method = 'locker'
    if (formData.shipping !== 'boxnow') method = 'office'
    if (formData.shipping !== 'boxnow' && formData.address) method = 'address'

    const match = couriers.find((item) => {
      return item.courier_code === courier && item.method === method
    })
    let shippingPrice = match?.base_fee || 0

    if (match?.free_shipping) {
      return (shippingPrice = 0)
    }
    const isEnoughForFreeShipping =
      !!match?.free_over_amount && calculateTotalPriceWithoutDiscount() >= match?.free_over_amount
    if (isEnoughForFreeShipping) {
      return (shippingPrice = 0)
    }
    return shippingPrice
  }

  useEffect(() => {
    startTransition(async () => {
      try {
        const shippingPrice = calculateShippingPrice()

        const result = await createPaymentIntentAction(
          items,
          formData.discountCode || null,
          shippingPrice,
        )

        if (result.error || !result.clientSecret) {
          await logCheckoutFailure({
            stage: 'stripe_payment_intent_create_failed',
            paymentMethod: 'card_pending',
            errorMessage: result.error ?? 'Missing Stripe client secret',
            userId: userId ?? null,
            email: formData.email,
            shippingProvider: formData.shipping,
            shippingMethod: formData.innerShipping,
            shippingFinalAmount: shippingPrice,
            discountCodeId: formData.discountCode?.discountCodeId ?? null,
            itemCount: items.length,
            productIds: items.map((item) => item.id),
          })
          setError(result.error ?? 'Грешка при създаване на плащането. Моля, опитайте отново по-късно.')
          return
        }

        setClientSecret(result.clientSecret)
      } catch (err) {
        await logCheckoutFailure({
          stage: 'stripe_payment_intent_create_exception',
          paymentMethod: 'card_pending',
          errorMessage: err instanceof Error ? err.message : 'Unknown Stripe intent create error',
          userId: userId ?? null,
          email: formData.email,
          shippingProvider: formData.shipping,
          shippingMethod: formData.innerShipping,
          discountCodeId: formData.discountCode?.discountCodeId ?? null,
          itemCount: items.length,
          productIds: items.map((item) => item.id),
        })
        setError(err instanceof Error ? err.message : 'Грешка при създаване на плащането.')
      }
    })
  }, [items, formData.innerShipping])

  if (error) {
    return <GenericParagraph textColor="text-white">Грешка: {error}</GenericParagraph>
  }

  if (!clientSecret || isPending) {
    return <GenericParagraph textColor="text-white">Зареждане на плащането...</GenericParagraph>
  }

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'flat',
      inputs: 'spaced',
      labels: 'above',
      variables: { colorPrimary: '#200226' },
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <div>
        <GooglePayButton products={items} clientSecret={clientSecret} />

        <PaymentForm />
      </div>
    </Elements>
  )
}
