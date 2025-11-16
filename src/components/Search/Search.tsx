'use client'

import React, { useState } from 'react'
import { GenericImage, GenericParagraph } from '../Generic'
import { CloseCircle } from '@/assets/icons'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { setOpenSearch } from '@/store/features/root'
import { Blog } from '@/payload-types'
import { recursiveSearchBlogs } from '@/utils/recursiveSearchBlogs'
import { GridBlog } from '../Sections'

const Search = ({ blogs }: { blogs: Blog[] }) => {
  const dispatch = useAppDispatch()
  const searchOpen = useAppSelector((state) => state.root.openSearch)
  const [inputValue, setInputValue] = useState('')
  const [searchResults, setSearchResults] = useState<null | Blog[]>(null)

  const handleSearch = () => {
    if (inputValue === '') {
      setInputValue('')
      setSearchResults(null)
      return
    }

    const productResults = recursiveSearchBlogs(blogs, inputValue)

    setSearchResults(productResults)
  }

  return (
    <section
      className={`fixed z-[14]  top-0 left-0 right-0 flex flex-col border-b-[2px] bg-purpleBackground border-primaryYellow
    ${searchOpen ? 'translate-y-0' : 'translate-y-[-100%]'} transition-[transform] duration-500 ease-in-out`}
    >
      <div className="absolute top-4 right-4 flex justify-center items-center">
        <button
          className="w-[32px] h-[32px] md:w-[48px] md:h-[48px]"
          onClick={() => {
            setInputValue('')
            setSearchResults(null)
            dispatch(setOpenSearch(false))
          }}
          aria-label="Затвори търсенето"
          type="button"
        >
          <CloseCircle />
        </button>
      </div>
      <div className="w-full md:w-auto px-6 md:px-[unset] m-auto flex flex-col gap-m justify-center items-center py-4 md:py-10">
        <GenericImage
          src={'/Logo.png'}
          alt={'logo'}
          wrapperClassName="w-[80px] h-[80px] md:w-[120px] md:h-[120px] flex items-center justify-center relative"
          imageClassName="w-full h-full object-contain"
          fill={true}
        />

        <div className="flex flex-col md:flex-row gap-4 md:gap-[unset] justify-center items-start w-full">
          <input
            className="w-full md:min-w-[300px] h-[48px] xl:min-w-[400px] p-1 outline-none bg-transparent font-georgia font-[400] 
        text-[16px] xl:text-[18px] placeholder:font-georgia text-white placeholder:text-white/80 border-b-[1px] border-primaryYellow"
            type="text"
            placeholder="Потърси артикул.."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></input>

          <button
            className="w-full md:w-auto px-6 py-3 bg-primaryYellow font-georgia font-[400] text-black text-[16px] md:text-[18px] hover:bg-primaryYellow/80 transition-all duration-300 ease-in-out"
            onClick={() => handleSearch()}
            type="button"
            aria-label="Търсене"
            title="Търсене"
          >
            Търсене
          </button>
        </div>
      </div>

      <div
        className={`absolute top-full left-0 right-0 transition-[opacity] duration-700 ease-in-out bg-purpleBackground border-t-[1px] border-b-[1px] border-primaryYellow
          max-h-[600px] md:max-h-[700px] overflow-y-auto pb-20 md:pb-[unset]
            ${!!searchResults && searchResults.length > 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <GridBlog data={searchResults as Blog[]} />
      </div>

      {!!searchResults && searchResults.length === 0 && (
        <div className="border-t-[1px] border-primaryYellow w-full mt-8 py-4">
          <GenericParagraph
            fontStyle="font-georgia font-[400]"
            pType="regular"
            textColor="text-white"
            extraClass="w-full text-center"
          >
            Няма намерeни резултати
          </GenericParagraph>
        </div>
      )}
    </section>
  )
}

export default Search
