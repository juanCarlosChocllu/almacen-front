import { FaTrash } from "react-icons/fa6";
import { StockI } from "../../stocks/interfaces/stockInterface";

export const StockSeleccionado = ({ item , eliminar}: { item: StockI | undefined, eliminar :()=>void }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 max-w-6xl overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Detalles del Stock</h2>

      <table className="min-w-full table-auto border-collapse text-xs">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-2 py-1 text-left text-xs font-medium">Código</th>
            <th className="px-2 py-1 text-left text-xs font-medium">
              Código Barra
            </th>
            <th className="px-2 py-1 text-left text-xs font-medium">Nombre</th>
            <th className="px-2 py-1 text-left text-xs font-medium">
              Cantidad
            </th>
            <th className="px-2 py-1 text-left text-xs font-medium">Almacén</th>
            <th className="px-2 py-1 text-left text-xs font-medium">Marca</th>
            <th className="px-2 py-1 text-left text-xs font-medium">Tipo</th>
            <th className="px-2 py-1 text-left text-xs font-medium">Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr key={item?.idStock} className="border-b hover:bg-gray-50">
            <td className="px-2 py-1">{item?.codigoProducto}</td>
            <td className="px-2 py-1">{item?.codigoBarra}</td>
            <td className="px-2 py-1">{item?.nombre}</td>
            <td className="px-2 py-1">{item?.cantidad}</td>
            <td className="px-2 py-1">{item?.almacen}</td>
            <td className="px-2 py-1">{item?.marca}</td>
            <td className="px-2 py-1">{item?.tipo}</td>
 
            <td className="px-2 py-1">
              <button className="text-center" onClick={() => {eliminar()}}>
                <FaTrash className="text-red-500 hover:text-red-700" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
