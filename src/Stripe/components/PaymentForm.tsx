'use client'

import { useState, useTransition } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { GenericButton } from '@/components/Generic'
import { setCheckoutFormData, setCompletedStage } from '@/store/features/checkout'
import { roundMoney } from '@/utils/roundMoney'
import { CreateOrderInput, makeOrder } from '@/action/orders'
// import { ROOT } from '@/cssVariables'
import { useCheckout } from '@/hooks/useCheckout'
import { subscribeAction } from '@/action/subscribe'
import { addSubscribeValueToCookie } from '@/utils/subscribeToCookie'

export function PaymentForm() {
  const dispatch = useAppDispatch()
  const stripe = useStripe()
  const elements = useElements()
  const [pending, startTransition] = useTransition()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { calculateTotalPrice, calculateTotalPriceWithoutDiscount } = useCheckout()
  const formData = useAppSelector((state) => state.checkout.checkoutFormData)
  const couriers = useAppSelector((state) => state.checkout.shippingOptions)
  const innerActiveShipping = useAppSelector(
    (state) => state.checkout.checkoutFormData.innerShipping,
  )
  const userId = useAppSelector((state) => state.root.user?.id)
  const products = useAppSelector((state) => state.checkout.products)
  const discount = useAppSelector((state) => state.checkout.checkoutFormData.discountCode)
  const userWantSubscription = useAppSelector((state) => state.checkout.userWantSubscription)

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
      !!match?.free_over_amount && calculateTotalPriceWithoutDiscount() >= match?.free_over_amount
    if (isEnoughForFreeShipping) {
      return (shippingPrice = 0)
    }
    return shippingPrice
  }

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
            shippingAddressLine1: !!formData.address ? formData.address : '',
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
            paymentMethod: 'card',
            paymentStatus: 'paid',
            status: 'pending',
            items: products.map(({ id, orderQuantity, price }) => ({
              productId: id,
              quantity: orderQuantity,
              price,
            })),
            userId: userId ?? null,
            discountCodeId: discount?.discountCodeId ? +discount.discountCodeId : null,
            discountAmount: discount?.discountCodeId
              ? discount.discountType === 'percent'
                ? roundMoney((sumWithoutDiscount * discount.discountValue) / 100)
                : discount.discountValue
              : null,
          }

          const orderStatus = await makeOrder(orderData)

          if (orderStatus.status === 'error') {
            // setError(ROOT.global_error_message)
            console.log('error', orderStatus)
            return
          }

          dispatch(setCompletedStage(3))

          if (formData.payment === 'apple_pay' || formData.payment === 'google_pay') {
            dispatch(setCheckoutFormData({ orderNumber: orderStatus.orderNumber }))
          } else {
            dispatch(setCheckoutFormData({ payment: 'card', orderNumber: orderStatus.orderNumber }))
          }

          if (!!userWantSubscription) {
            subscribeAction(formData.email, 'checkout')
            if (!userId) {
              addSubscribeValueToCookie('add')
            }
          }

          const nextTarget = document.querySelector('.REF_CHECKOUT_CONFIRM') as HTMLElement

          if (nextTarget) {
            nextTarget.scrollIntoView({ behavior: 'smooth' })
          }

          localStorage.removeItem('cartProductsGradNaLajite')
        } catch (err) {
          console.log(err)
        }
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
