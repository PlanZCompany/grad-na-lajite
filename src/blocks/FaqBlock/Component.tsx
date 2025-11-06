import { FaqBlock } from '@/payload-types'
import React from 'react'

export const FaqBlockComponent: React.FC<FaqBlock> = (props) => {
  const { heading } = props

  console.log(heading)

  return (
    <section className="w-full flex">
      <div className="w-full my-auto"></div>
    </section>
  )
}
