import { GenericImage } from '@/components/Generic'
import { FooterCheckout, Media } from '@/payload-types'
import { getCachedGlobal } from '@/utils/getGlobals'
import React from 'react'

export async function FooterCheckoutComponent() {
  const footerData: FooterCheckout = await getCachedGlobal('footer-checkout', 1)()

  const paymentLinks = footerData.paymentLinks?.map((link) => {
    const media = link.media as Media

    return (
      <li key={link.id} className="relative w-[50px] aspect-video">
        <GenericImage
          src={media.url || ''}
          alt={media.alt || ''}
          wrapperClassName="absolute inset-0"
          imageClassName="object-contain"
          sizes="250px"
          fill={true}
        />
      </li>
    )
  })

  return (
    <footer className="bg-black/70 w-full py-2 md:py-4 px-4 fixed z-[10] left-0 right-0 bottom-0">
      <div className="w-full flex justify-between items-center">
        <p className="text-white text-[10px] md:text-[14px] text-center md:text-left">
          © {new Date().getFullYear()} Град на Лъжите
        </p>
        <ul className="flex items-center justify-center gap-2">{paymentLinks}</ul>
      </div>
    </footer>
  )
}
