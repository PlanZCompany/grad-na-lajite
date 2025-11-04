'use client'

import { ArrowIcon, CloseCircle } from '@/assets/icons'
import { GenericParagraph } from '@/components/Generic'
import { Header } from '@/payload-types'
import { generateHref, LinkObject } from '@/utils/generateHref'
import Link from 'next/link'
import React, { useState } from 'react'

const Menu = ({
  openMenu,
  setOpenMenu,
  categoryItems,
}: {
  openMenu: boolean
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
  categoryItems: Header['categoryItems']
}) => {
  const [openCategoryIndex, setOpenCategoryIndex] = useState(-1)

  const linksContent = categoryItems?.map((item, i) => {
    if (!item?.link?.label) return null

    return (
      <li className="w-full px-2 py-2 flex flex-col" key={`${item?.link?.label}${i}`}>
        <div className="flex justify-between items-center border-b-[1px] border-dashed border-brown/80">
          <Link
            href={generateHref(item as LinkObject)}
            aria-label={item?.link?.label}
            target={item?.link?.newTab ? '_blank' : '_self'}
            className=""
            prefetch={true}
          >
            <p className="font-georgia font-[400] italic text-[18px] text-black">
              {item?.link?.label}
            </p>
          </Link>

          <button
            className={`w-[20px] h-[20px] flex justify-center items-center
                transition-transform duration-300 ease-in-out ${
                  openCategoryIndex === i + 1 ? 'rotate-[-90deg]' : 'rotate-[90deg]'
                }`}
            onClick={() => {
              if (openCategoryIndex === i + 1) {
                setOpenCategoryIndex(-1)
              } else {
                setOpenCategoryIndex(i + 1)
              }
            }}
            aria-label="Избор на категория"
            title="Избор на категория"
            type="button"
            tabIndex={-1}
          >
            <ArrowIcon />
          </button>
        </div>
      </li>
    )
  })

  return (
    <div
      className={`fixed right-0 top-0 w-[calc(100%-48px)] h-screen overflow-y-auto bg-white z-[13] white_background_bubble
     ${openMenu ? 'translate-x-0' : 'translate-x-full'} transition-[transform] duration-500 ease-in-out
    `}
    >
      <div className="w-full flex items-center justify-between py-2 px-4 border-b-[1px] border-bordo/80">
        <GenericParagraph fontStyle="font-georgia font-[400]" pType="large" textColor="text-black">
          Меню
        </GenericParagraph>

        <button
          onClick={() => setOpenMenu(false)}
          className="w-[28px] h-[28px] flex justify-center items-center"
          aria-label="Затвори меню"
          title="Затвори меню"
          type="button"
          tabIndex={-1}
        >
          <CloseCircle />
        </button>
      </div>

      <ul className="w-full flex flex-col gap-3 py-3">{linksContent}</ul>
    </div>
  )
}

export default Menu
