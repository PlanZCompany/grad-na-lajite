import { GenericHeading } from '@/components/Generic'
import { TableBlock } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

export const TableBLockComponent: React.FC<TableBlock> = (props) => {
  const headings = props.tableHeadings
  const rows = props.tableRows

  const renderTable = () => {
    if (!headings || !rows) return null

    return (
      <div className="-mx-4 px-4 overflow-x-auto md:mx-0 md:px-0">
        <table
          className="
          w-auto md:w-full
          min-w-full md:min-w-0
          text-center bg-white border-collapse
        "
        >
          <thead>
            <tr className="bg-purpleLight text-white">
              {headings.map((heading, i) => (
                <th
                  key={i}
                  className="p-2 md:p-3 text-center border border-white whitespace-nowrap"
                >
                  {heading.heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((currentRow, rowIndex) => {
              if (!currentRow.row) return null
              return (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 !== 0 ? 'bg-[#f2f2f2] relative' : 'bg-white relative'}
                >
                  {currentRow.row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="p-2 md:p-3 text-center border border-gray-200 first:font-[700]"
                    >
                      {cell.cell}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <section className="w-full py-6 md:py-10 flex relative z-[2]">
      <div className="w-full flex flex-col gap-m">
        {props.heading && (
          <GenericHeading
            textShadow={true}
            headingType="h2"
            align="text-center md:text-left"
            extraClass={`w-full blog_headings`}
            textColor="text-[#4B0082]"
          >
            <RichText data={props.heading} />
          </GenericHeading>
        )}

        {renderTable()}
      </div>
    </section>
  )
}
