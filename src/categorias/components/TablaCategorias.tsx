import { useContext, useEffect, useState } from "react";
import { categoriasI } from "../interfaces/categoriasInterface";
import { listarCategorias } from "../service/categoriasApi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";

export const TablaCategorias = () => {
  const {token}=useContext(AutenticacionContext)
  const [categorias, setCategorias] = useState<categoriasI[]>([]);

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
  }, []);

  return (
<div>
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
            <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none flex items-center ">
              <FaTrash className="mr-1" />
            </button>
            <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none flex items-center">
              <FaEdit className="mr-1" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  
  );
};
