'use client'

import axios from 'axios'
import Image from 'next/image'

import { useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Weather } from '@/types'

import WeatherSearchBar from '../WeatherSearchBar/WeatherSearchBar'
import WeatherCardConditions from '../WeatherCardConditions/WeatherCardConditions'

const WeatherCardCenter = () => {
  const [query, setQuery] = useState({ lat: 0, lon: 0 })
  const [city, setCity] = useState('')
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric')
  const [weather, setWeather] = useState<Weather | null>(null)
 
  const fetchWeather = async (url: string) => {
    try {
        const response = await axios.get(url)
        setWeather(response.data)
    } catch (error) {
        toast.error("Você digitou o nome errado, essa cidade não foi encontrada")
    } 
  }
  
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        setQuery({ lat, lon })
      })
    }
  }
  
  useEffect(() => {
    if (city) {
      handleFetchWeatherByName()
    } else {
      handleGetLocation()
      fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=${units}`)
    }
  }, [query.lat, query.lon, units])

  const handleFetchWeatherByName = () => {
    const cityName = city || 'london'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    fetchWeather(url)
  }

  return (
    <section className='bg-[#202B3B] text-white px-8 py-6 rounded-md'>
        <WeatherSearchBar 
            value={city} 
            onChangeInput={(e) => setCity(e.target.value)} 
            onClickLocation={() => fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=${units}`)} 
            onClickSearch={handleFetchWeatherByName} 
        />
        {weather && (
            <>
                <div className='flex items-center justify-between'>
                    <div>
                        <Image src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} width={120} height={120} alt='icon-climate' />
                    </div>
                    <div>
                        <h2 className='text-2xl sm:text-3xl'>{weather.name}</h2>
                        <div className='flex flex-col items-center justify-center gap-1'>
                            <span className='text-xl sm:text-2xl'>{Math.floor(weather.main.temp)}°{units === "metric" ? 'C' : "F"}</span>
                            <div className='flex items-center gap-2'>
                                <span className='text-sm cursor-pointer' onClick={() => setUnits("metric")}>°C</span>
                                <span>|</span>
                                <span className='text-sm cursor-pointer' onClick={() => setUnits("imperial")}>°F</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-3'>
                    <WeatherCardConditions 
                        sensacao={Math.floor(weather.main.feels_like)} 
                        humidade={weather.main.humidity}
                        vento={weather.wind.speed}
                        pressao={weather.main.pressure}
                        units={units}
                    />
                </div>
            </>
        )}
        <ToastContainer />
    </section>
  )
}

export default WeatherCardCenter