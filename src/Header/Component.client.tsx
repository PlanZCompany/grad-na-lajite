'use client'
import React, { useEffect, useState } from 'react'

import { Header, Media } from '@/payload-types'
import { generateHref, LinkObject } from '@/utils/generateHref'
import Link from 'next/link'
import { DataFromGlobalSlug } from 'payload'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { GenericImage, GenericParagraph } from '@/components/Generic'
import { ArrowIcon, MenuIcon, SearchLogo, ShoppingCartIcon, UserProfileIcon } from '@/assets/icons'
import { setOpenSearch, setUser } from '@/store/features/root'
import Menu from './Menu'
import { setShoppingCardOpen } from '@/store/features/checkout'
import { useCheckout } from '@/hooks/useCheckout'
import { useTransition } from 'react'
import { logout } from '@/action/auth/logout'

const HeaderClient = ({ headerData }: { headerData: DataFromGlobalSlug<'header'> }) => {
  // const dispatch = useAppDispatch()
  // const { calculateTotalPrice } = useCheckout()
  // const shoppingCartProducts = useAppSelector((state) => state.checkout.products)
  // const user = useAppSelector((state) => state.root.user)
  // const { categoryItems, logo } = headerData as Header
  // const [pending, start] = useTransition()
  // const [openUserMenu, setOpenUserMenu] = useState(false)

  // const [openMenu, setOpenMenu] = useState(false)
  // const [openCategoryIndex, setOpenCategoryIndex] = useState(-1)

  // useEffect(() => {
  //   if (openMenu) {
  //     document.body.style.overflow = 'hidden'
  //   } else {
  //     document.body.style.overflow = ''
  //   }
  // }, [openMenu])

  // const linksContent = categoryItems?.map((item, i) => {
  //   if (!item?.link?.label) return null

  //   return (
  //     <li className="w-fit flex items-center" key={`${item?.link?.label}${i}`}>
  //       <Link
  //         href={generateHref(item as LinkObject)}
  //         aria-label={item?.link?.label}
  //         target={item?.link?.newTab ? '_blank' : '_self'}
  //         className="[&>button>span]:hover:underline transition-all duration-300 ease-in-out"
  //         prefetch={true}
  //       >
  //         <div
  //           className="w-full h-full flex items-center gap-[4px] relative"
  //           onMouseEnter={() => setOpenCategoryIndex(i + 1)}
  //         >
  //           <span className="text-[14px] font-sensation font-[400] text-white">
  //             {item?.link?.label}
  //           </span>
  //           <button
  //             className={`flex justify-center items-center w-[16px] h-[16px]
  //               transition-transform duration-500 ease-in-out ${
  //                 openCategoryIndex === i + 1 ? 'rotate-[-90deg]' : 'rotate-90'
  //               }`}
  //             aria-label={item?.link?.label}
  //             title={item?.link?.label}
  //           >
  //             <ArrowIcon color="white" />
  //           </button>

  //           <div
  //             className={`w-full h-[1px] absolute top-full bg-white left-0
  //               transition-[max-width] duration-500 ease-in-out
  //           ${openCategoryIndex === i + 1 ? 'max-w-full' : 'max-w-0'}`}
  //           ></div>
  //         </div>
  //       </Link>
  //     </li>
  //   )
  // })

  // const currentMedia = categoryItems?.[openCategoryIndex - 1]?.media as Media

  // const currentChildren =
  //   openCategoryIndex !== -1 ? categoryItems?.[openCategoryIndex - 1]?.children : null

  // const childrenContent = !!currentChildren
  //   ? currentChildren.map((item) => {
  //       return (
  //         <li
  //           key={item.id}
  //           className="w-[24%] min-w-[24%] h-[60px] hover:border-[1px] hover:border-brown rounded-[16px]
  //           hover:bg-brown transition-[colors,box-shadow] duration-500 ease-in-out [&>a>button>span]:hover:text-white hover:shadow-lg"
  //         >
  //           <Link
  //             href={generateHref(item as LinkObject)}
  //             aria-label={item?.link?.label}
  //             target={item?.link?.newTab ? '_blank' : '_self'}
  //             prefetch={true}
  //             className="w-full h-full"
  //           >
  //             <button className="w-full h-full flex justify-center items-center">
  //               <span className="text-[14px] font-sensation font-[400] text-brown transition-colors duration-500">
  //                 {item?.link?.label}
  //               </span>
  //             </button>
  //           </Link>
  //         </li>
  //       )
  //     })
  //   : []

  return <></>
}

export default HeaderClient
