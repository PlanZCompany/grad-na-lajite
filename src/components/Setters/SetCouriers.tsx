'use client'

import { useAppDispatch } from '@/hooks/redux-hooks'
import { CourierOption, setCourierOptions } from '@/store/features/checkout'
import React, { useEffect } from 'react'

const SetCouriers = ({ couriers }: { couriers: CourierOption[] }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!couriers) return
    dispatch(setCourierOptions(couriers))
  }, [couriers, dispatch])

  return <></>
}

export default SetCouriers
