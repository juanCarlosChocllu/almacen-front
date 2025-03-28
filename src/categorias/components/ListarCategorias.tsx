import { useContext, useEffect, useState } from "react";
import { categoriasI } from "../interfaces/categoriasInterface";
import { eliminarCategoria, listarCategorias } from "../service/categoriasService";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { CrearCategorias } from "../modal/CrearCategorias";
import { alertaDeEliminacion } from "../../core/utils/alertaEliminacion";
import { HttpStatus } from "../../core/enums/httStatusEnum";
import { EditarCategorias } from "../modal/EditarCategoria";
import { accionModal } from "../../core/hooks/accionModal";

export const ListarCategorias = () => {
   const [recargarData, setRecargarData] = useState<boolean>(false)
  const {token}=useContext(AutenticacionContext)
  const [categorias, setCategorias] = useState<categoriasI[]>([]);
  const [idCategoria, setIdCategoria] = useState<string>();
  const [categoria, setCategoria] = useState<string>();
  const {closeModal,isOpen,setIsOpen}=accionModal()

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        if(token){
          const response: categoriasI[] = await listarCategorias(token);
          setCategorias(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCategorias();
  }, [recargarData]);

    const eliminar = async (id:string)=>{
      try {
        if(token) {
          const response = await eliminarCategoria(id, token)
          if(response.status == HttpStatus.OK) {
            setRecargarData(!recargarData)
          }
        }
      } catch (error) {
        console.log( error);
        
      }
    }
  return (
<div>
  <CrearCategorias recargar={recargarData} setRecargar={setRecargarData}/>
  <table className="w-full table-auto border-collapse border border-gray-300 shadow-md rounded-md overflow-hidden mx-auto">
    <thead>
      <tr className="bg-gray-800 text-white">
        <th className="px-3 py-2">Categoría</th>
        <th className="px-3 py-2">Acción</th>
      </tr>
    </thead>
    <tbody>
      {categorias.map((item) => (
        <tr className="hover:bg-gray-50" key={item._id}>
          <td className="px-3 py-2 text-center">{item.nombre}</td>
          <td className="px-3 py-2 flex gap-2 justify-center">
            <button onClick={()=> alertaDeEliminacion(()=> eliminar(item._id))} className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none flex items-center ">
              <FaTrash className="mr-1" />
            </button>
            <button  onClick={()=>{
              setIdCategoria(item._id)
              setCategoria(item.nombre)
              setIsOpen(true)
            }}  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none flex items-center">
              <FaEdit className="mr-1" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  {isOpen && categoria && idCategoria &&
   <EditarCategorias categoria={categoria} 
   closeModal={closeModal} 
   idCategoria={idCategoria} 
   isOpen={isOpen}
   recargar={recargarData}
   setRecargar={setRecargarData}
   />}
</div>

  
  );
};
