import { useEffect, useState } from "react";
import { listarStock } from "../../service/stockApi";
import { StockI } from "../../interfaces/stockInterface";
import { almacenAreaI } from "../../../almacenArea/interfaces/almacenAreaInterface";
import { listarAlmacenPorArea } from "../../../almacenArea/services/almacenAreaApi";
import { Paginador } from "../../../utils/components/Paginador";
import { Paginas } from "../../../utils/components/Paginas";

import { useForm } from "react-hook-form";
import { buscadorStockI } from "../../interfaces/buscadorInterface";

export const ListraStock = ({ stock }: { stock: (stock: StockI) => void }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [stocks, setStock] = useState<StockI[]>([]);
  const [almacenArea, setAlmacenArea] = useState<almacenAreaI[]>([]);
  const [almacen, setAlmacen] = useState<string>();
  const [paginas, setPaginas] = useState<number>(0);
  const [paginaSeleccioanda, setPaginaSeleccioanda] = useState<number>(1);
  const [cantidadItems, setCantidadItems] = useState<number>(10);

  const {register, watch} = useForm<buscadorStockI>()
  const codigo = watch('codigo')
  const codigoBarra = watch('codigoBarra')
  const tipo = watch('tipo')
;
  
  const abrirModal = async () => {
    setIsOpenModal(true);
    try {
      const responseAlmacenArea = await listarAlmacenPorArea();
      setAlmacenArea(responseAlmacenArea);
    } catch (error) {}
  };

  
  const listarDataAlmacen = async () => {
    try {
      if (almacen) {
        const response = await listarStock(almacen,paginaSeleccioanda, cantidadItems);
        setStock(response.data);
        setPaginas(response.paginas)
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    listarDataAlmacen();
  }, [almacen,paginaSeleccioanda, cantidadItems,codigo,codigoBarra,tipo]);
  
  const paginaSelect = (pagina:number)=>{    
    setPaginaSeleccioanda(pagina)
  }


  

  const cantidadPage = (pagina:string)=>{
    setCantidadItems(Number(pagina))
  }




  return (
<>
  <button
    onClick={() => {
      abrirModal();
    }}
    className="px-2 py-1 bg-blue-600 text-white rounded-md"
  >
    Listar stock
  </button>

  {isOpenModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 max-w-6xl overflow-hidden">
        <h2 className="text-lg font-semibold mb-4">Detalles del Stock</h2>

        <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="codigo"
              className="block text-xs font-medium text-gray-700"
            >
              Buscar por Código
            </label>
            <input
              {...register('codigo')}
              type="text"
              id="codigo"
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
              placeholder="Código"
            />
          </div>

          <div>
            <label
              htmlFor="codigoBarra"
              className="block text-xs font-medium text-gray-700"
            >
              Buscar por Código de Barra
            </label>
            <input
                     {...register('codigoBarra')}
              type="text"
              id="codigoBarra"
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
              placeholder="Código de Barra"
            />
          </div>

          <div>
            <label
              htmlFor="tipo"
              className="block text-xs font-medium text-gray-700"
            >
              Buscar por Tipo
            </label>
            <select
                     {...register('tipo')}
              id="almacenArea"
              className="mt-1 block px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
            >
              <option value="">Seleccione el Tipo</option>
              <option value="REGALO">REGALO</option>
              <option value="VENTA">VENTA</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="almacenArea"
            className="block text-xs font-medium text-gray-700"
          >
            Almacen
          </label>
          <select
            id="almacenArea"
            onClick={(e) => {
              const target = e.target as HTMLSelectElement;
              setAlmacen(target.value);
            }}
            className="mt-1 block px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
          >
            <option value="">Seleccione el Almacen</option>
            {almacenArea.map((item) => (
              <option key={item._id} value={item._id}>
                {item.nombre}
              </option>
            ))}
          </select>
        </div>
        
  
        <div className="overflow-auto max-h-96">
          {<Paginas page={cantidadPage} />}
          <table className="min-w-full table-auto border-collapse text-xs">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-2 py-1 text-left text-xs font-medium">
                  Código
                </th>
                <th className="px-2 py-1 text-left text-xs font-medium">
                  Código Barra
                </th>
                <th className="px-2 py-1 text-left text-xs font-medium">
                  Nombre
                </th>
                <th className="px-2 py-1 text-left text-xs font-medium">
                  Cantidad
                </th>
                <th className="px-2 py-1 text-left text-xs font-medium">
                  Almacén
                </th>
                <th className="px-2 py-1 text-left text-xs font-medium">
                  Marca
                </th>
                <th className="px-2 py-1 text-left text-xs font-medium">
                  Tipo
                </th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((item) => (
                <tr
                  key={item.idStock}
                  className="border-b hover:bg-gray-50"
                  onClick={() => {
                    const stockSeleccioando = {
                      almacen: item.almacen,
                      idStock: item.idStock,
                      cantidad: item.cantidad,
                      codigo: item.codigo,
                      codigoBarra: item.codigoBarra,
                      color: item.color,
                      fechaCompra: item.fechaCompra,
                      fechaVencimiento: item.fechaVencimiento,
                      idProducto: item.idProducto,
                      marca: item.marca,
                      nombre: item.nombre,
                      precio: item.precio,
                      tipo: item.tipo,
                      total: item.total,
                      almacenArea: item.almacenArea,
                    };
                    stock(stockSeleccioando);
                    setIsOpenModal(false);
                  }}
                >
                  <td className="px-2 py-1">{item.codigo}</td>
                  <td className="px-2 py-1">{item.codigoBarra}</td>
                  <td className="px-2 py-1">{item.nombre}</td>
                  <td className="px-2 py-1">{item.cantidad}</td>
                  <td className="px-2 py-1">{item.almacen}</td>
                  <td className="px-2 py-1">{item.marca}</td>
                  <td className="px-2 py-1">{item.tipo}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 border-t">
                <td className="px-2 py-1 text-left text-xs font-medium">Total</td>
                <td className="px-2 py-1 text-xs font-medium"></td>
                <td className="px-2 py-1 text-xs font-medium"></td>
                <td className="px-2 py-1 text-xs font-medium">
                  {stocks.reduce((acc, item) => acc + item.cantidad, 0)}
                </td>
                <td className="px-2 py-1 text-xs font-medium"></td>
                <td className="px-2 py-1 text-xs font-medium"></td>
                <td className="px-2 py-1 text-xs font-medium"></td>
              </tr>
            </tfoot>
          </table>
          {<Paginador paginas={paginas} paginaSeleccionada={paginaSelect} paginaActual={paginaSeleccioanda} />}
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsOpenModal(false)}
            className="px-2 py-1 bg-red-600 text-white rounded-md"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )}
</>

  
  
  
  );
};
