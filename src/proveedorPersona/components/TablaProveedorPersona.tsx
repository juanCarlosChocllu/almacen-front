import { useEffect, useState } from 'react';
import { proveedorPersonaI } from '../interfaces/proveedorPersonaInterface';
import { proveedorPersonas } from '../services/proveedorPersonaApi';


export const TablaProveedorPersona = () => {
  const [proveedores, setProveedores] = useState<proveedorPersonaI[]>([]);


  const listarProveedoresPersona = async () => {
    try {
      const response = await proveedorPersonas();
      setProveedores(response);
    } catch (error) {
      console.error("Error fetching proveedores:", error);
    }
  };

  useEffect(() => {
    listarProveedoresPersona();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-md w-full">
    <h2 className="text-xl font-semibold mb-3">Información del Proveedor Persona</h2>
    <table className="min-w-full table-auto text-left border-collapse">
      <thead className="bg-gray-200 text-gray-700 text-sm">
        <tr>
          <th className="px-3 py-1">CI</th>
          <th className="px-3 py-1">Nombres</th>
          <th className="px-3 py-1">Apellidos</th>
          <th className="px-3 py-1">NIT</th>
          <th className="px-3 py-1">Correo</th>
          <th className="px-3 py-1">Ciudad</th>
          <th className="px-3 py-1">Dirección</th>
          <th className="px-3 py-1">Celular</th>
        </tr>
      </thead>
      <tbody>
        {proveedores.map((item) => (
          <tr
            key={item._id}
            className="bg-white hover:bg-gray-100 cursor-pointer transition-colors text-sm"
          >
            <td className="px-3 py-1">{item.ci}</td>
            <td className="px-3 py-1">{item.nombres}</td>
            <td className="px-3 py-1">{item.apellidos}</td>
            <td className="px-3 py-1">{item.nit}</td>
            <td className="px-3 py-1">{item.correo}</td>
            <td className="px-3 py-1">{item.ciudad}</td>
            <td className="px-3 py-1">{item.direccion}</td>
            <td className="px-3 py-1">{item.celular}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
};
