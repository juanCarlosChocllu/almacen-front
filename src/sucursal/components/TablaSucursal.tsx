import { FaTrash, FaEdit } from "react-icons/fa";
import { sucursalI } from "../interface/sucursalInterface";
import { useEffect, useState } from "react";
import { listarSucursal } from "../services/sucursalApi";
export const TablaSucursal = () => {
  const [sucursales, setSucursales] = useState<sucursalI[]>([]);
  useEffect(() => {
    listarScursales();
  }, []);

  const listarScursales = async () => {
    try {
      const response = await listarSucursal();
      setSucursales(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Sucursales</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left  ">Nombre</th>
              <th className="px-4 py-2 text-left ">Empresa</th>
              <th className="px-4 py-2 text-left ">Acción</th>
            </tr>
          </thead>
          <tbody>
            {sucursales.map((sucursal) => (
              <tr key={sucursal._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 ">{sucursal.nombre}</td>
                <td className="px-4 py-2 ">{sucursal.empresa}</td>
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
    </div>
  );
};
