import { useContext, useEffect, useState } from "react";
import { eliminarUsuario, listarUsuarios } from "../services/usuarioService";
import { UsuariosI } from "../interfaces/usuariosInterface";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { CrearUsuarios } from "../modal/CrearUsuarios";
import { HttpStatus } from "../../core/enums/httStatusEnum";
import { alertaDeEliminacion } from "../../core/utils/alertaEliminacion";
import { accionModal } from "../../core/hooks/accionModal";
import { EditarUsuarios } from "../modal/EditarUsuarios";
import { permisosModulo } from "../../core/hooks/permisos";
import { ModulosE } from "../../core/enums/modulos.enum";
import { PermisosContext } from "../../autenticacion/context/permisos.context";

export const ListarUsuarios = () => {

  const [usuarios, setUsuarios] = useState<UsuariosI[]>([]);
  const [idUsuario, setIdUsuario] = useState<string>();
  const [recargar, setRecargar] = useState<boolean>(false);
  const {closeModal,isOpen,setIsOpen }= accionModal()
  const {token}=useContext(AutenticacionContext)
  const  {permisos} =useContext(PermisosContext)
  useEffect(() => {
    listar();
  }, [recargar]);

  const listar = async () => {
    try {
      if(token){
        const response = await listarUsuarios(token);
        setUsuarios(response);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const eliminar = async(id:string)=>{
    try {
      if(token){
        const response = await  eliminarUsuario(token, id)
        if(response.status == HttpStatus.OK){
          setRecargar(!recargar)
        } 
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className="overflow-x-auto">
     <CrearUsuarios recargar={recargar} setRecargar={setRecargar}/> 
      {usuarios.length > 0 && (
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr className="text-left text-gray-600 bg-gray-100 border-b">
              <th className="py-3 px-4 font-medium ">CI</th>
              <th className="py-3 px-4 font-medium ">Nombre</th>
              <th className="py-3 px-4 font-medium ">Apellidos</th>
              <th className="py-3 px-4 font-medium ">Username</th>
              <th className="py-3 px-4 font-medium ">Celular</th>
              <th className="py-3 px-4 font-medium ">Rol</th>
              <th className="py-3 px-4 font-medium ">Accion</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {usuarios.map((usuario) => (
              <tr key={usuario._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-gray-800">
                  {usuario.ci}
                </td>
                <td className="py-2 px-4 text-gray-800">
                  {usuario.nombres}
                </td>
                <td className="py-2 px-4 text-gray-800">
                  {usuario.apellidos}
                </td>
                <td className="py-2 px-4 text-gray-800">
                  {usuario.username}
                </td>
                <td className="py-2 px-4  text-gray-800">
                  {usuario.celular}
                </td>

                <td className="py-2 px-4  text-gray-800">
                  {usuario.rolNombre}
                </td>
                <td className="py-2 px-4  text-gray-800 text-xl">
                {   permisosModulo(permisos,ModulosE.USUARIOS, 'EDITAR') &&     <button onClick={()=>{
                    setIdUsuario(usuario._id)
                    setIsOpen(true)
                  }}  className="text-blue-400">
                    <FaRegEdit />
                  </button> }


              { permisosModulo(permisos,ModulosE.USUARIOS, 'ELIMINAR')&& <button onClick={()=> alertaDeEliminacion(()=> eliminar(usuario._id))} className="text-red-500">
                    <AiFillDelete />
                  </button> }


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {idUsuario && isOpen && <EditarUsuarios closeModal={closeModal} id={idUsuario} isOpen={isOpen} recargar={recargar} setRecargar={setRecargar}/>}
    </div>
  );
};
