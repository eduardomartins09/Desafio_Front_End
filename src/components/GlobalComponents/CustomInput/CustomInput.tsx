'use client'

import { ChangeEvent } from "react"

interface InputProps {
    type: "text" | "file" | "email"
    value?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    name: string
    id: string
    containerStyles: string
    placeholder?: string
    accept?: string
}

const CustomInput = ({ type, value, onChange, name, id, placeholder, accept, containerStyles }: InputProps) => {
  return (
    <input 
        type={type} 
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        placeholder={placeholder}
        className={`w-full outline-none rounded-md ${containerStyles}`}
        accept={accept}
        required
    />
  )
}

export default CustomInput

