export interface ResultsCep {
    bairro: string
    cep: string
    localidade: string
    logradouro: string
    uf: string
}

interface WeatherMain {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
}
  
interface WeatherWind {
    speed: number
}
  
export interface Weather {
    name: string
    main: WeatherMain
    wind: WeatherWind
    weather: {
        icon: string
    }[]
}