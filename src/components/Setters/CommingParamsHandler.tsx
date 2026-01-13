'use client'

import { useAppDispatch } from '@/hooks/redux-hooks'
import { setInfoModalStatus } from '@/store/features/root'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const ComingParamsHandler = () => {
  const dispatch = useAppDispatch()
  const params = useSearchParams()
  useEffect(() => {
    const unsubscribed = params.get('unsubscribed')

    if (unsubscribed) {
      dispatch(setInfoModalStatus('subscription'))
    }
  }, [])

  useEffect(() => {
    const cancelled = params.get('cancelled')

    if (cancelled) {
      dispatch(setInfoModalStatus('order'))
    }
  }, [])

  return <></>
}

export default ComingParamsHandler
