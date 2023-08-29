'use client'

import axios from 'axios'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ResultsCep } from '@/types'

import CustomButton from "../../GlobalComponents/CustomButton/CustomButton"
import CustomInput from '../../GlobalComponents/CustomInput/CustomInput'
import CustomLabel from '@/components/GlobalComponents/CustomLabel/CustomLabel'
import SearchCepCard from '../SearchCepCard/SearchCepCard'

interface StateResponse {
    sigla: string
    nome: string
}
  
interface CityResponse {
    id: number
    nome: string
}

const SearchCepForm = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<ResultsCep[]>([])
    
  const [states, setStates] = useState<StateResponse[]>([])
  const [cities, setCities] = useState<CityResponse[]>([])

  const [selectedState, setSelectedState] = useState("0")
  const [selectedCity, setSelectedCity] = useState<string>("")

  const [messageResults, setMessageResults] = useState("")

  const fetchCities = async () => {
    try {
        if (selectedState === "0") {
            return
        }

        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`)
        setCities(response.data)
    } catch (error) {
        toast.error(`Erro ao buscar cidades: ${error}`)
    }
  }

  useEffect(() => {
    fetchCities()
  }, [selectedState])
  
  const fetchStates = async () => {
    try {
      const response = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
      setStates(response.data)
    } catch (error) {
        toast.error(`Erro ao buscar estados: ${error}`)
    }
  }

  useEffect(() => {
    fetchStates()
  }, [])
  
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault()

    if (selectedState === "0" || selectedCity === "") {
      toast.error("Você não selecionou o estado e/ou cidade")
      return
    }

    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${selectedState}/${selectedCity}/${searchQuery}/json/`
      )

      setSearchResults(response.data)

      if (response.data[0]?.bairro === "") {
        setMessageResults(
          "Não foi possível encontrar o endereço completo. Apenas o CEP da cidade foi encontrado:"
        )
      } else {
        setMessageResults("Resultados:")
      }

      setSelectedState("0")
      setSearchQuery("")
      setSelectedCity("")
    } catch (error) {
      toast.error("Ocorreu um erro ao buscar o CEP.")
    }
  }

  const handleSelectUf = (event: ChangeEvent<HTMLSelectElement>) => {
    const uf = event.target.value
    setSelectedState(uf)
  }

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value
    setSelectedCity(city)
  }

  return (
    <section className={`bg-white px-8 py-6 rounded-lg ${searchResults.length > 0 ? 'grid md:divide-x-2 gap-4 md:grid-cols-2' : ''}`}>
        <div>
            <h1 className="text-center text-2xl font-bold mb-3">Buscar CEP</h1>
            <form onSubmit={handleSearch} className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <CustomLabel 
                        htmlFor="nomeRua"
                        labelStyles="text-xl font-semibold text-gray-600"
                        title="Digite o nome da sua rua"
                    />
                    <CustomInput
                        type="text" 
                        id="nomeRua" 
                        name="nomeRua" 
                        placeholder="Rua" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}
                        containerStyles={`bg-[#F4F4F4] px-2 py-1`} 
                    />
                </div>      
                <div>
                    <div>
                        <h2 className="text-center text-xl font-bold my-3">Selecione seu estado e cidade</h2>
                        <div className='flex flex-col gap-1'>
                            <CustomLabel 
                                htmlFor="states"
                                labelStyles="text-lg font-semibold"
                                title="Estado:"
                            />
                            <select name="states" id="states" value={selectedState} onChange={handleSelectUf} className='py-1 border-2 border-gray-700 outline-none'>
                            <option value="0">Selecione um estado</option>
                            {states.map((states) => (
                                <option key={states.sigla} value={states.sigla}>{states.nome}</option>
                            ))}
                            </select>
                        </div>
                        {selectedState !== "0" && (
                            <div className='flex flex-col gap-1 mt-2'>
                                <CustomLabel 
                                  htmlFor="cidade"
                                  labelStyles="text-lg font-semibold"
                                  title="Cidade:"
                                />
                                <select name="cidade" id="cidade" value={selectedCity} onChange={handleSelectCity} className='py-1 border-2 border-gray-700 outline-none'>
                                    <option value="0">Selecione uma cidade</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.nome}>
                                            {city.nome}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        )}
                    </div>              
                </div>
                <CustomButton
                    btnType="submit"
                    containerStyles={`my-2 bg-[#F4F4F4] font-semibold border-2 border-gray-700 p-2 text-lg rounded-md w-full hover:bg-white`}
                    title="Pesquisar"
                />
            </form>
        </div>
        {searchResults.length > 0 && (
            <div className='md:px-4'>
                <h2 className='font-semibold text-lg'>{messageResults}</h2>
                <div className='max-h-[300px] overflow-auto mt-2 flex flex-col gap-4'>
                    {searchResults.map((results, idx) => (
                        <SearchCepCard key={idx} bairro={results.bairro} cep={results.cep} localidade={results.localidade} logradouro={results.logradouro} uf={results.uf} />
                    ))}
                </div>
            </div>
        )}    
        <ToastContainer />
    </section>
  )
}

export default SearchCepForm