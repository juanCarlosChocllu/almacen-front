import { FaTrash } from "react-icons/fa";
import { proveedorPersonaI } from "../../proveedorPersona/interfaces/proveedorPersonaInterface";

export const SelectProveedorPersona = ({ proveedor, eliminarProveedor }: { proveedor: proveedorPersonaI, eliminarProveedor: () => void }) => {
  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Información del Proveedor</h2>
      <table className="min-w-full table-auto text-left text-sm">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-2 py-1">CI</th>
            <th className="px-2 py-1">Nombres</th>
            <th className="px-2 py-1">Apellidos</th>
            <th className="px-2 py-1">NIT</th>
            <th className="px-2 py-1">Correo</th>
            <th className="px-2 py-1">Ciudad</th>
            <th className="px-2 py-1">Dirección</th>
            <th className="px-2 py-1">Celular</th>
            <th className="px-2 py-1">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr key={proveedor._id} className="bg-white hover:bg-gray-100 transition-colors">
            <td className="px-2 py-1">{proveedor.ci}</td>
            <td className="px-2 py-1">{proveedor.nombres}</td>
            <td className="px-2 py-1">{proveedor.apellidos}</td>
            <td className="px-2 py-1">{proveedor.nit}</td>
            <td className="px-2 py-1">{proveedor.correo}</td>
            <td className="px-2 py-1">{proveedor.ciudad}</td>
            <td className="px-2 py-1">{proveedor.direccion}</td>
            <td className="px-2 py-1">{proveedor.celular}</td>
            <td className="px-2 py-1">
              <button onClick={eliminarProveedor}>
                <FaTrash className="text-xs text-red-500 hover:text-red-700" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
