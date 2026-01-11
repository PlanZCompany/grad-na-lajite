'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'

import React, { useState, useTransition } from 'react'
import { GenericButton, GenericHeading, RadioSelect } from '../Generic'
import { PaymentSection } from '@/Stripe/components'
import { createPaymentIntentAction } from '@/Stripe/action'
import { setCheckoutFormData, setCompletedStage } from '@/store/features/checkout'
import { CreateOrderInput, makeOrder } from '@/action/orders'
import { ROOT } from '@/constant'
import ErrorMessageBox from '../Generic/ErrorMessage'
import { useCheckout } from '@/hooks/useCheckout'
import { roundMoney } from '@/utils/roundMoney'

const PaymentFormSection = () => {
  const dispatch = useAppDispatch()
  // const userWantSubscription = useAppSelector((state) => state.checkout.userWantSubscription)
  const { calculateTotalPrice } = useCheckout()

  const formData = useAppSelector((state) => state.checkout.checkoutFormData)
  const couriers = useAppSelector((state) => state.checkout.shippingOptions)
  const innerActiveShipping = useAppSelector(
    (state) => state.checkout.checkoutFormData.innerShipping,
  )
  const userId = useAppSelector((state) => state.root.user?.id)
  const passedStep = useAppSelector((state) => state.checkout.stageCompleted)
  const products = useAppSelector((state) => state.checkout.products)
  const discount = useAppSelector((state) => state.checkout.checkoutFormData.discountCode)
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()

  const checkoutValuesInitialState: {
    paymentMethod: 'cash' | 'card'
  } = {
    paymentMethod: 'cash',
  }

  const [formValues, setFormValues] = useState(checkoutValuesInitialState)

  const calculateShippingPrice = (shippingName: 'econt' | 'speedy' | 'boxnow') => {
    if (!shippingName) return 0

    let method = 'locker'
    if (formData.shipping !== 'boxnow' && innerActiveShipping?.includes('office')) method = 'office'
    if (formData.shipping !== 'boxnow' && innerActiveShipping?.includes('address'))
      method = 'address'

    const match = couriers.find((item) => {
      return item.courier_code === shippingName && item.method === method
    })
    let shippingPrice = match?.base_fee || 0

    if (match?.free_shipping) {
      return (shippingPrice = 0)
    }
    const isEnoughForFreeShipping =
      !!match?.free_over_amount && calculateTotalPrice() >= match?.free_over_amount
    if (isEnoughForFreeShipping) {
      return (shippingPrice = 0)
    }
    return shippingPrice
  }

  const cashSubmit = () => {
    start(async () => {
      try {
        console.log('START SUBMIT')

        const totalWithoutShipping = calculateTotalPrice()
        const shippingPrice = calculateShippingPrice(
          formData.shipping as 'econt' | 'speedy' | 'boxnow',
        )
        const total = roundMoney(totalWithoutShipping + shippingPrice)

        // calculate discount amount
        const sumWithoutDiscount = products.reduce(
          (acc, { price, orderQuantity }) => acc + price * orderQuantity,
          0,
        )

        //construct order data
        const orderData: CreateOrderInput = {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phoneNumber,
          termsAccepted: true,
          termsIpAddress: 'test-ip-address', //TODO ORDER after release
          shippingAddressLine1: !!formData.address ? formData.address : 'Няма адрес',
          shippingAddressLine2: '',
          shippingCity: formData.city as string,
          shippingPostcode: 'Test-postcode', //TODO ORDER?
          shippingCountry: 'Bulgaria',
          shippingMethod: formData.innerShipping as string,
          shippingProvider: formData.shipping as 'econt' | 'speedy' | 'boxnow',
          currency: 'EUR',
          subtotalAmount: roundMoney(totalWithoutShipping),
          shippingFinalAmount: shippingPrice,
          totalAmount: total,
          paymentMethod: 'cash_on_delivery',
          paymentStatus: 'pending',
          status: 'pending',
          items: products.map(({ id, orderQuantity, price }) => ({
            productId: id,
            quantity: orderQuantity,
            price,
          })),
          userId: userId ?? null,
          discountCodeId: discount?.discountCodeId ? +discount.discountCodeId : null, //TODO ORDER add discount
          discountAmount: discount?.discountCodeId
            ? discount.discountType === 'percent'
              ? roundMoney((sumWithoutDiscount * discount.discountValue) / 100)
              : discount.discountValue
            : null, //TODO ORDER add discount amount
        }
        //TODO if user it is accepted to subscribe update user document

        const orderStatus = await makeOrder(orderData)

        if (orderStatus.status === 'error') {
          setError(ROOT.global_error_message)
          return
        }

        dispatch(setCompletedStage(3))
        dispatch(setCheckoutFormData({ payment: 'cash', orderNumber: orderStatus.orderNumber }))

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
            {
              label: 'Плащане при доставка - казваш "здрасти" на куриера и му даваш сумата.',
              value: 'cash',
            },
            {
              label:
                'Плащане с карта, Google Pay или Apple Pay - модерно, чисто, без излишни въпроси.',
              value: 'card',
            },
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

      {error && <ErrorMessageBox error={error} />}
    </div>
  )
}

export default PaymentFormSection
