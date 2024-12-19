import { useEffect, useState } from "react";
import { listarProductos } from "../service/productosApi";
import { productoI } from "../interface/productoInterface";

export const TablaProductos = () => {
  const [productos, setProductos] = useState<productoI[]>([]);

  useEffect(() => {
    const listarPro = async () => {
      try {
        const response = await listarProductos();
        setProductos(response);
      } catch (error) {
        console.log(error);
      }
    };

    listarPro();
  }, []);

  return (
    <div className="p-6">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2 border border-gray-300 text-sm">Codigo</th>
            <th className="px-4 py-2 border border-gray-300 text-sm">Cod. barra</th>
            <th className="px-4 py-2 border border-gray-300 text-sm">Producto</th>
            <th className="px-4 py-2 border border-gray-300 text-sm">Color</th>
            <th className="px-4 py-2 border border-gray-300 text-sm">Categoria</th>
            <th className="px-4 py-2 border border-gray-300 text-sm">Descripción</th>
            <th className="px-4 py-2 border border-gray-300 text-sm">Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((item) => (
            <tr className="hover:bg-gray-100" key={item._id}>
              <td className="px-4 py-2 border border-gray-300 text-sm">{item.codigo}</td>
              <td className="px-4 py-2 border border-gray-300 text-sm">{item.codigoBarra}</td>
              <td className="px-4 py-2 border border-gray-300 text-sm">{item.nombre}</td>
              <td className="px-4 py-2 border border-gray-300 text-sm">{item.color}</td>
              <td className="px-4 py-2 border border-gray-300 text-sm">{item.categoria}</td>
              <td className="px-4 py-2 border border-gray-300 text-sm">{item.descripcion}</td>
              <td className="px-4 py-2 border border-gray-300 text-sm"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
