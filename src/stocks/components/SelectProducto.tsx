import { FaTrash } from 'react-icons/fa';
import { productoI } from '../../productos/interface/productoInterface';

export const SelectProducto = ({ producto, eliminar }: { producto: productoI, eliminar: () => void }) => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Información del Producto</h2>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <table className="min-w-full table-auto border-collapse">
        
          <tbody>
            <tr className="border-b">
              <td className="px-2 py-1 text-sm font-semibold">Código</td>
              <td className="px-2 py-1 text-sm">{producto.codigo}</td>
              <td className="px-2 py-1 text-sm font-semibold">Código de barra</td>
              <td className="px-2 py-1 text-sm">{producto.codigoBarra}</td>
            </tr>
            <tr className="border-b">
              <td className="px-2 py-1 text-sm font-semibold">Nombre</td>
              <td className="px-2 py-1 text-sm">{producto.nombre}</td>
              <td className="px-2 py-1 text-sm font-semibold">Descripción</td>
              <td className="px-2 py-1 text-sm">{producto.descripcion}</td>
            </tr>
            <tr className="border-b">
              <td className="px-2 py-1 text-sm font-semibold">Color</td>
              <td className="px-2 py-1 text-sm">{producto.color}</td>
          
            </tr>
          </tbody>
        </table>
        <div className="mt-4 flex justify-end">
          <button 
            onClick={eliminar} 
            className="text-red-500 hover:text-red-700 p-2 rounded-full"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};
