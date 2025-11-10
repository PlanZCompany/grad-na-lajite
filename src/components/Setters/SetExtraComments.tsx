'use client'

import { useAppDispatch } from '@/hooks/redux-hooks'
import { setExtraComments } from '@/store/features/root'

import React, { useEffect } from 'react'

const SetExtraComments = ({
  extraComments,
}: {
  extraComments: { name: string; comment: string }[]
}) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setExtraComments(extraComments))
  }, [extraComments, dispatch])

  return <></>
}

export default SetExtraComments
