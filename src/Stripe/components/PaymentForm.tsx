'use client'

import { useState, useTransition } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useAppDispatch } from '@/hooks/redux-hooks'
import { GenericButton } from '@/components/Generic'
import { setCheckoutFormData, setCompletedStage } from '@/store/features/checkout'

export function PaymentForm() {
  const dispatch = useAppDispatch()
  const stripe = useStripe()
  const elements = useElements()
  const [pending, startTransition] = useTransition()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handlePayment = async () => {
    setErrorMessage(null)

    if (!stripe || !elements) {
      return
    }

    startTransition(async () => {
      const result = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      })

      if (result.error) {
        setErrorMessage(result.error.message ?? 'Плащането не беше успешно.')
        return
      } else if (result.paymentIntent?.status === 'succeeded') {
        dispatch(setCompletedStage(3))

        dispatch(setCheckoutFormData({ payment: 'card' }))

        const nextTarget = document.querySelector('.REF_CHECKOUT_CONFIRM') as HTMLElement

        //TODO ORDER: make order

        if (nextTarget) {
          nextTarget.scrollIntoView({ behavior: 'smooth' })
        }

        localStorage.removeItem('cartProductsGradNaLajite')
      }
    })
  }

  return (
    <div>
      <PaymentElement />

      <div className="my-4 flex w-full">
        <GenericButton
          type={'button'}
          styleClass="w-full md:!px-4 md:!py-[10px]"
          variant="primary"
          click={() => {
            handlePayment()
          }}
        >
          {pending ? <span className="animate-pulse">Зареждане</span> : 'Продължи'}
        </GenericButton>
      </div>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  )
}
