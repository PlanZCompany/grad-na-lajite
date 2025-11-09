'use client'

import { ArrowIcon, CloseCircle } from '@/assets/icons'
import { GenericParagraph } from '@/components/Generic'
import { Header } from '@/payload-types'
import { generateHref, LinkObject } from '@/utils/generateHref'
import Link from 'next/link'
import React from 'react'

const Menu = ({
  openMenu,
  setOpenMenu,
  categoryItems,
}: {
  openMenu: boolean
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
  categoryItems: Header['categoryItems']
}) => {
  const linksContent = categoryItems?.map((item, i) => {
    if (!item?.link?.label) return null

    return (
      <li className="w-full px-2 py-2 flex flex-col" key={`${item?.link?.label}${i}`}>
        <Link
          href={generateHref(item as LinkObject)}
          aria-label={item?.link?.label}
          target={item?.link?.newTab ? '_blank' : '_self'}
          className=""
          prefetch={true}
          onClick={() => setOpenMenu(false)}
        >
          <div className="flex justify-between items-center border-b-[1px] border-white/20">
            <p className="font-georgia font-[400] italic text-[18px] text-white">
              {item?.link?.label}
            </p>

            <div
              className={`w-[20px] h-[20px] flex justify-center items-center
              transition-transform duration-300 ease-in-out `}
              aria-label="Избор на категория"
              title="Избор на категория"
              tabIndex={-1}
            >
              <ArrowIcon color="white" />
            </div>
          </div>
        </Link>
      </li>
    )
  })

  return (
    <div
      className={`fixed right-0 top-0 w-[calc(100%-48px)] h-screen overflow-y-auto bg-purpleBackground z-[13]
     ${openMenu ? 'translate-x-0' : 'translate-x-full'} transition-[transform] duration-500 ease-in-out
    `}
    >
      <div className="w-full flex items-center justify-between py-2 px-4 border-b-[1px] border-white/20">
        <GenericParagraph
          fontStyle="font-georgia font-[400]"
          pType="large"
          textColor="text-primaryYellow"
        >
          Меню
        </GenericParagraph>

        <button
          onClick={() => setOpenMenu(false)}
          className="w-[28px] h-[28px] flex justify-center items-center
          [&_svg_path]:stroke-white/50 [&_svg_rect]:stroke-white/50"
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
