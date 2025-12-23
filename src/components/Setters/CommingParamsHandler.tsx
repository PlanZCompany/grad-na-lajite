'use client'

import { useAppDispatch } from '@/hooks/redux-hooks'
import { setNotification } from '@/store/features/notifications'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const ComingParamsHandler = () => {
  const dispatch = useAppDispatch()
  const params = useSearchParams()
  useEffect(() => {
    const unsubscribed = params.get('unsubscribed')

    if (unsubscribed) {
      dispatch(
        setNotification({
          showNotification: true,
          message: 'Успешно премахнат абонамент',
          type: 'success',
        }),
      )
    }
  }, [])

  useEffect(() => {
    const cancelled = params.get('cancelled')

    if (cancelled) {
      dispatch(
        setNotification({
          showNotification: true,
          message: 'Успешно канселирана поръчка',
          type: 'success',
        }),
      )
    }
  }, [])

  return <></>
}

export default ComingParamsHandler
