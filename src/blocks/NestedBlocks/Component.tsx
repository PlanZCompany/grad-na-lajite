import type { ComponentProps } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'

type NestedBlocksProps = {
  items?: ComponentProps<typeof RenderBlocks>['blocks']
}

export const NestedBlocksComponent = ({ items }: NestedBlocksProps) => {
  if (!items?.length) {
    return null
  }

  return (
    <section className="w-full">
      <RenderBlocks blocks={items as any} />
    </section>
  )
}
