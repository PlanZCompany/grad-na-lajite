'use client'

import React from 'react'

// import { usePathname } from 'next/navigation'
// import { useAppDispatch } from '@/hooks/redux-hooks'

// const GenericPagination = ({ totalPages }: { totalPages: number }) => {
const GenericPagination = () => {
  // const dispatch = useAppDispatch()
  // const pathname = usePathname()

  // const numberOfPage = pathname?.split('/page/')?.[1] || 1

  // const slices = Array.from({ length: totalPages }).map((_, index) => {
  //   let isActive = pathname === `/blog/page/${index + 1}` ? true : false

  //   if (index === 0 && !isActive) isActive = pathname === `/blog` ? true : false

  //   return (
  //     <Link
  //       key={`page-${index}`}
  //       href={`/blog/page/${index + 1}`}
  //       className="w-full h-full flex items-center justify-center"
  //       prefetch={true}
  //     >
  //       <button
  //         className="w-full h-full flex items-center justify-center relative py-2"
  //         type="button"
  //         onClick={() => {
  //           dispatch(setScrollToBlogs(true))
  //         }}
  //       >
  //         {isActive && (
  //           <div className="absolute left-0 right-0 top-0 w-full h-full z-[0] px-8">
  //             <div className="w-full h-full glass rounded-[16px] bg-primaryGray/20"></div>
  //           </div>
  //         )}
  //         <article className="w-full flex flex-col gap-2 justify-center items-center relative z-[3]">
  //           <GenericParagraph
  //             pType="regular"
  //             fontStyle="font-montserrat-semibold"
  //             textColor="text-primaryWhite"
  //           >
  //             {index + 1}
  //           </GenericParagraph>
  //         </article>
  //       </button>
  //     </Link>
  //   )
  // })

  return (
    <nav className="w-full relative py-2 xl:py-4 glass xl:rounded-[16px] content_wrapper_mobile-full">
      {/* <div className="absolute z-[3] left-4 top-1/2 -translate-y-1/2">
        <DirectionArrow
          click={() => {
            const target = document.querySelector('.pagination_prev') as HTMLButtonElement

            if (!target) return
            target?.click()
          }}
          direction={'left'}
        />
      </div>

      <div className="w-full relative px-6">
        <div className="pointer-events-none w-[33%] h-full bg-gradient-to-r from-primaryBlack to-transparent absolute left-0 top-0 bottom-0 z-[2]"></div>
        <Slider {...settings}>{slices}</Slider>
        <div className="pointer-events-none w-[33%] h-full bg-gradient-to-l from-primaryBlack to-transparent absolute right-0 top-0 bottom-0 z-[2]"></div>
      </div>

      <div className="absolute z-[3] right-4 top-1/2 -translate-y-1/2">
        <DirectionArrow
          click={() => {
            const target = document.querySelector('.pagination_next') as HTMLButtonElement

            if (!target) return
            target?.click()
          }}
          direction={'right'}
        />
      </div> */}
    </nav>
  )
}

export default GenericPagination
