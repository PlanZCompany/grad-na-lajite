import React from 'react'

export function SliderArrowGhost(props: { onClick?: () => void; refKey: string }) {
  const { onClick, refKey } = props
  return (
    <div className={`hidden ${refKey}`} onClick={onClick}>
      <></>
    </div>
  )
}

export default SliderArrowGhost
