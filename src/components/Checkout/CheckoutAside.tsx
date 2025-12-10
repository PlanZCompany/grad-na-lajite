'use client'

import { MinusIcon, PlusIcon } from '@/assets/icons'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { useCheckout } from '@/hooks/useCheckout'
import { Media } from '@/payload-types'
import { removeOrderQuantity, addOrderQuantity } from '@/store/features/checkout'
import React, { useState } from 'react'
import { GenericButton, GenericHeading, GenericImage, GenericParagraph } from '../Generic'
import Link from 'next/link'

const CheckoutAside = () => {
  const dispatch = useAppDispatch()
  const couriers = useAppSelector((state) => state.checkout.shippingOptions)
  const courier = useAppSelector((state) => state.checkout.checkoutFormData.shipping)
  const innerActiveShipping = useAppSelector(
    (state) => state.checkout.checkoutFormData.innerShipping,
  )
  const formData = useAppSelector((state) => state.checkout.checkoutFormData)
  const { calculateTotalPrice, calculateRemainSum } = useCheckout()
  const products = useAppSelector((state) => state.checkout.products)

  const [formValues, setFormValues] = useState({ code: '' })

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
          className="w-full flex flex-col md:flex-row bg-purpleBackground items-center relative 
        border-[1px] border-primaryYellow rounded-[16px]"
        >
          <div className="w-full md:w-[50%] md:min-w-[50%] p-2 rounded-[12px] overflow-hidden">
            <GenericImage
              src={media.url as string}
              alt={media.alt}
              fill={true}
              wrapperClassName="w-full max-w-[150px] mx-auto md:max-w-[unset] aspect-square relative rounded-[12px] overflow-hidden"
              imageClassName="w-full h-full object-contain"
            />
          </div>
          <div className="w-full md:w-[50%] md:min-w-[50%] flex flex-col gap-4 md:gap-6 lg:px-4">
            <GenericHeading
              fontStyle="font-georgia font-[700]"
              headingType="h2"
              textColor="text-white"
              extraClass="text-center"
            >
              <h3>{product.title}</h3>
            </GenericHeading>

            <div className="flex justify-center items-center gap-3">
              <button
                className="p-2 max-w-[32px] max-h-[32px] lg:max-w-[48px] lg:max-h-[48px] flex justify-center items-center rounded-full border-[1px] border-primaryYellow
                  disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => dispatch(removeOrderQuantity({ id: product.id }))}
                disabled={product.orderQuantity === 1}
                aria-label="Премахни единица"
                title="Премахни единица"
                aria-disabled={product.orderQuantity === 1}
              >
                <MinusIcon />
              </button>

              <div className="border-[1px] bg-brown border-primaryYellow bg-primaryYellow px-3 py-[3px] flex justify-center items-center">
                <GenericParagraph
                  fontStyle="font-georgia font-[400]"
                  pType="large"
                  extraClass="text-center !text-purpleLight"
                >
                  {product.orderQuantity}
                </GenericParagraph>
              </div>

              <button
                className="p-2 max-w-[32px] max-h-[32px] lg:max-w-[48px] lg:max-h-[48px] flex justify-center items-center rounded-full border-[1px] border-primaryYellow"
                onClick={() => {
                  dispatch(addOrderQuantity({ id: product.id }))
                }}
                aria-label="Добави единица"
                title="Добави единица"
                aria-disabled={false}
                disabled={false}
              >
                <PlusIcon />
              </button>
            </div>

            <div className="flex flex-col">
              <GenericParagraph
                fontStyle="custom"
                pType="regular"
                textColor="text-primaryYellow"
                extraClass="font-georgia font-[700] text-center"
              >
                <>
                  <span className="text-white/90">Цена артикули: </span>
                  {(product.price! * product.orderQuantity).toFixed(2)}€
                </>
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

            <div className="w-full flex flex-col md:flex-row items-center gap-2 px-2 py-2">
              <input
                name={'code'}
                type={'text'}
                placeholder={'Въведи код'}
                value={formValues.code}
                onChange={(e) => setFormValues({ ...formValues, code: e.target.value })}
                className={`w-full rounded-[12px] bg-[#200226]/50 focus:outline focus:outline-1 focus:outline-white p-3 font-georgia font-[400]
                   !text-white outline-none placeholder:text-white/80 border-[1px] border-white`}
                maxLength={50}
              />
              <GenericButton variant="primary" styleClass="!py-[12px] w-full md:w-fit">
                провери
              </GenericButton>
            </div>
          </div>
        </article>
      </li>
    )
  })

  const remain = Number(calculateRemainSum().toFixed(2))

  return (
    <div className="lg:fixed lg:top-[170px] lg:rounded-[16px] lg:right-4 w-full lg:max-w-[50%] bg-purpleLight">
      <div className="w-full flex relative justify-center items-center py-2">
        <GenericParagraph
          fontStyle="custom"
          pType="custom"
          textColor="text-primaryYellow"
          extraClass="text-[22px] md:text-[24px] leading-[150%] tracking-[0.01em] font-georgia font-[700]"
        >
          Твоята Количка
        </GenericParagraph>
      </div>
      <div className="w-full flex justify-center bg-purpleDark items-center py-4 border-t-[1px] border-b-[1px] border-white/20">
        <GenericParagraph
          fontStyle="font-georgia font-[400]"
          pType="regular"
          textColor="text-white"
          extraClass="px-1 text-center"
        >
          {remain < 0 ? (
            <span className="uppercase">Доставката е безплатна!</span>
          ) : (
            <>
              {/* Добави артикули за още {calculateRemainSum().toFixed(2)}лв{' '} */}
              {Number(calculateRemainSum()).toFixed(2)}€ и доставката ще е безплатна
            </>
          )}
        </GenericParagraph>
      </div>

      <div className="flex-1 bg-purpleLight overflow-y-auto">
        {products.length === 0 ? (
          <GenericParagraph
            fontStyle="font-georgia font-[400]"
            pType="regular"
            textColor="text-white"
            extraClass="text-center py-4"
          >
            Вашата количка е празна
          </GenericParagraph>
        ) : (
          <ul className="w-full flex flex-col">{productsContent}</ul>
        )}
      </div>

      <div className="w-full py-2 px-4 bg-black/20">
        <Link href="/checkout">
          <div
            className="w-full rounded-[24px] flex  justify-between items-center py-4 px-2
          [&>div>div>svg]:hover:animate-bounce disabled:cursor-not-allowed disabled:opacity-50
          "
          >
            <div className="flex justify-center items-center">
              <GenericParagraph
                fontStyle="custom"
                pType="regular"
                textColor="text-primaryYellow"
                extraClass="font-georgia font-[700]"
              >
                Всичко:
              </GenericParagraph>
            </div>

            <div className="flex justify-center items-center">
              <GenericParagraph
                fontStyle="custom"
                pType="regular"
                textColor="text-primaryYellow"
                extraClass="font-georgia font-[700]"
              >
                {/* calculateTotalPrice().toFixed(2)} лв */}
                {calculateTotalPrice().toFixed(2)}€
              </GenericParagraph>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default CheckoutAside
