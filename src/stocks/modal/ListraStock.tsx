import { useContext, useEffect, useState } from "react";
import { listarStock } from "../service/stockService";
import { StockI } from "../interfaces/stockInterface";


import { BuscadorStock } from "../components/BuscadorStock";
import { BuscadorStockI } from "../interfaces/buscadorStock";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { BiAddToQueue } from "react-icons/bi";
import { MostarImagenes } from "../../core/modal/MostarImagenes";
import { ItemsPorPagina } from "../../core/components/ItemsPorPagina";
import { Paginador } from "../../core/components/Paginador";
import { diasRestantes } from "../../core/utils/diasVencimiento";


export const ListraStock = ({ stock }: { stock: (stock: StockI) => void }) => {

  const {token}= useContext(AutenticacionContext)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [stocks, setStock] = useState<StockI[]>([]);

  const [paginas, setPaginas] = useState<number>(1);
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
          {<ItemsPorPagina page={setLimite} />}
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
                <th className="px-2 py-1 text-left text-xs font-medium">
                  Fecha Vencimiento
                </th>
                <th className="px-2 py-1 text-left text-xs font-medium">
                  Dias 
                </th>
                <th className="px-2 py-1 text-left text-xs font-medium">
                  Imagen
                </th>
                <th className="px-2 py-1 text-left text-xs font-medium">
                  accion
                </th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((item) => (
                <tr
               
                >
                  <td className="px-2 py-1">{item.codigoProducto}</td>
                  <td className="px-2 py-1">{item.codigoBarra}</td>
                  <td className="px-2 py-1">{item.nombre}</td>
                  <td className="px-2 py-1">{item.cantidad}</td>
                  <td className="px-2 py-1">{item.almacen}</td>
                  <td className="px-2 py-1">{item.marca}</td>
                  <td className="px-2 py-1">{item.tipo}</td>
                  <td className="px-2 py-1">{item.fechaVencimiento}</td>
                  <td className={`px-2 py-1 ${diasRestantes(item.fechaVencimiento) < 0 ? 'bg-red-200' : 'bg-green-200'}`}>
  {diasRestantes(item.fechaVencimiento)}
</td>

                  <td className="px-2 py-1"><MostarImagenes  key={item.idStock} url={item.imagen}/></td>
                  <td className="px-2 py-1"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" 
                     key={item.idStock}
                     onClick={() => {
                       const stockSeleccioando:StockI = {
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
                         imagen:item.imagen,
                        codigoProducto:item.codigoProducto
                      
                       };
                       stock(stockSeleccioando);
                       setIsOpenModal(false);
                     }}
                  ><BiAddToQueue />
      </button>
      
                     
      </td>
        
                </tr>
              ))}
            </tbody>
           
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
