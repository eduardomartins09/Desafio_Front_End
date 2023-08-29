import { ResultsCep } from "@/types"

const SearchCepCard = ({ cep, bairro, logradouro, localidade, uf }: ResultsCep) => {
  return (
    <section className='border-2 border-light-gray rounded-md p-2'>
        <h3>Cep: {cep}</h3>
        {bairro && logradouro && (
            <>
                <h3>Bairro: {bairro}</h3>
                <h3>Logradouro: {logradouro}</h3>
            </>
        )}
        <h3>Cidade: {localidade}</h3>
        <h3>Estado: {uf}</h3>   
    </section>
  )
}

export default SearchCepCard