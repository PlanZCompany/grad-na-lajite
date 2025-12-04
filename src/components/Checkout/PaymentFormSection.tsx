'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'

import React, { useState, useTransition } from 'react'
import { GenericButton, GenericHeading, RadioSelect } from '../Generic'
import { PaymentSection } from '@/Stripe/components'
import { createPaymentIntentAction } from '@/Stripe/action'
import { setCheckoutFormData, setCompletedStage } from '@/store/features/checkout'
import { subscribeAction } from '@/action/subscribe'

const PaymentFormSection = () => {
  const dispatch = useAppDispatch()
  const userWantSubscription = useAppSelector((state) => state.checkout.userWantSubscription)
  const formData = useAppSelector((state) => state.checkout.checkoutFormData)
  const passedStep = useAppSelector((state) => state.checkout.stageCompleted)
  const products = useAppSelector((state) => state.checkout.products)
  const [pending, start] = useTransition()

  const checkoutValuesInitialState: {
    paymentMethod: 'cash' | 'card'
  } = {
    paymentMethod: 'cash',
  }

  const [formValues, setFormValues] = useState(checkoutValuesInitialState)

  const cashSubmit = () => {
    start(async () => {
      try {
        dispatch(setCompletedStage(3))
        dispatch(setCheckoutFormData({ payment: 'cash' }))

        //TODO make order
        if (userWantSubscription) {
          const subscription = await subscribeAction(formData.email)

          //TODO IF OK === true add discount
          console.log(subscription.ok, subscription.message)
        }

        const nextTarget = document.querySelector('.REF_CHECKOUT_CONFIRM') as HTMLElement

        if (nextTarget) {
          nextTarget.scrollIntoView({ behavior: 'smooth' })
        }

        localStorage.removeItem('cartProductsGradNaLajite')
      } catch (err) {
        console.log(err)
      }
    })
  }

  const isPassed = passedStep > 1

  return (
    <div
      className="REF_CHECKOUT_PAYMENT scroll-mt-20 md:scroll-mt-[150px] p-3 md:p-6 rounded-[12px] border-[1px] border-white/20 flex flex-col 
    gap-m justify-center items-center form_container bg-purpleDark/50 relative"
    >
      {!isPassed && <div className={`absolute inset-0 z-[5] backdrop-blur-sm`}></div>}
      <GenericHeading
        align="text-center"
        headingType="h4"
        textColor="text-primaryYellow"
        extraClass="border-b-[1px] border-primaryYellow"
      >
        <h2>Данни за плащане</h2>
      </GenericHeading>

      <div className="w-full">
        <RadioSelect
          options={[
            { label: 'Наложен платеж', value: 'cash' },
            { label: 'Кредит/Дебит карта | Google Pay | Apple Pay', value: 'card' },
          ]}
          label="Метод на плащане"
          formValues={formValues}
          setFormValues={setFormValues}
          name="paymentMethod"
          required={true}
        />
      </div>

      {formValues.paymentMethod === 'card' && (
        <div className="w-full">
          <PaymentSection items={products} createPaymentIntentAction={createPaymentIntentAction} />
        </div>
      )}

      {formValues.paymentMethod === 'cash' && (
        <div className="my-4 flex w-full">
          <GenericButton
            type={'button'}
            styleClass="w-full md:!px-4 md:!py-[10px]"
            variant="primary"
            click={() => {
              cashSubmit()
            }}
          >
            {pending ? <span className="animate-pulse">Зареждане</span> : 'Продължи'}
          </GenericButton>
        </div>
      )}
    </div>
  )
}

export default PaymentFormSection
