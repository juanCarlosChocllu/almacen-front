import { useContext, useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa'; 
import { listarEmpresa } from '../services/empresaApi';
import { empresaI } from '../interfaces/empresaInterface';
import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context';

export const TablaEmpresa = () => {
  const { token}= useContext(AutenticacionContext)
const [empresas, setEmpresas] = useState<empresaI[]>([])
    useEffect(()=>{
        const empresas =async()=>{
            try {
                if(token){
                  const response= await listarEmpresa(token)
                  setEmpresas(response)
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        empresas()
    },[])
  return (
    <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Empresa</h2>

    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 text-left ">Nombre</th>
            <th className="px-4 py-2 text-left ">Acción</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa) => (
            <tr key={empresa._id} className="hover:bg-gray-100">
              <td className="px-4 py-2 ">{empresa.nombre}</td>
              <td className="px-4 py-2  flex gap-2">
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
  </div>
  );
};
