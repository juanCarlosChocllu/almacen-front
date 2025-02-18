import { useContext, useEffect, useState } from "react";
import { almacenSucursalI } from "../interfaces/almacenSucursalInterface";
import { listarAlmacenSucursal } from "../services/almacenSucursalApi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { FormAlmacenSucursal } from "./modal/FormAlmacenSucursal";

export const TablaAlmacenSucursal = () => {
  const [almacenes, setAlmacenes] = useState<almacenSucursalI[]>([]);
  const [recargarData, setRecargarData]=useState<boolean>(false)
  const {token}=useContext(AutenticacionContext)
  useEffect(() => {
    listraAlmacen();
  }, []);
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

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
      <FormAlmacenSucursal recargarData={recargarData} setRecargarData={setRecargarData}/>
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
    </div>
  );
};
