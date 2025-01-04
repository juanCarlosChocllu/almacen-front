import { useContext, useEffect, useState } from "react";
import { listarStock } from "../../service/stockApi";
import { StockI } from "../../interfaces/stockInterface";
import { Paginador } from "../../../utils/components/Paginador";
import { Paginas } from "../../../utils/components/Paginas";


import { BuscadorStock } from "../BuscadorStock";
import { BuscadorStockI } from "../../interfaces/buscadorStock";
import { AutenticacionContext } from "../../../autenticacion/context/crear.autenticacion.context";

export const ListraStock = ({ stock }: { stock: (stock: StockI) => void }) => {
  const {token}= useContext(AutenticacionContext)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [stocks, setStock] = useState<StockI[]>([]);

  const [paginas, setPaginas] = useState<number>(0);
  const [pagina, setPagina] = useState<number>(1);
  const [limite, setLimite] = useState<number>(10);
  const [buscadorStock, setBuscadorStock]= useState<BuscadorStockI>({
    almacen:null,
    codigo:null,
    marca:null,
    tipo:null
  })

;
  
  const abrirModal =  () => {
    setIsOpenModal(true);

  };
  useEffect(()=>{
    if(isOpenModal){
      listarDataAlmacen()
    }
  },[isOpenModal, buscadorStock, limite, pagina])

  
  const listarDataAlmacen = async () => {
    try {
  
       if(token){
        const response = await listarStock(pagina, limite ,buscadorStock,token);
   
        
        setStock(response.data);
        setPaginas(response.paginas)
       }
     
    } catch (error) {
      console.log(error);
    }
  };


  
  const paginaSelect = (pagina:number)=>{    
    setPagina(pagina)
  }


  

  const cantidadPage = (pagina:string)=>{
    setLimite(Number(pagina))
  }


  const onsubmit = (data:BuscadorStockI)=>{
    setBuscadorStock(data)
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

          <BuscadorStock  onSubmit={onsubmit}/>
  
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
                      imagen:item.imagen
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
          {<Paginador paginas={paginas} paginaSeleccionada={paginaSelect} paginaActual={pagina} />}
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
