import { useContext, useEffect, useState } from "react"
import { rolI } from "../interface/rolInterface"
import { eliminarRol, listarRol } from "../services/rolService"
import { FaEdit, FaTrash } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"
import { verificarPermisosPorRol } from "../../permisos/services/permisosApi"
import { PermisosI } from "../../permisos/interfaces/permisoInterface"
import { Permisos } from "../../permisos/components/modal/Permisos"
import { CrearRoles} from "../modal/CrearRoles"
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context"
import { EditarRoles } from "../modal/EditarRoles"
import { HttpStatus } from "../../core/enums/httStatusEnum"
import { alertaDeEliminacion } from "../../core/utils/alertaEliminacion"
import { permisosModulo } from "../../core/hooks/permisos"
import { PermisoE } from "../../core/enums/PermisosEnum"
import { ModulosE } from "../../core/enums/modulos.enum"
import { PermisosContext } from "../../autenticacion/context/permisos.context"

export const ListarRol = () => {
    const {token}= useContext(AutenticacionContext)
    const [roles, setroles] = useState<rolI[]>([])
    const [idRol, setIdRol] = useState<string>()
    const [rol, setRol]= useState<string>()
    const [recargar, setRecargar]= useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [verPermisos, setVerPermisos] = useState<PermisosI[]>([])
    const [isModalOpenPermisos, setIsModalOpenPermisos] = useState<boolean>(false)
      const  {permisos} =useContext(PermisosContext)
    useEffect(()=>{
        listarRoles()
    },[recargar])

    const closeModal=()=>{
      setIsModalOpen(false)
    }
    
    const listarRoles = async()=>{
            try {
               if(token){
                const response = await listarRol(token)  
                setroles(response)
               }
            } catch (error) {
                console.log(error);
                
            }
        }

      const PermisosHandle=async(id:string)=>{
        try {
          if(token){
            const response = await verificarPermisosPorRol(id,token)
            setVerPermisos(response)
          }
            setIsModalOpenPermisos(true)
        } catch (error) {
            
        }
      }  

    const editarRol =(id:string, rol:string) =>{
      setIdRol(id)
      setRol(rol)
      setIsModalOpen(true)
    }

    const eliminar = async(id:string)=>{
      try {
        if(token){
          const response =  await  eliminarRol(token, id)
          console.log(response);
          
          if(response.status == HttpStatus.OK){
            setRecargar(!recargar)
          }
        }
      } catch (error) {
        console.log(error);
        
      }
    }
  return (
<div className="overflow-x-auto shadow-lg rounded-lg ">
   {permisosModulo(permisos,ModulosE.ROL, PermisoE.CREAR) && <CrearRoles/> }
      <table className="min-w-full table-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Nombre</th>
            <th className="px-6 py-3 text-left">Accion</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {roles.map((item) => (
            <tr key={item._id} className="hover:bg-gray-100">
              <td className="px-6 py-4"> {item.nombre}</td>
    
              <td className="px-4 py-2 flex gap-2">
              {permisosModulo(permisos,ModulosE.ROL, PermisoE.ELIMINAR) &&    <button onClick={()=> alertaDeEliminacion(()=> eliminar(item._id))} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none flex items-center">
                  <FaTrash className="mr-2" />
                </button> }
                {permisosModulo(permisos,ModulosE.ROL, PermisoE.EDITAR) &&   <button  onClick={()=> editarRol(item._id, item.nombre)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none flex items-center">
                  <FaEdit className="mr-2" />
                </button> }

                <button onClick={()=>{
                    PermisosHandle(item._id)
                }} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none flex items-center">
                  <IoMdSettings  className="mr-2" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpenPermisos && <Permisos isModalOpen={isModalOpenPermisos} permisos={verPermisos} setIsModalOpen={setIsModalOpenPermisos}/>}
      {isModalOpen &&  idRol &&  rol && <EditarRoles  rol={rol} closeModal={closeModal} isOpen={isModalOpen} id={idRol}/>}
    </div>
  )
}
