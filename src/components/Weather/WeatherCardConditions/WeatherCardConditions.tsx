import { MdThermostat, MdBrightnessHigh, MdOutlineAir, MdSpeed } from 'react-icons/md'

interface WeatherCardConditionsProps {
    sensacao: number
    humidade: number
    vento: number
    pressao: number
    units: string
}

const WeatherCardConditions = ({ sensacao, humidade, vento, pressao, units }: WeatherCardConditionsProps) => {
  return (
    <ul className='grid sm:grid-cols-2 gap-0.5'>
        <li className='flex items-center gap-0.5'>
            <span className='text-gray-700'><MdThermostat size={25} /></span>
            <span className='text-lg'>Sensação: {sensacao}°{units === "metric" ? 'C' : "F"}</span>
        </li>
        <li className='flex items-center gap-2'>
            <span className='text-gray-700'><MdBrightnessHigh size={25} /></span>
            <span className='text-lg'>Humidade: {humidade}%</span>
        </li>
        <li className='flex items-center gap-2'>
            <span className='text-gray-700'><MdOutlineAir size={25} /></span>
            <span className='text-lg'>Vento: {vento} km/h</span>
        </li>
        <li className='flex items-center gap-2'>
            <span className='text-gray-700'><MdSpeed size={25} /></span>
            <span className='text-lg'>Pressão: {pressao} hPa</span>
        </li>
    </ul>  
    )
}

export default WeatherCardConditions