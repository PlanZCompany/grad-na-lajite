'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export function useReveal(
  trigger: boolean,
  setter: React.Dispatch<React.SetStateAction<boolean>>,
  timeOutValue: number,
): {
  animationStatus: 'idle' | 'in' | 'out'
  setAnimationStatus: React.Dispatch<React.SetStateAction<'idle' | 'in' | 'out'>>
} {
  const [animationStatus, setAnimationStatus] = useState<'idle' | 'in' | 'out'>('idle')
  const TIMEOUT_VALUE_REF = useRef(timeOutValue)
  const timeOut = useRef<NodeJS.Timeout | null>(null)

  const setterHandler = useCallback(() => {
    setter(false)
  }, [setter])

  useEffect(() => {
    setAnimationStatus('in')
  }, [trigger])

  useEffect(() => {
    if (animationStatus === 'out') {
      timeOut.current = setTimeout(() => {
        setterHandler()
      }, TIMEOUT_VALUE_REF.current)
    }

    return () => {
      if (timeOut.current) {
        clearTimeout(timeOut.current)
      }
    }
  }, [animationStatus, setterHandler])

  return { animationStatus, setAnimationStatus }
}
