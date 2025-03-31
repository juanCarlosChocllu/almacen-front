import { useContext, useEffect, useState } from "react";
import { almacenSucursalI } from "../interfaces/almacenSucursalInterface";
import { eliminarAlmacenSucursal, listarAlmacenSucursal } from "../services/almacenSucursalService";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { CrearAlmacenSucursal } from "../modal/CrearAlmacenSucursal";
import { HttpStatus } from "../../core/enums/httStatusEnum";
import { alertaDeEliminacion } from "../../core/utils/alertaEliminacion";
import { EditarAlmacenSucursal } from "../modal/EditarAlmacenSucursal";
import { accionModal } from "../../core/hooks/accionModal";
import { permisosModulo } from "../../core/hooks/permisos";
import { ModulosE } from "../../core/enums/modulos.enum";
import { PermisoE } from "../../core/enums/PermisosEnum";
import { PermisosContext } from "../../autenticacion/context/permisos.context";

export const ListarAlmacenSucursal = () => {
  const [almacenes, setAlmacenes] = useState<almacenSucursalI[]>([]);
  const [recargarData, setRecargarData]=useState<boolean>(false)
  const {token}=useContext(AutenticacionContext)
  const [idAlmacen, setIdAlmacen]= useState<string>()
  const {closeModal,isOpen,setIsOpen}=accionModal()
  const  {permisos} =useContext(PermisosContext)
  useEffect(() => {
    listraAlmacen();
  }, [recargarData]);
  const listraAlmacen = async () => {
    try {
      if(token){
        const response = await listarAlmacenSucursal(token);  
      setAlmacenes(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const eliminar = async(id:string) =>{
    try {
      if(id && token){
        const response =await eliminarAlmacenSucursal(id, token)
        console.log(response);
        
        if(response.status == HttpStatus.OK){
          setRecargarData(!recargarData)
        }
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  const editar=(id:string)=> {
        setIdAlmacen(id)
        setIsOpen(true)
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
        { permisosModulo(permisos,ModulosE.ALMACEN_SUCURSAL, PermisoE.CREAR) &&   <CrearAlmacenSucursal recargar={recargarData} setRecargar={setRecargarData}/>}
      <table className="min-w-full table-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Nombre</th>
            <th className="px-6 py-3 text-left">Sucursal</th>
            <th className="px-6 py-3 text-left">Accion</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {almacenes.map((item) => (
            <tr key={item._id} className="hover:bg-gray-100">
              <td className="px-6 py-4"> {item.nombre}</td>
              <td className="px-6 py-4">{item.sucursal}</td>
              <td className="px-4 py-2 flex gap-2">
              { permisosModulo(permisos,ModulosE.ALMACEN_SUCURSAL, PermisoE.ELIMINAR) &&   <button onClick={()=> alertaDeEliminacion(()=> eliminar(item._id))} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none flex items-center">
                  <FaTrash className="mr-2" />
                </button> }
                { permisosModulo(permisos,ModulosE.ALMACEN_SUCURSAL, PermisoE.ELIMINAR) &&    <button  onClick={()=>editar(item._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none flex items-center">
                  <FaEdit className="mr-2" />
                </button> }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen && idAlmacen && <EditarAlmacenSucursal closeModal={closeModal} id={idAlmacen} isOpen={isOpen} recargar={recargarData} setRecargar={setRecargarData}/>}
    </div>
  );
};



