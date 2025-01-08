import { useContext, useEffect, useState } from 'react';
import { proveedorEmpresas } from '../../services/proveedorEmpresaApi';
import { proveedorEmpresaI } from '../../interface/proveedorEmpresaInterface';
import { AutenticacionContext } from '../../../autenticacion/context/crear.autenticacion.context';

export const ListarProveedorEmpresa = ({ proveedorEmpresa }: { proveedorEmpresa: (proveedor: proveedorEmpresaI) => void }) => {
  const [proveedores, setProveedores] = useState<proveedorEmpresaI[]>([]);
 const {token}=useContext(AutenticacionContext)
  const listarProveedoresEmpresa = async () => {
    try {
      if(token){
        const response = await proveedorEmpresas(token);
        setProveedores(response);
      }
    } catch (error) {
      console.error("Error fetching proveedores:", error);
    }
  };

  useEffect(() => {
    listarProveedoresEmpresa();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-3">Lista de Proveedores de Empresa</h2>
      <table className="min-w-full table-auto text-left border-collapse">
        <thead className="bg-gray-200 text-gray-700 text-sm">
          <tr>
            <th className="px-3 py-1">Empresa</th>
            <th className="px-3 py-1">Nit</th>
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
              onClick={() => {
                const proveedorSeleccionado: proveedorEmpresaI = {
                  _id: item._id,
                  celular: item.celular,
                  ciudad: item.ciudad,
                  correo: item.correo,
                  direccion: item.direccion,
                  nit: item.nit,
                  nombre: item.nombre
                };
                proveedorEmpresa(proveedorSeleccionado);
              }}
            >
              <td className="px-3 py-1">{item.nombre}</td>
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
