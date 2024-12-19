import { FaTrash } from 'react-icons/fa';
import { productoI } from '../../productos/interface/productoInterface';

export const SelectProducto = ({ producto, eliminar }: { producto: productoI, eliminar: () => void }) => {    
  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Información del Producto</h2>
      <table className="min-w-full table-auto text-left max-w-screen-lg text-sm">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-2 py-1">Código</th>
            <th className="px-2 py-1">Cód. barra</th>
            <th className="px-2 py-1">Nombre</th>
            <th className="px-2 py-1">Descripción</th>
            <th className="px-2 py-1">Color</th>
            <th className="px-2 py-1">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr key={producto._id} className="bg-white hover:bg-gray-100 transition-colors">
            <td className="px-2 py-1">{producto.codigo}</td>
            <td className="px-2 py-1">{producto.codigoBarra}</td>
            <td className="px-2 py-1">{producto.nombre}</td>
            <td className="px-2 py-1">{producto.descripcion}</td>
            <td className="px-2 py-1">{producto.color}</td>
            <td className="px-2 py-1">
              <button 
                onClick={eliminar} 
                className="text-xs text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
