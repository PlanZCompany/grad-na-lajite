import React from 'react'

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return <section className="w-full py-10 md:py-20 flex relative z-[2]">{children}</section>
}

export default SectionWrapper
