import { useEffect, useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { subCategoriaI } from "../interfaces/subCategoriaInterface"
import { listarSubCategoria } from "../services/subCategoriasApi"


export const TablaSubCategorias = () => {
    const [subCategorias , setSubCategorias] =useState<subCategoriaI[]>([])
    const sudCategorias=async()=>{
        try {
            const response = await listarSubCategoria()
            console.log(response);
            
            setSubCategorias(response)
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        sudCategorias()
    },[])
  return (
<div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Nombre</th>
            <th className="px-6 py-3 text-left">Categoria</th>
            <th className="px-6 py-3 text-left">Accion</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {subCategorias.map((item) => (
            <tr key={item._id} className="hover:bg-gray-100">
              <td className="px-6 py-4"> {item.nombre}</td>
              <td className="px-6 py-4">{item.categoria}</td>
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

