'use client'

import { AllSocialIcon } from '@/assets/icons'
import { GenericImage } from '@/components/Generic'
import { Aside, Media } from '@/payload-types'
import Link from 'next/link'
import React, { useState } from 'react'

const AsideClient = ({ asideData }: { asideData: Aside }) => {
  const [showNetwork, setShowNetwork] = useState(false)
  const { links } = asideData

  const linksContent = links?.map((item, index) => {
    const media = item.media as Media

    const initialTransition = index * 100

    return (
      <li
        key={item.id}
        className={` flex justify-center items-center
     duration-300 transition-transform ease-in-out ${showNetwork ? 'translate-x-0' : 'translate-x-[200%]'}`}
        style={{
          transitionDelay: `${initialTransition}ms`,
        }}
      >
        <button className="hover:scale-105 transition-transform duration-300 ease-in-out relative">
          <Link href={item.link.url || '#'}>
            <GenericImage
              src={media?.url || ''}
              alt={media?.alt || ''}
              wrapperClassName="w-10 h-10"
              imageClassName="object-contain"
              unoptimized={true}
            />
          </Link>
        </button>
      </li>
    )
  })

  return (
    <aside className="fixed bottom-[104px] md:bottom-[112px] md:right-4 right-2 flex flex-col gap-m z-[10]">
      <button
        className="hover:scale-105 transition-transform duration-300 ease-in-out relative w-10 h-10"
        onClick={() => setShowNetwork(!showNetwork)}
      >
        <AllSocialIcon />
      </button>

      <ul className="flex flex-col-reverse gap-4 absolute bottom-[52px] md:bottom-[72px]">
        {linksContent}
      </ul>
    </aside>
  )
}

export default AsideClient
