import { Media, PDFBlock } from '@/payload-types'
import React from 'react'

export const PDFBlockComponent: React.FC<PDFBlock> = (props) => {
  const { pdfFile } = props

  const pdf = pdfFile as Media

  return (
    <section className="w-full pt-[80px] md:pt-[150px] bg-purpleBackground">
      <div className="w-full h-full min-h-[80vh]">
        <iframe src={pdf.url as string} title="PDF" className="w-full min-h-[80svh] border-0" />
      </div>
    </section>
  )
}
