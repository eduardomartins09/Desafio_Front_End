'use client'

import { ChangeEvent, FormEvent, useState } from "react"

import CustomInput from "../GlobalComponents/CustomInput/CustomInput"
import CustomButton from "../GlobalComponents/CustomButton/CustomButton"
import CustomTextArea from "../GlobalComponents/CustomTextArea/CustomTextArea"
import CustomLabel from "../GlobalComponents/CustomLabel/CustomLabel"

interface FormData {
    name: string
    email: string
    message: string
    file: File | null
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    file: null,
  })
    
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Dados do formulário:', formData)
    return null
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile && selectedFile.type === "application/pdf") {
        setFormData({ ...formData, file: selectedFile })
    }
  }

  return (
    <section className="bg-white px-8 py-6 rounded-lg">
        <h1 className="text-center text-2xl font-bold mb-3">Entre em contato com a gente</h1>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
                <CustomLabel 
                    htmlFor="nome"
                    labelStyles="text-xl font-semibold text-gray-600"
                    title="Nome"
                />
                <CustomInput 
                    type="text" 
                    id="nome" 
                    name="nome" 
                    placeholder="Nome" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    containerStyles={`bg-[#F4F4F4] px-2 py-1`} 
                />
            </div>
            <div className="flex flex-col gap-1">
                <CustomLabel 
                    htmlFor="email"
                    labelStyles="text-xl font-semibold text-gray-600"
                    title="Email"
                />
                <CustomInput 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    containerStyles={`bg-[#F4F4F4] px-2 py-1`} 
                />
            </div>
            <div className="flex flex-col gap-1">
                <CustomLabel 
                    htmlFor="msg"
                    labelStyles="text-xl font-semibold text-gray-600"
                    title="Mensagem"
                />
                <CustomTextArea 
                    id="msg"
                    name="msg"
                    placeholder="Mensagem"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    containerStyles={`bg-[#F4F4F4] px-2 outline-none rounded-md`}
                />
            </div>
            <div className="flex flex-col gap-1">
                <CustomLabel 
                    htmlFor="file"
                    labelStyles="text-xl font-semibold text-gray-600"
                    title="Insira um arquivo"
                />
                <CustomInput 
                    type="file" 
                    id="file" 
                    name="file"                     
                    onChange={handleFileChange} 
                    accept=".pdf"
                    containerStyles={`py-1`} 
                />
            </div>
            <CustomButton 
                btnType="submit"
                containerStyles={`my-2 bg-[#F4F4F4] font-semibold border-2 border-gray-700 p-2 text-lg rounded-md w-full hover:bg-white`}
                title="Enviar"
            />
        </form>
    </section>
  )
}

export default ContactForm