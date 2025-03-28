import { useContext, useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa'; 
import { eliminarEmpresa, listarEmpresa } from '../services/empresaApi';
import { empresaI } from '../interfaces/empresaInterface';
import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context';
import { CrearEmpresa} from '../modal/CrearEmpresa';
import { EditarEmpresa } from '../modal/EditarEmpresa';
import { HttpStatus } from '../../core/enums/httStatusEnum';
import { alertaDeEliminacion } from '../../core/utils/alertaEliminacion';
import { accionModal } from '../../core/hooks/accionModal';

export const ListarEmpresa = () => {
  const { token}= useContext(AutenticacionContext)
  const [cargarData, setCargarData]=useState<boolean>(false)
  const [empresas, setEmpresas] = useState<empresaI[]>([])
  const [idEmpresa, setIdEmpresa]=useState<string>()
  const [empresa, setEmpresa]=useState<string>()
  const  {closeModal, isOpen, setIsOpen}=accionModal()
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
    },[cargarData])

    const eliminar =async (id:string) =>{ 
      try {
       if(token && id) {
        const response = await eliminarEmpresa(token, id)
        if(response.status == HttpStatus.OK) {
          setCargarData(!cargarData)
        }
       }
      } catch (error) {
        
      }

    }

  return (
    <div className="p-4">
    <CrearEmpresa setCargarData={setCargarData} cargarData={cargarData}/>  
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
                <button onClick={()=> alertaDeEliminacion(()=>eliminar(empresa._id))} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none flex items-center">
                  <FaTrash className="mr-2" />
     
                </button>
                <button onClick={()=> {
                  setIdEmpresa(empresa._id)
                  setEmpresa(empresa.nombre)
                  setIsOpen(true)
                }} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none flex items-center">
                  <FaEdit className="mr-2" />
      
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {isOpen && empresa && idEmpresa && <EditarEmpresa  empresa={empresa} closeModal={closeModal} idEmpresa={idEmpresa} isOpen={isOpen} recargar={cargarData} setRecargar={setCargarData} />}
  </div>
  );
};
