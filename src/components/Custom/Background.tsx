import { PresentV1Icon, PresentV2Icon, Ribbon2, RibbonIcon } from '@/assets/icons'
import React from 'react'

const Background = () => {
  return (
    <div className="absolute inset-0 z-[0] red_background">
      <div className="hidden md:block absolute z-[1] top-[15%] left-0 w-[100px] h-[100px] xl:w-[200px] xl:h-[200px] 2xl:w-[250px] 2xl:h-[250px]">
        <PresentV1Icon />
      </div>
      <div className="hidden md:block absolute z-[1] bottom-[5%] left-[5%] w-[100px] h-[100px] xl:w-[200px] xl:h-[200px] 2xl:w-[250px] 2xl:h-[250px]">
        <RibbonIcon />
      </div>
      <div className="hidden md:block absolute z-[1] top-[10%] right-[5%] w-[100px] h-[100px] xl:w-[200px] xl:h-[200px] 2xl:w-[250px] 2xl:h-[250px]">
        <PresentV2Icon />
      </div>

      <div className="hidden md:block absolute z-[1] bottom-0 right-[0] w-[100px] h-[100px] xl:w-[200px] xl:h-[200px] 2xl:w-[250px] 2xl:h-[250px]">
        <Ribbon2 />
      </div>
    </div>
  )
}

export default Background
