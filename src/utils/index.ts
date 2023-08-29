import axios from "axios"

export const navigation = [
    {
        link: "/",
        name: "HOME"
    },
    {
        link: "/buscaCep",
        name: "BUSCA CEP"
    },
    {
        link: "/contato",
        name: "CONTATO"
    },
]

export const iconUrlFromCode = (code: string) => `https://openweathermap.org/img/wn/${code}@2x.png`