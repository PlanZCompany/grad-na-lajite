'use client'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider, { Settings } from 'react-slick'

import React from 'react'
import { DirectionArrow, SliderArrowGhost } from '../Custom'

const GallerySlider = ({
  children,
  refKey,
  extraClass = '',
  sliderSettings = {},
}: {
  children: React.ReactNode
  refKey: string
  extraClass?: string
  sliderSettings?: Settings
}) => {
  const settings: Settings = {
    ...sliderSettings,
    nextArrow: <SliderArrowGhost refKey={`${refKey}_next`} />,
    prevArrow: <SliderArrowGhost refKey={`${refKey}_prev`} />,
    slidesToScroll: 1,
    arrows: true,
    infinite: true,
    speed: 1000,
  }

  return (
    <div className={`w-full relative ${extraClass}`}>
      <DirectionArrow
        click={() => {
          const keyToMatch = `.${refKey}_prev`

          const nextTarget = document.querySelector(keyToMatch) as HTMLElement

          if (nextTarget) {
            nextTarget.click()
          }
        }}
        direction="left"
      />
      <Slider {...settings}>{children}</Slider>
      <DirectionArrow
        click={() => {
          const keyToMatch = `.${refKey}_next`

          const nextTarget = document.querySelector(keyToMatch) as HTMLElement

          if (nextTarget) {
            nextTarget.click()
          }
        }}
        direction="right"
      />
    </div>
  )
}

export default GallerySlider
