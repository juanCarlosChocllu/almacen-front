import React, { useContext, useEffect, useState } from 'react'
import { marcaI } from '../interfaces/marcaInterface';
import { listarMarcas } from '../service/marcaApi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context';
import { ItemsPorPagina } from '../../core/components/ItemsPorPagina';
import { Paginador } from '../../core/components/Paginador';
import { FormMarca } from '../modal/FormMarca';

export const TablaMarcas = () => {
      const {token}=useContext(AutenticacionContext)
      const [marcas, setMarca] = useState<marcaI[]>([]);   
      const [limite, setLimite]=useState<number>(20)
      const [pagina, setPagina]=useState<number>(1)
      const [paginas, setPaginas]=useState<number>(1)
      const [recargarData, setRecargarData] = useState<boolean>(false)
      useEffect(() => {
        listarM();
      }, [limite, pagina,recargarData]);
      const listarM = async () => {
        try {
          if(token){
            const response = await listarMarcas(token);
            setMarca(response.data);
            setPaginas(response.paginas)
          }
        } catch (error) {
          console.log(error);
        }
      };
  return (
     <div className="overflow-x-auto shadow-lg rounded-lg ">
    <FormMarca recargarData={recargarData} setRecargarData={setRecargarData}/>  
      <ItemsPorPagina page={setLimite}/> 
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Nombre</th>
                <th className="px-6 py-3 text-left">Accion</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {marcas.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4"> {item.nombre}</td>
    
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
          <Paginador paginaActual={pagina}  paginaSeleccionada={setPagina} paginas={paginas}/>
        </div>
  )
}
