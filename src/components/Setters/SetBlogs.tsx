'use client'

import { useAppDispatch } from '@/hooks/redux-hooks'
import { Blog } from '@/payload-types'
import { setBlogs } from '@/store/features/root'
import React, { useEffect } from 'react'

const SetBlogs = ({ blogs }: { blogs: Blog[] }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!blogs) return
    dispatch(setBlogs(blogs))
  }, [blogs, dispatch])

  return <></>
}

export default SetBlogs
