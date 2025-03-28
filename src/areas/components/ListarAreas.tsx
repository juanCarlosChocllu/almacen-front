import { useContext, useEffect, useState } from "react";

import { FaEdit, FaTrash } from "react-icons/fa";
import { areasI } from "../interfaces/areasInterface";
import { eliminarArea, listarAreas } from "../service/areasService";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { CrearAreas } from "../modal/CrearAreas";
import { HttpStatus } from "../../core/enums/httStatusEnum";
import { alertaDeEliminacion } from "../../core/utils/alertaEliminacion";
import { EditarAreas } from "../modal/EditarAreaModal";
import { accionModal } from "../../core/hooks/accionModal";

export const ListarAreas = () => {
  const [recargarData, setRecargarData] = useState<boolean>(false)
  const {token}= useContext(AutenticacionContext)
  const [areas, setAreas] = useState<areasI[]>([]);

  const [idArea, setIdArea] = useState<string>();
  const [area, setArea] = useState<string>();
  const { closeModal,isOpen,setIsOpen}=accionModal()
  useEffect(() => {
    listraAreas();
  }, [recargarData]);
  const listraAreas = async () => {
    try {
      if(token){
        const response = await listarAreas(token);

        setAreas(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const eliminar = async (id:string)=> {
    try {
     if(token){
      const response = await eliminarArea(id, token)
      if(response.status == HttpStatus.OK) {
        setRecargarData(!recargarData)
      }
     }
    } catch (error) {
      console.log(error);
      
    }
  }

  const editar=(id:string, nombre:string)=>{
    setIdArea(id),
    setArea(nombre)
    setIsOpen(true)
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
          <CrearAreas recargar={recargarData} setRecargar={setRecargarData}/>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Nombre</th>
            <th className="px-6 py-3 text-left">Accion</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {areas.map((item) => (
            <tr key={item._id} className="hover:bg-gray-100">
              <td className="px-6 py-4"> {item.nombre}</td>

              <td className="px-4 py-2 flex gap-2">
                <button onClick={()=>alertaDeEliminacion(()=> eliminar(item._id))} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none flex items-center">
                  <FaTrash className="mr-2" />
                </button>
                <button onClick={()=> editar(item._id, item.nombre)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none flex items-center">
                  <FaEdit className="mr-2" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen && idArea && area && <EditarAreas closeModal={closeModal} idArea={idArea} isOpen={isOpen} nombre={area} recargar={recargarData}  setRecargar={setRecargarData}/>}
    </div>
  );
};
