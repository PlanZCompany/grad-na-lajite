'use client'
import React, { useEffect, useState } from 'react'

import { Header, Media } from '@/payload-types'
import { generateHref, LinkObject } from '@/utils/generateHref'
import Link from 'next/link'
import { DataFromGlobalSlug } from 'payload'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { GenericImage, GenericParagraph } from '@/components/Generic'
import { MenuIcon, SearchLogo, ShoppingCartIcon, UserProfileIcon } from '@/assets/icons'
import { setOpenSearch, setUser } from '@/store/features/root'
import { setShoppingCardOpen } from '@/store/features/checkout'
// import { useCheckout } from '@/hooks/useCheckout'
import { useTransition } from 'react'
import { logout } from '@/action/auth/logout'
import Menu from './Menu'

const HeaderClient = ({ headerData }: { headerData: DataFromGlobalSlug<'header'> }) => {
  const dispatch = useAppDispatch()
  // const { calculateTotalPrice } = useCheckout()
  // const shoppingCartProducts = useAppSelector((state) => state.checkout.products)
  const user = useAppSelector((state) => state.root.user)
  const { categoryItems, logo } = headerData as Header
  const [pending, start] = useTransition()
  const [openUserMenu, setOpenUserMenu] = useState(false)

  const [openMenu, setOpenMenu] = useState(false)

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
          <span className="text-[18px] font-[700] text-[#FFD700] hover:text-white transition-colors duration-300 ease-in-out">
            {item?.link?.label}
          </span>
        </Link>
      </li>
    )
  })

  return (
    <>
      <aside className="landscape:hidden portrait:block">
        <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} categoryItems={categoryItems} />
      </aside>
      <header className="fixed backdrop_blur top-0 left-0 right-0 w-full bg-black/70 z-[12] py-[4px] md:py-[15px] px-4 lg:px-[40px] flex justify-center items-center">
        <nav className="w-full flex justify-between items-center content_wrapper_mobile-full relative z-[2]">
          <Link href={'/'} aria-label="Отиди на начална страница">
            <GenericImage
              src={(logo as Media)?.url as string}
              alt={(logo as Media)?.alt as string}
              wrapperClassName="w-[60px] h-[60px] md:w-[100px] md:h-[100px] flex items-center justify-center relative"
              imageClassName="w-full h-full object-contain"
              fill={true}
            />
          </Link>

          <ul className="hidden justify-center items-center gap-4 md:flex">{linksContent}</ul>

          <ul className="flex items-center gap-2 px-2">
            <li className="relative [&_a_div]:hover:text-white [&_div_svg_path]:hover:fill-white">
              {!user ? (
                <Link
                  href={'/auth/login'}
                  aria-label="Към вход"
                  className="flex items-center gap-2"
                >
                  <GenericParagraph
                    pType="regular"
                    extraClass="hidden md:block transition-colors duration-300 ease-in-out"
                    fontStyle="font-georgia font-[400]"
                    textColor="text-primaryYellow"
                  >
                    Вход
                  </GenericParagraph>
                  <div
                    className="w-[36px] h-[36px] md:w-[48px] md:h-[48px] flex justify-center items-center p-[5px]
                 transition-colors duration-300 ease-in-out
                [&_svg_path]:transition-colors [&_svg_path]:duration-300 [&_svg_path]:ease-in-out"
                  >
                    <UserProfileIcon />
                  </div>
                </Link>
              ) : (
                <button
                  className="w-[36px] h-[36px] md:w-[48px] md:h-[48px] rounded-full border-[1px] border-primaryYellow flex justify-center items-center p-[5px]
                hover:opacity-80 transition-colors duration-300 ease-in-out"
                  aria-label="Потребител Меню"
                  title="Потребител Меню"
                  onClick={() => setOpenUserMenu((prev) => !prev)}
                >
                  <p className="md:text-[20px] text-primaryYellow">{user?.firstName?.[0]}</p>
                </button>
              )}
              {openUserMenu && !!user && (
                <button
                  className="absolute top-full right-0 px-4 py-2 bg-brown z-[3] rounded-[4px] border-[1px] text-white border-white flex
              hover:text-black hover:bg-white transition-colors duration-500"
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

            <li className="flex items-center gap-2">
              <button
                className="w-[36px] h-[36px] md:w-[48px] md:h-[48px] rounded-full flex justify-center items-center p-[3px] relative
              [&_svg_path]:hover:fill-white transition-colors duration-300 ease-in-out
                [&_svg_path]:transition-colors [&_svg_path]:duration-300 [&_svg_path]:ease-in-out"
                aria-label="Потребител количка"
                title="Потребител количка"
                onClick={() => dispatch(setShoppingCardOpen(true))}
              >
                <div
                  className="absolute z-[2] top-[-5px] right-[-5px] w-[16px] h-[16px] md:w-[20px] md:h-[20px] rounded-full bg-purpleLight text-white
              flex justify-center items-center"
                >
                  <p className="text-white font-sensation font-[700] text-[10px] md:text-[12px]">
                    {/* {shoppingCartProducts.length} */} 0
                  </p>
                </div>
                <ShoppingCartIcon />
              </button>
            </li>
            <li>
              <button
                className="w-[28px] h-[28px] md:w-[36px] md:h-[36px] flex justify-center items-center ml-3
              [&_svg_path]:hover:fill-white transition-colors duration-300 ease-in-out
                [&_svg_path]:transition-colors [&_svg_path]:duration-300 [&_svg_path]:ease-in-out
              "
                aria-label="Търсене на продукт"
                title="Търсене на продукт"
                onClick={() => {
                  dispatch(setOpenSearch(true))
                }}
              >
                <SearchLogo />
              </button>
            </li>
            <li className="md:hidden">
              <button
                className="w-[40px] h-[40px] rounded-full flex justify-center items-center pb-[7px] pt-[5px]"
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
    </>
  )
}

export default HeaderClient
