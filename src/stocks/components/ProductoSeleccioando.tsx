import { FaTrash } from "react-icons/fa";
import { dataProductoI } from "../interfaces/dataProducto";
import { productoSeleccionadoPropsI } from "../interfaces/productoSeleccionadoInterface";

export const ProductoSeleccioando = ({ data, nuevaData = () => {} }: productoSeleccionadoPropsI) => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">Productos Seleccionados</h2>
      {data.length === 0 ? (
        <p className="text-center text-gray-600">No hay productos seleccionados.</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white text-sm">
            <tr>
              <th className="px-4 py-2">Código</th>
              <th className="px-4 py-2">Factura</th>
              <th className="px-4 py-2">Producto</th>
              <th className="px-4 py-2">Cantidad</th>
              <th className="px-4 py-2">Precio</th>
          
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Fecha de compra</th>
              <th className="px-4 py-2">Fecha de vencimiento</th>
              <th className="px-4 py-2">Acción</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {data.map((producto, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2">{producto.codigo}</td>
                <td className="px-4 py-2">{producto.factura}</td>
                <td className="px-4 py-2">{producto.nombre}</td>
                <td className="px-4 py-2">{producto.cantidad}</td>
                <td className="px-4 py-2">{producto.precio}</td>
       
                <td className="px-4 py-2">{producto.total}</td>
                <td className="px-4 py-2">{producto.tipo}</td>
                <td className="px-4 py-2">{producto.fechaCompra}</td>
                <td className="px-4 py-2">{producto.fechaVencimiento}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      const eliminados: dataProductoI[] = data.filter((item) => item.uuid !== producto.uuid);
                      nuevaData(eliminados);
                    }}
                  >
                   <FaTrash className="text-red-500 hover:text-red-700" />
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
