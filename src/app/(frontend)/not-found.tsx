import { Blob } from '@/components/Custom'
import { GenericHeading } from '@/components/Generic'
import GenericButton from '@/components/Generic/GenericButton'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-primaryBlack">
      <div className="w-fit mx-auto mb-6 relative">
        <Blob wrapperClassName="absolute top-[-50px] left-0 z-[2]" position="left-top" />
        <Blob
          wrapperClassName="absolute bottom-[-50px] right-0 z-[2] justify-end"
          position="right-bottom"
        />
        <div className="relative z-[3]">
          <GenericHeading
            align="text-center"
            // fontStyle="font-lobster"
            fontStyle="font-kolka font-[500]"
            headingType="h1"
            // textColor="text-primaryWhite"
            textColor="text-white"
          >
            <h1>404</h1>
          </GenericHeading>

          <GenericHeading
            align="text-center"
            // fontStyle="font-montserrat-semibold"
            fontStyle="font-kolka font-[500]"
            headingType="h2"
            // textColor="text-primaryWhite"
            textColor="text-white"
          >
            <h2>Страницата не е намерена</h2>
          </GenericHeading>
          <div className="mx-auto mt-10 flex justify-center items-center">
            <GenericButton variant="primary" styleClass="uppercase">
              <Link href="/">Начална Страница</Link>
            </GenericButton>
          </div>
        </div>
      </div>
    </div>
  )
}
