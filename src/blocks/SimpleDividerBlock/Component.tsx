import type { SimpleDividerBlock } from '@/payload-types'

const DEFAULT_DIVIDER_COLOR = '#d4af37'

export const SimpleDividerBlockComponent = ({ color }: SimpleDividerBlock) => {
  const dividerColor = color?.trim() || DEFAULT_DIVIDER_COLOR

  return (
    <div
      className="divider_section relative z-[2]"
      style={{ background: `linear-gradient(to right, transparent, ${dividerColor}, transparent)` }}
    ></div>
  )
}
