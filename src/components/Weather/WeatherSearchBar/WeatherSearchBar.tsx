'use client'

import { ChangeEvent } from 'react'

import { FaSearch } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'

import CustomInput from '@/components/GlobalComponents/CustomInput/CustomInput'

interface WeatherSearchProps {
  value: string
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void
  onClickSearch: () => void
  onClickLocation: () => void
}

const WeatherSearchBar = ({ value, onChangeInput, onClickSearch, onClickLocation }: WeatherSearchProps) => {
  return (
    <section className='flex items-center justify-between mb-3'>
      <CustomInput
        type="text" 
        id="cidade" 
        name="cidade" 
        placeholder="Pesquisar cidade..." 
        value={value} 
        onChange={onChangeInput} 
        containerStyles={`px-2 py-1 rounded-md bg-gray-700 outline-none max-w-[170px] sm:max-w-full`} 
      />
      <div className='flex items-center gap-4 ml-4'>
        <button onClick={onClickSearch}>
            <FaSearch size={18} />
        </button>
        <button onClick={onClickLocation}>
            <MdLocationOn size={22} />
        </button>
      </div>
    </section>
  )
}

export default WeatherSearchBar