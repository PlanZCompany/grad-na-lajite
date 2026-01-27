'use client'

import { AllSocialIcon } from '@/assets/icons'
import { GenericImage } from '@/components/Generic'
import { Aside, Media } from '@/payload-types'
import Link from 'next/link'
import React, { useState } from 'react'

const AsideClient = ({ asideData }: { asideData: Aside }) => {
  const [showNetwork, setShowNetwork] = useState(false)
  const [showAiContent, setShowAiContent] = useState(false)
  const { links } = asideData
  if (!links) console.log('no links')

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
            />
          </Link>
        </button>
      </li>
    )
  })

  return (
    <aside className="fixed bottom-[104px] md:bottom-[112px] md:right-4 right-2 z-[10]">
      <>
        <div className="flex flex-col gap-m">
          <button
            className="hover:scale-105 transition-transform duration-300 ease-in-out relative w-10 h-10 z-[12]"
            onClick={() => {
              setShowAiContent(false)
              setShowNetwork(!showNetwork)
            }}
          >
            <AllSocialIcon />
          </button>

          <ul className="flex flex-col-reverse gap-4 absolute bottom-[102px] md:bottom-[102px]">
            {linksContent}
          </ul>
        </div>
        <div
          className="flex justify-center items-center w-[40px] h-[40px] mt-2 cursor-pointer"
          aria-label="Виж AI помощник"
          onClick={() => setShowAiContent(!showAiContent)}
        >
          <GenericImage
            src={(asideData.ai.media as Media).url || ''}
            alt={(asideData.ai.media as Media).alt || ''}
            wrapperClassName="w-full h-full relative"
            imageClassName="object-contain w-full h-full"
            fill={true}
          />

          <div
            className={`absolute z-[10] right-12 transition-[transform,opacity] duration-500 ease-in-out ${
              showAiContent
                ? 'translate-x-0 opacity-100 pointer-events-auto'
                : 'translate-x-[50%] opacity-0 pointer-events-none'
            }`}
          >
            <div className="bg-gradient-to-br from-[#d4af37] to-[#b7952b] absolute top-[50%] translate-y-[-50%] w-4 h-4 right-0 translate-x-[50%] rotate-45"></div>

            <Link
              href={asideData.ai.link.url || ''}
              target="_blank"
              aria-label={asideData.ai.link.label}
              rel="noopener noreferrer"
            >
              <button
                className="bg-gradient-to-br from-[#d4af37] to-[#b7952b] text-[#200226] relative z-[12]
            transition-all duration-300 ease-in-out
            shadow-[0_0_15px_rgba(212,175,55,0.4)]
            hover:from-[#e8c85c] hover:to-[#d4af37]
            hover:shadow-[0_0_25px_rgba(212,175,55,0.7)] text-[16px] px-2 min-w-[180px] rounded-lg flex justify-center items-center py-2"
                аria-label="Добави в количка"
              >
                <span>{asideData.ai.link.label}</span>

                <div
                  className={`absolute top-0 left-0 right-0 bg-purpleLight rounded-xl p-2 
                    transition-all duration-500 ease-in-out delay-500
                ${showAiContent ? 'opacity-100 pointer-events-auto translate-y-[calc(-100%-24px)]' : 'opacity-0 pointer-events-none translate-y-[-50%]'}`}
                >
                  <div className="absolute z-[0] bottom-0 w-5 h-5 bg-purpleLight left-[50%] translate-x-[-50%] translate-y-[50%] rotate-45"></div>
                  <span className="hidden md:block text-white text-[14px] leading-[22px]">
                    {asideData.ai.desktopText}
                  </span>
                  <span className="block md:hidden text-white text-[14px] leading-[22px]">
                    {asideData.ai.mobileText}
                  </span>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </>
    </aside>
  )
}

export default AsideClient
