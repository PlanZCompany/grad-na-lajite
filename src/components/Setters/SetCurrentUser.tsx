'use client'

import { useAppDispatch } from '@/hooks/redux-hooks'
import { User } from '@/payload-types'
import { setUser } from '@/store/features/root'
import { getCurrentUser } from '@/utils/getCurrentUser'
import React, { useEffect } from 'react'

const SetCurrentUser = () => {
  const dispatch = useAppDispatch()

  const setCurrentUserHandler = async () => {
    const currentUser = await getCurrentUser()

    if (!!currentUser) {
      dispatch(setUser(currentUser as User))
    }
  }

  useEffect(() => {
    setCurrentUserHandler()
  }, [])

  return <></>
}

export default SetCurrentUser
