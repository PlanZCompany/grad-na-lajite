'use client'

import React, { useEffect } from 'react'
import { GenericParagraph } from '../Generic'
import dayjs from 'dayjs'

const CurrentDateAndTime = () => {
  const [isClient, setIsClient] = React.useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <GenericParagraph textColor="text-primaryYellow">
      {dayjs().format('DD.MM.YYYY - HH:mm:ss')}
    </GenericParagraph>
  )
}

export default CurrentDateAndTime
