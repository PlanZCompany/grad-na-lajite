'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'

import React from 'react'
import { GenericButton, GenericHeading, GenericImage, GenericParagraph } from '../Generic'
import { useCheckout } from '@/hooks/useCheckout'
import { Media } from '@/payload-types'
import Link from 'next/link'
import { resetToInitialState } from '@/store/features/checkout'
import CurrentDateAndTime from '../Custom/CurrentDateAndTime'

const CheckoutConfirm = () => {
  const dispatch = useAppDispatch()
  const couriers = useAppSelector((state) => state.checkout.shippingOptions)
  const courier = useAppSelector((state) => state.checkout.checkoutFormData.shipping)
  const formData = useAppSelector((state) => state.checkout.checkoutFormData)
  const { products, checkoutFormData, stageCompleted } = useAppSelector((state) => state.checkout)
  const { calculateTotalPrice } = useCheckout()
  const isPassed = stageCompleted === 3

  const calculateShippingPrice = (shippingName: 'econt' | 'speedy' | 'boxnow') => {
    if (!shippingName) return 0
    let method = 'locker'
    if (formData.shipping !== 'boxnow') method = 'office'
    if (formData.shipping !== 'boxnow' && formData.address) method = 'address'
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

  const shippingText =
    calculateShippingPrice(courier as 'econt' | 'speedy' | 'boxnow') === 0
      ? 'безплатна доставка'
      : `+ ${calculateShippingPrice(courier as 'econt' | 'speedy' | 'boxnow')}€`

  const calculateTotalPriceWithShipping = () => {
    let total = calculateTotalPrice()
    if (shippingText !== 'безплатна доставка') {
      total += calculateShippingPrice(courier as 'econt' | 'speedy' | 'boxnow')
    }
    return total
  }

  const productsContent = products.map((product) => {
    const media = product?.mediaArray?.[0].file as Media

    return (
      <li key={product.id} className="w-full p-3">
        <article
          className="w-full flex flex-col bg-purpleBackground items-center relative
          border-[1px] border-primaryYellow rounded-[16px]"
        >
          <div className="w-full max-w-[150px] md:max-w-[200px] p-2 rounded-[12px] overflow-hidden">
            <GenericImage
              src={media.url as string}
              alt={media.alt}
              fill={true}
              wrapperClassName="w-full max-w-[150px] mx-auto md:max-w-[unset] aspect-square relative rounded-[12px] overflow-hidden"
              imageClassName="w-full h-full object-contain"
            />
          </div>
          <div className="w-full flex flex-col">
            <GenericParagraph
              fontStyle="font-georgia font-[400]"
              pType="large"
              textColor="text-white"
              extraClass="text-center mx-auto md:mx-[unset] w-full px-2"
            >
              <h3>
                {product.title} * {product.orderQuantity}
              </h3>
            </GenericParagraph>

            <div className="flex justify-center items-center px-2 pb-4">
              <div className="flex flex-col">
                <GenericParagraph
                  fontStyle="custom"
                  pType="regular"
                  textColor="text-primaryYellow"
                  extraClass="font-georgia font-[700] w-full text-center"
                >
                  <span className="text-white/90">Цена за артикули: </span>
                  {(product.price! * product.orderQuantity).toFixed(2)}€
                </GenericParagraph>

                {!!courier && (
                  <GenericParagraph
                    fontStyle="custom"
                    pType="regular"
                    textColor="text-primaryYellow"
                    extraClass="font-georgia font-[700] text-center"
                  >
                    <>
                      <span className="text-white/90">Цена за доставка: </span>
                      {shippingText}
                    </>
                  </GenericParagraph>
                )}

                {!!formData.discountCode?.discountCodeId && (
                  <GenericParagraph
                    fontStyle="custom"
                    pType="regular"
                    textColor="text-primaryYellow"
                    extraClass="font-georgia font-[700] text-center"
                  >
                    <>
                      <span className="text-white/90">Отстъпка от код: </span>
                      {formData.discountCode?.discountValue}
                      {formData.discountCode?.discountType === 'percent' ? '%' : '€'}
                    </>
                  </GenericParagraph>
                )}

                {!!courier && (
                  <GenericParagraph
                    fontStyle="custom"
                    pType="large"
                    textColor="text-primaryYellow"
                    extraClass="font-georgia font-[700] text-center"
                  >
                    <>
                      <span className="text-white/90">Цена за плащане: </span>
                      {calculateTotalPriceWithShipping().toFixed(2)}€
                    </>
                  </GenericParagraph>
                )}
              </div>
            </div>
          </div>
        </article>
      </li>
    )
  })

  return (
    <div
      className="p-3 md:p-6 rounded-[12px] border-[1px] border-white/20 flex flex-col
    gap-m justify-center items-center form_container bg-purpleDark/50 relative"
    >
      {!isPassed && <div className={`absolute inset-0 z-[5] backdrop-blur-sm`}></div>}

      <div className="w-full flex items-center justify-center gap-m ">
        <div className="flex justify-center items-center">
          <GenericHeading
            align="text-center"
            headingType="h4"
            textColor="text-primaryYellow"
            extraClass="border-b-[1px] border-primaryYellow"
          >
            <h2>
              Благодарим за поръчката! <br /> Градът я регистрира. Сделката е сключена - чакай
              кутията
            </h2>
          </GenericHeading>
        </div>

        <div className="hidden justify-center items-center md:flex">
          <Link href="/">
            <GenericButton
              click={() => {
                document.body.style.overflow = ''
                dispatch(resetToInitialState())
              }}
            >
              <span>Начало</span>
            </GenericButton>
          </Link>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center">
        <div className="w-full flex flex-col gap-m">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-m">
            <div className="w-full flex flex-col justify-center items-center">
              <GenericParagraph>
                <strong>Поръчка номер:</strong>
              </GenericParagraph>
              <GenericParagraph textColor="text-primaryYellow">
                {formData?.orderNumber || '0'}
              </GenericParagraph>
            </div>

            <div className="w-full flex flex-col justify-center items-center">
              <GenericParagraph>
                <strong>Поръчана на:</strong>
              </GenericParagraph>
              <CurrentDateAndTime />
            </div>
          </div>

          <div className="divider_section relative z-[2]"></div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-m">
            <div className="w-full flex flex-col justify-center items-center">
              <GenericParagraph>
                <strong>Статус на изпълнение:</strong>
              </GenericParagraph>
              <GenericParagraph textColor="text-primaryYellow">Обработва се</GenericParagraph>
            </div>

            <div className="w-full flex flex-col justify-center items-center">
              <GenericParagraph>
                <strong>Статус:</strong>
              </GenericParagraph>
              <GenericParagraph textColor="text-primaryYellow">
                {checkoutFormData.payment === 'cash_on_delivery' ? 'Неплатена' : 'Платена'}
              </GenericParagraph>
            </div>
          </div>

          <div className="divider_section relative z-[2]"></div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-m">
            <div className="w-full flex flex-col justify-center items-center">
              <GenericParagraph>
                <strong>Начин на плащане:</strong>
              </GenericParagraph>
              <GenericParagraph textColor="text-primaryYellow">
                {checkoutFormData.payment === 'cash_on_delivery'
                  ? 'Наложен платеж'
                  : 'Дебитна/Кредитна карта'}
              </GenericParagraph>
            </div>

            <div className="w-full flex flex-col justify-center items-center">
              <GenericParagraph>
                <strong>Обща сума:</strong>
              </GenericParagraph>
              <GenericParagraph textColor="text-primaryYellow">
                {calculateTotalPriceWithShipping().toFixed(2)}€
              </GenericParagraph>
            </div>
          </div>

          <div className="divider_section relative z-[2]"></div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-m">
            <div className="w-full flex flex-col justify-center items-center">
              <GenericParagraph>
                <strong>Адрес на доставка:</strong>
              </GenericParagraph>

              <GenericParagraph textColor="text-primaryYellow">
                {checkoutFormData.city} {checkoutFormData.address} {checkoutFormData.office}
              </GenericParagraph>
            </div>

            {checkoutFormData.discountCode?.discountCodeId && (
              <div className="w-full flex flex-col justify-center items-center">
                <GenericParagraph>
                  <strong>Код за отстъпка:</strong>
                </GenericParagraph>

                <GenericParagraph textColor="text-primaryYellow">
                  {checkoutFormData.discountCode.code}
                </GenericParagraph>
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:max-w-[33%]">{productsContent}</div>
      </div>

      <div className="divider_section relative z-[2]"></div>

      <div className="w-full flex justify-center items-center md:hidden">
        <Link href="/">
          <GenericButton
            click={() => {
              document.body.style.overflow = ''
              dispatch(resetToInitialState())
            }}
          >
            <span>Начало</span>
          </GenericButton>
        </Link>
      </div>
    </div>
  )
}

export default CheckoutConfirm
