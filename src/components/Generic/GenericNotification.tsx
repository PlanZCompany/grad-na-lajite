'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { setNotification } from '@/store/features/notifications'
import React, { useEffect } from 'react'

const GenericNotification = () => {
  const dispatch = useAppDispatch()

  const showNotification = useAppSelector((state) => state.notifications.showNotification)
  const message = useAppSelector((state) => state.notifications.message)

  useEffect(() => {
    if (!message) return

    const timeOut = setTimeout(() => {
      dispatch(setNotification({ showNotification: false, message: message, type: '' }))
    }, 2000)

    return () => clearTimeout(timeOut)
  }, [message, dispatch])

  return (
    <article
      className={`fixed bottom-0 left-0 right-0 md:left-[unset] md:right-10 z-[21] transition-[transform] duration-300 ease-in-out ${
        showNotification ? 'translate-y-0' : 'translate-y-[100%]'
      }`}
    >
      <div className="w-full pb-6">
        <div className="content_wrapper red_background flex w-full glass rounded-[8px] py-3 bg-primaryBlack px-4">
          <p className="w-full text-center text-base font-kolka font-500 lg:text-xl text-white">
            {message}
          </p>
        </div>
      </div>
    </article>
  )
}

export default GenericNotification
