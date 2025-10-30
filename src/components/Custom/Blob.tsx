import React from 'react'

const Blob = ({
  styleClass = '',
  wrapperClassName,
  position,
}: {
  styleClass?: string
  wrapperClassName?: string
  position: 'left-top' | 'right-bottom'
}) => {
  const transition =
    position === 'left-top'
      ? 'translate-x-[-50px] translate-y-[-16px] xl:translate-x-[-100px] xl:translate-y-[-25px]'
      : 'translate-x-[50px] translate-y-[50px] xl:translate-x-[100px] xl:translate-y-[100px]'

  return (
    <div className={`blob content_wrapper_mobile-full ${transition} ${wrapperClassName}`}>
      <div className={`gooey w-[150px] xl:w-[300px] aspect-square ${styleClass}`}></div>
    </div>
  )
}

export default Blob
