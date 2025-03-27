import { useContext, useEffect, useState } from "react";
import { listarUsuarios } from "../services/usuariosApi";
import { UsuariosI } from "../interfaces/usuariosInterface";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { FormUsuarios } from "../modal/FormUsuarios";

export const TablaUsuarios = () => {
  const {token}=useContext(AutenticacionContext)
  const [usuarios, setUsuarios] = useState<UsuariosI[]>([]);
  const [recargarData, setRecargarData] = useState<boolean>(false);
  useEffect(() => {
    listar();
  }, [recargarData]);

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
  return (
    <div className="overflow-x-auto">
     <FormUsuarios recargarData={recargarData} setRecargarData={setRecargarData}/> 
      {usuarios.length > 0 && (
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr className="text-left text-gray-600 bg-gray-100 border-b">
              <th className="py-3 px-4 font-medium text-xs">CI</th>
              <th className="py-3 px-4 font-medium text-xs">Nombre</th>
              <th className="py-3 px-4 font-medium text-xs">Apellidos</th>
              <th className="py-3 px-4 font-medium text-xs">Username</th>
              <th className="py-3 px-4 font-medium text-xs">Celular</th>
              <th className="py-3 px-4 font-medium text-xs">Rol</th>
              <th className="py-3 px-4 font-medium text-xs">Accion</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {usuarios.map((usuario) => (
              <tr key={usuario._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-xs text-gray-800">
                  {usuario.ci}
                </td>
                <td className="py-2 px-4 text-xs text-gray-800">
                  {usuario.nombres}
                </td>
                <td className="py-2 px-4 text-xs text-gray-800">
                  {usuario.apellidos}
                </td>
                <td className="py-2 px-4 text-xs text-gray-800">
                  {usuario.username}
                </td>
                <td className="py-2 px-4 text-xs text-gray-800">
                  {usuario.celular}
                </td>

                <td className="py-2 px-4 text-xs text-gray-800">
                  {usuario.rolNombre}
                </td>
                <td className="py-2 px-4 text-xs text-gray-800">
                  <button className="text-blue-400">
                    <FaRegEdit />
                  </button>{" "}
                  <button className="text-red-500">
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
