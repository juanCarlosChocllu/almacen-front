import { useContext, useEffect, useState } from "react";
import { StockI } from "../interfaces/stockInterface";

import { listarStock } from "../service/stockService";
import { BuscadorStock } from "./BuscadorStock";
import { BuscadorStockI } from "../interfaces/buscadorStock";

import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { GenerarExcel } from "../../core/components/GenerarExcel";
import { ItemsPorPagina } from "../../core/components/ItemsPorPagina";
import { MostarImagenes } from "../../core/components/modal/MostarImagenes";
import { Paginador } from "../../core/components/Paginador";

export const TablaStock = () => {
  const {token} =useContext(AutenticacionContext)
  const [stocks, setStock] = useState<StockI[]>([])
  const [paginaSelecionada, setPaginaSeleccionada] = useState<number>(1)
  const [paginas, setPaginas] = useState<number>(1)
  const [itemPage, setItemPage] = useState<number>(20)
  const [buscadorStock , setBuscadorStock]= useState<BuscadorStockI>({
    almacen:null,
    codigo:null,
    marca:null,
    tipo:null
  })
  
  useEffect(() => {    
      listarStocks()
  }, [paginaSelecionada,itemPage,buscadorStock])

  const onSubmit =(data:BuscadorStockI)=>{
    setBuscadorStock(data)
        
  }
  const listarStocks = async () => {
     try {
        setStock([])
      if(token){
        const response= await listarStock(paginaSelecionada,itemPage, buscadorStock,token)

        
        setStock(response.data)
        setPaginas(response.paginas) 
      }
     } catch (error) {
       console.log(error);
       
     }
  }

  


  

  const paginaSelect=(pagina:number)=>{
    setPaginaSeleccionada(pagina)
    if(pagina != paginaSelecionada){
       setStock([])
    }
  }


  return (
    <div>
    

          <BuscadorStock onSubmit={onSubmit}/>
          <GenerarExcel<StockI> data={stocks} nombre={'Stock'}/>
          {<ItemsPorPagina  page={setItemPage}/>}
      <table className="min-w-full table-auto text-sm">
        <thead>
          <tr className="bg-gray-800 text-white">
          
            <th className="px-2 py-1 text-left">Codigo Producto</th>
            <th className="px-2 py-1 text-left">Cod. barra</th>
            <th className="px-2 py-1 text-left">Nombre</th>
            <th className="px-2 py-1 text-left">Marca</th>
            <th className="px-2 py-1 text-left">Cantidad</th>
            
            <th className="px-2 py-1 text-left">Color</th>
            <th className="px-2 py-1 text-left">Tipo</th>
            <th className="px-2 py-1 text-left">Imagen</th>
       
          </tr>
        </thead>
        <tbody>
          {stocks.map((item) => (
            <tr key={item.idProducto}>
              <td className="px-2 py-1">{item.codigoProducto}</td>
              <td className="px-2 py-1">{item.codigoBarra}</td>
              <td className="px-2 py-1">{item.nombre}</td>
              <td className="px-2 py-1">{item.marca}</td>
              <td className="px-2 py-1">{item.cantidad || 0}</td>
              <td className="px-2 py-1">{item.color}</td>
              <td className="px-2 py-1">{item.tipo}</td>

              <td className="px-2 py-1"><MostarImagenes  key={item.idProducto} url={item.imagen}/></td>
            </tr>
          ))}
        </tbody>
      </table>
          <Paginador paginaSeleccionada={paginaSelect} paginas={Number(paginas)}  paginaActual={Number(paginaSelecionada)}/>
    </div>

  );
}
