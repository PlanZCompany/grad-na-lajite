import { ProductBlock } from '@/payload-types'
import React from 'react'

export const ProductBlockComponent: React.FC<ProductBlock> = (props) => {
  const { hero } = props

  console.log(hero)

  return (
    <section className="w-full flex">
      <div className="w-full my-auto"></div>
    </section>
  )
}
