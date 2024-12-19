import { useEffect, useState } from "react";
import { productoI, productosPropsI } from "../../interface/productoInterface";
import { listarProductos } from "../../service/productosApi";

export const ProductosModal = ({ isOpen, closeModal, productoSeleccionado }: productosPropsI) => {
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
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-7xl w-full">
            <button onClick={closeModal} className="top-2 right-2 text-gray-600">
              ✖
            </button>
            <h2 className="text-2xl font-semibold mb-4">Lista de Productos</h2>
            <div className="overflow-y-auto max-h-96"> 
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="px-4 py-2 border border-gray-300 text-sm">Cod</th>
                    <th className="px-4 py-2 border border-gray-300 text-sm">Cod. barra</th>
                    <th className="px-4 py-2 border border-gray-300 text-sm">Producto</th>
                    <th className="px-4 py-2 border border-gray-300 text-sm">Color</th>
                    <th className="px-4 py-2 border border-gray-300 text-sm">Categoria</th>
                    <th className="px-4 py-2 border border-gray-300 text-sm">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-100"
                      onClick={() => {
                        const producto = {
                          _id: item._id,
                          nombre: item.nombre,
                          categoria: item.categoria,
                          codigoBarra: item.codigoBarra,
                          descripcion: item.descripcion,
                          codigo: item.codigo,
                          genero: item.genero,
                          imagen: item.imagen,
                          marca: item.marca,
                          subCategoria: item.subCategoria,
                          talla: item.talla,
                          color: item.color,
                        };
                        console.log(producto);
                        productoSeleccionado(producto);
                        closeModal();
                      }}
                    >
                      <td className="px-4 py-2 border border-gray-300 text-sm">{item.codigo}</td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">{item.codigoBarra}</td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">{item.nombre}</td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">{item.color}</td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">{item.categoria}</td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">{item.descripcion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
