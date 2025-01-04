import { useContext, useEffect, useState } from "react"
import { almacenAreaI } from "../interfaces/almacenAreaInterface"
import { listarAlmacenArea } from "../services/almacenAreaApi"
import { FaEdit, FaTrash } from "react-icons/fa"
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context"

export const TablaAlmacenArea = () => {
  const {token}=useContext(AutenticacionContext)
    const [almacenArea, setAlmacenArea] = useState<almacenAreaI[]>([])

    useEffect(()=>{
        listaDeAlmacenArea()
    },[token])

    const listaDeAlmacenArea=async()=>{
        try {
           if(token){
            const response = await listarAlmacenArea(token)
            setAlmacenArea(response)
           }
        } catch (error) {
            
        }

    }

    
  return (
<div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Nombre</th>
            <th className="px-6 py-3 text-left">Area</th>
            <th className="px-6 py-3 text-left">Accion</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {almacenArea.map((item) => (
            <tr key={item._id} className="hover:bg-gray-100">
              <td className="px-6 py-4"> {item.nombre}</td>
              <td className="px-6 py-4">{item.nombreArea}</td>
              <td className="px-4 py-2 flex gap-2">
                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none flex items-center">
                  <FaTrash className="mr-2" />
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none flex items-center">
                  <FaEdit className="mr-2" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
