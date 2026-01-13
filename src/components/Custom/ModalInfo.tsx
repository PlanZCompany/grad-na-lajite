'use client'

import { CloseCircle } from '@/assets/icons'
import { GenericHeading, GenericImage, GenericParagraph } from '@/components/Generic'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { setInfoModalStatus } from '@/store/features/root'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

const InfoModal = () => {
  const dispatch = useAppDispatch()
  const infoModalStatus = useAppSelector((state) => state.root.infoModalStatus)
  const [openModal, setOpenModal] = useState(false)

  const timeOut = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (infoModalStatus === 'hidden') {
      setOpenModal(false)
      return
    }

    if (infoModalStatus === 'order' || infoModalStatus === 'subscription') {
      setOpenModal(true)
      return
    }
  }, [infoModalStatus])

  useLayoutEffect(() => {
    timeOut.current = setTimeout(() => {
      setOpenModal(false)
      dispatch(setInfoModalStatus('hidden'))
    }, 4500)

    return () => {
      if (timeOut.current) {
        clearTimeout(timeOut.current)
      }
    }
  }, [])

  const textMessage =
    infoModalStatus === 'order' ? 'Успешно отменихте поръчката си' : 'Успешно отписване'

  return (
    <div
      role="dialog"
      aria-label="subscription-modal"
      className={`fixed z-[15] bg-black/80 inset-0 flex ${
        openModal ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      } transition-[transform,opacity] duration-700 ease-in-out`}
    >
      <div className="m-auto w-full max-w-[90%] md:max-w-[600px] xl:max-w-[710px] bg-purpleDark rounded-[12px] overflow-hidden relative">
        <button
          type="button"
          aria-label="Close Modal"
          className="flex justify-center items-center absolute top-2 right-2 z-[3] w-[32px] h-[32px] md:w-[36px] md:h-[36px]
             bg-primaryYellow/80 hover:bg-primaryYellow rounded-full"
          onClick={() => {
            setOpenModal(false)
            dispatch(setInfoModalStatus('hidden'))
          }}
        >
          <CloseCircle />
        </button>
        <div className="m-auto flex flex-col relative z-[2] py-4 md:py-6 xl:py-10 px-4 md:px-6 xl:px-10">
          <GenericImage
            src={`/Logo.png`}
            alt={'Logo'}
            wrapperClassName="w-[100px] h-[100px] md:w-[200px] md:h-[200px] xl:w-[250px] xl:h-[250px] flex items-center justify-center relative mx-auto"
            imageClassName="w-full h-full object-contain"
            fill={true}
          />
          <article className="flex justify-center items-center gap-s flex-col">
            <GenericHeading
              textShadow={true}
              headingType="h2"
              align="text-center"
              extraClass="border-b-[1px] border-primaryYellow pb-3"
            >
              <h3>{textMessage}</h3>
            </GenericHeading>

            <GenericParagraph extraClass="text-center" pType="small">
              Съобщението ще се премахне автоматично след 3 секунди или натиснете "X"
            </GenericParagraph>
          </article>
        </div>
      </div>
    </div>
  )
}

export default InfoModal
