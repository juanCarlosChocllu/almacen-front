import { useContext, useEffect, useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { subCategoriaI } from "../interfaces/subCategoriaInterface"
import { eliminarSubCategoria, listarSubCategoria } from "../services/subCategoriasApi"
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context"
import { CrearSubCategorias } from "../modal/CrearSubCategorias"
import { HttpStatus } from "../../core/enums/httStatusEnum"
import { alertaDeEliminacion } from "../../core/utils/alertaEliminacion"
import { accionModal } from "../../core/hooks/accionModal"
import { EditarSubCategorias } from "../modal/EditarSubCategorias"
import { permisosModulo } from "../../core/hooks/permisos"
import { ModulosE } from "../../core/enums/modulos.enum"
import { PermisoE } from "../../core/enums/PermisosEnum"
import { PermisosContext } from "../../autenticacion/context/permisos.context"


export const ListarSubCategorias = () => {
    const {token}=useContext(AutenticacionContext)
    const [subCategorias , setSubCategorias] =useState<subCategoriaI[]>([])
    const [recargar, setRecargar]=useState<boolean>(false)
    const [idSudCategoria, setIdSubCategoria] = useState<string>()
    const [idCategoria, setIdCategoria] = useState<string>()
    const [subCategoria,setSubCategoria ]=useState<string>()
    const {closeModal,setIsOpen,isOpen} = accionModal()
       const  {permisos} =useContext(PermisosContext)
    const sudCategorias=async()=>{
        try {
           if(token){
            const response = await listarSubCategoria(token)            
            setSubCategorias(response)
           }
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        sudCategorias()
    },[recargar])

    const eliminar = async(id:string)=> {
      try { 
      if(token){
        const response  = await eliminarSubCategoria(id,token)
        if(response.status == HttpStatus.OK) {
          setRecargar(!recargar)
        } 
      }
        
      } catch (error) {
         console.log(error);
         
      }
    }
    

  return (
<div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
      { permisosModulo(permisos,ModulosE.CATEGORIAS, PermisoE.CREAR) && <CrearSubCategorias  recargar={recargar} setRecargar={setRecargar}/> }
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
              { permisosModulo(permisos,ModulosE.CATEGORIAS, PermisoE.ELIMINAR) && <button onClick={()=> alertaDeEliminacion(()=> eliminar(item._id))} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none flex items-center">
                  <FaTrash className="mr-2" />
                </button> }
                { permisosModulo(permisos,ModulosE.CATEGORIAS, PermisoE.EDITAR) &&    <button  onClick={()=>{
                  setIdSubCategoria(item._id)
                  setIdCategoria(item.idCategoria)
                  setSubCategoria(item.nombre)
                  setIsOpen(true)
                }} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none flex items-center">
                  <FaEdit className="mr-2" />
                </button> }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen &&  
       subCategoria && 
      idCategoria && 
      idSudCategoria &&
      <EditarSubCategorias isOpen={isOpen} categoriaNombre={subCategoria} 
       closeModal={closeModal} idCategoria ={idCategoria} 
       idSudCategoria={idSudCategoria}
       recargar={recargar}
       setRecargar={setRecargar}
       />}
    </div>
  )
}

