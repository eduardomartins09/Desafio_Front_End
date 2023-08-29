'use client'

import { ChangeEvent } from "react"

interface CustomTextAreaProps {
    value?: string
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
    name: string
    id: string
    containerStyles: string
    placeholder?: string
    rows: number
}

const CustomTextArea = ({ id, name, placeholder, rows, containerStyles, onChange, value }: CustomTextAreaProps) => {
  return (
    <textarea
        id={id}
        name={name}
        required
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
        className={containerStyles}
    />
  )
}

export default CustomTextArea