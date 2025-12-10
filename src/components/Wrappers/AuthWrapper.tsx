import Link from 'next/link'
import React from 'react'

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <section
      className={`w-full relative pb-10 md:pb-[120px] pt-[108px] md:pt-[250px] flex bg-[#200226]`}
    >
      <div className="m-auto w-fit md:py-16 relative z-[1] rounded-[24px] flex flex-col-reverse md:flex-row auth_forms">
        <div className="shape1"></div>
        <div className="shape2"></div>
        <div className="pt-6 pb-10 px-6 md:px-20 flex justify-center items-center form_container bg-purpleDark/50">
          {children}

          <div className="absolute z-[2] py-[2px] left-0 right-0 bottom-[0px] flex justify-center items-center">
            <Link href="/privacy-policy" className="w-full text-white text-center">
              <span className="font-georgia font-[400] text-white text-center text-[14px] w-full">
                Политика за поверителност
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthWrapper
