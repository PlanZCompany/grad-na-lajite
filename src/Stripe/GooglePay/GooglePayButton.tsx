'use client'

import { useEffect, useState } from 'react'
import { PaymentRequestButtonElement, useStripe } from '@stripe/react-stripe-js'
import { type PaymentRequest } from '@stripe/stripe-js'
import {
  CheckoutInitialState,
  ExtendedProduct,
  setCheckoutFormData,
} from '@/store/features/checkout'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { roundMoney } from '@/utils/roundMoney'
import { useCheckout } from '@/hooks/useCheckout'

type GooglePayButtonProps = {
  products: ExtendedProduct[]
  clientSecret: string
}

//TODO add shipping to google and apple pay

function calculateTotalAmount(
  items: ExtendedProduct[],
  discount: CheckoutInitialState['checkoutFormData']['discountCode'] | null,
  shippingPrice: number = 0,
): number {
  let total = 0

  for (const item of items) {
    if (item.orderQuantity <= 0) continue

    const unitPrice = item.price || 0

    total += unitPrice * item.orderQuantity
  }

  if (total <= 0) {
    return 0
  }

  let discountAmount = 0
  if (!!discount) {
    discountAmount = discount?.discountCodeId
      ? discount.discountType === 'percent'
        ? roundMoney((total * discount.discountValue) / 100)
        : discount.discountValue
      : 0
  }

  if (discountAmount > 0) {
    total = total - discountAmount
  }
  if (shippingPrice > 0) {
    total += shippingPrice
  }

  total = Math.round(total * 100)

  return total
}

export function GooglePayButton({ products, clientSecret }: GooglePayButtonProps) {
  const dispatch = useAppDispatch()
  const stripe = useStripe()
  const discountCode = useAppSelector((state) => state.checkout.checkoutFormData.discountCode)
  const formData = useAppSelector((state) => state.checkout.checkoutFormData)
  const couriers = useAppSelector((state) => state.checkout.shippingOptions)
  const courier = useAppSelector((state) => state.checkout.checkoutFormData.shipping)
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null)
  const [error, setError] = useState<string | null>(null)
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

  const shippingPrice = calculateShippingPrice()

  const amount = calculateTotalAmount(products, discountCode, shippingPrice)
  useEffect(() => {
    if (!stripe) return
    let cancelled = false

    const init = async () => {
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
          const walletProvider =
            (ev as any).walletName || ev.paymentMethod?.card?.wallet?.type || null

          console.log('walletProvider', walletProvider)

          const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: ev.paymentMethod.id,
            },
            { handleActions: false },
          )
          let pi = paymentIntent

          if (confirmError) {
            setError(confirmError.message ?? 'Грешка при плащане.')
            ev.complete('fail')
            return
          }

          if (paymentIntent && paymentIntent.status === 'requires_action') {
            const { error: actionError, paymentIntent: pi2 } =
              await stripe.confirmCardPayment(clientSecret)

            if (actionError) {
              setError(actionError.message ?? 'Грешка при 3D сигурност.')
              ev.complete('fail')
              return
            }

            pi = pi2
          }

          if (pi?.status === 'succeeded') {
            console.log('Paid with:', walletProvider)

            if (walletProvider === 'google_pay' || walletProvider === 'apple_pay') {
              if (walletProvider === 'google_pay') {
                dispatch(setCheckoutFormData({ payment: 'google_pay' }))
              } else if (walletProvider === 'apple_pay') {
                dispatch(setCheckoutFormData({ payment: 'apple_pay' }))
              } else {
                dispatch(setCheckoutFormData({ payment: 'card' }))
              }
            }

            ev.complete('success')
            return
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
        if ((result && (result as any)?.googlePay) || (result as any)?.applePay) {
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
