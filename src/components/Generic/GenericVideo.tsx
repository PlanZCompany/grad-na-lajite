import React from 'react'

const GenericVideo = ({
  wrapperClassName,
  src,
  style = {
    transformOrigin: 'center center',
  },
  videoClassName = 'w-full h-full object-cover',
}: {
  wrapperClassName: string
  src: string
  style?: React.CSSProperties
  videoClassName?: string
}) => {
  const currentScr = src.replace('/api/media/file', '')

  return (
    <div className={wrapperClassName}>
      <video
        width={'100%'}
        height={'100%'}
        autoPlay={true}
        loop={true}
        src={currentScr}
        muted={true}
        style={style}
        playsInline={true}
        className={videoClassName}
      />
    </div>
  )
}

export default GenericVideo
