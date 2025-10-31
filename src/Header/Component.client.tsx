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
  const dispatch = useAppDispatch()
  const { calculateTotalPrice } = useCheckout()
  const shoppingCartProducts = useAppSelector((state) => state.checkout.products)
  const user = useAppSelector((state) => state.root.user)
  const { categoryItems, logo } = headerData as Header
  const [pending, start] = useTransition()
  const [openUserMenu, setOpenUserMenu] = useState(false)

  const [openMenu, setOpenMenu] = useState(false)
  const [openCategoryIndex, setOpenCategoryIndex] = useState(-1)

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [openMenu])

  const linksContent = categoryItems?.map((item, i) => {
    if (!item?.link?.label) return null

    return (
      <li className="w-fit flex items-center" key={`${item?.link?.label}${i}`}>
        <Link
          href={generateHref(item as LinkObject)}
          aria-label={item?.link?.label}
          target={item?.link?.newTab ? '_blank' : '_self'}
          className="[&>button>span]:hover:underline transition-all duration-300 ease-in-out"
          prefetch={true}
        >
          <span className="text-[18px] font-[400] text-[#FFD700]">{item?.link?.label}</span>
        </Link>
      </li>
    )
  })

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-black/70 z-[12] py-[15px] px-[40px] flex justify-center items-center">
      <nav className="w-full flex justify-between items-center content_wrapper_mobile-full">
        <Link href={'/'} aria-label="Отиди на начална страница">
          <GenericImage
            src={(logo as Media)?.url as string}
            alt={(logo as Media)?.alt as string}
            wrapperClassName="w-[60px] h-[60px] md:w-[100px] md:h-[100px] flex items-center justify-center relative"
            imageClassName="w-full h-full object-contain"
            fill={true}
          />
        </Link>

        <ul className="flex justify-center items-center gap-4">{linksContent}</ul>

        <ul className="flex items-center gap-2 px-2">
          <li className="relative">
            {!user ? (
              <Link href={'/auth/login'} aria-label="Към вход" className="flex items-center gap-2">
                <GenericParagraph
                  pType="regular"
                  extraClass="hidden md:block"
                  fontStyle="font-sansation font-[700]"
                >
                  Вход
                </GenericParagraph>
                <div className="w-[32px] h-[32px] md:w-[48px] md:h-[48px] rounded-full flex justify-center items-center border-[1px] border-brown p-[5px]">
                  <UserProfileIcon />
                </div>
              </Link>
            ) : (
              <button
                className="w-[32px] h-[32px] md:w-[48px] md:h-[48px] rounded-full flex justify-center items-center border-[1px] border-brown p-[5px]"
                aria-label="Потребител Меню"
                title="Потребител Меню"
                onClick={() => setOpenUserMenu((prev) => !prev)}
              >
                <p className="md:text-[20px]">{user?.firstName?.[0]}</p>
              </button>
            )}
            {openUserMenu && !!user && (
              <button
                className="absolute top-full right-0 px-4 py-2 bg-brown z-[3] rounded-[4px] border-[1px] text-white border-white flex
              hover:text-brown hover:bg-white transition-colors duration-500"
                onClick={() =>
                  start(async () => {
                    await logout()
                    dispatch(setUser(null))
                  })
                }
                disabled={pending}
              >
                <p className="m-auto ">{pending ? 'Излизане...' : 'Изход'}</p>
              </button>
            )}
          </li>
          <li>
            <button
              className="w-[32px] h-[32px] md:w-[48px] md:h-[48px] rounded-full flex justify-center items-center border-[1px] border-brown pb-[7px] pt-[5px]"
              aria-label="Търсене на продукт"
              title="Търсене на продукт"
              onClick={() => {
                dispatch(setOpenSearch(true))
              }}
            >
              <SearchLogo />
            </button>
          </li>
          <li className="flex items-center gap-2">
            <div className="hidden flex-col md:flex">
              <GenericParagraph pType="small" textColor="text-brown">
                Количка
              </GenericParagraph>
              {/* //TODO dynamic price */}
              <GenericParagraph pType="small" textColor="text-bordo" extraClass="tracking-tighter">
                {calculateTotalPrice().toFixed(2)} BGN
              </GenericParagraph>
            </div>
            <button
              className="w-[32px] h-[32px] md:w-[48px] md:h-[48px] rounded-full flex justify-center items-center border-[1px] border-brown p-[3px] relative"
              aria-label="Потребител количка"
              title="Потребител количка"
              onClick={() => dispatch(setShoppingCardOpen(true))}
            >
              <div
                className="absolute z-[2] top-[-5px] right-[-5px] w-[16px] h-[16px] md:w-[20px] md:h-[20px] rounded-full bg-bordo text-white
              flex justify-center items-center"
              >
                <p className="text-white font-sensation font-[700] text-[10px] md:text-[12px]">
                  {shoppingCartProducts.length}
                </p>
              </div>
              <ShoppingCartIcon />
            </button>
          </li>
          <li className="md:hidden">
            <button
              className="w-[34px] h-[34px] rounded-full flex justify-center items-center border-[1px] border-brown pb-[7px] pt-[5px]"
              aria-label="Меню отваряне"
              title="Меню отваряне"
              onClick={() => {
                setOpenMenu(true)
              }}
            >
              <MenuIcon />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default HeaderClient
