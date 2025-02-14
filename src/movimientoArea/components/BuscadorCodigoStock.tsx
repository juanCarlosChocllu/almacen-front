import { useForm } from "react-hook-form"
import { BuscadorCodigoStockI } from "../interfaces/buscadorCodigoStock"


export const BuscadorCodigoStock = ({onsubmit}:{onsubmit:(data:BuscadorCodigoStockI)=> void}) => {


  const {register, handleSubmit,}= useForm<BuscadorCodigoStockI>()

  return (
    <div>
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="flex space-x-4">
        <div>
          <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código</label>
          <input 
          {...register('codigo')}
          type="text" id="codigo" placeholder="Código" className="w-48 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
        </div>
        <div>
          <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
          <input  {...register('fechaInicio')} type="date" id="fechaInicio" className="w-48 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700">Fecha Fin</label>
          <input type="date"  {...register('fechaFin')} id="fechaFin" className="w-48 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <button type="submit" className="w-48 bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-5 ">
            Buscar
          </button>
        </div>
      </div>
    </form>
  </div>
  
  
  
  )
}

