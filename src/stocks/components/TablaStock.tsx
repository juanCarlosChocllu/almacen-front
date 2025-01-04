import { useContext, useEffect, useState } from "react";
import { StockI } from "../interfaces/stockInterface";
import { Paginas } from "../../utils/components/Paginas";
import { Paginador } from "../../utils/components/Paginador";
import { listarStock } from "../service/stockApi";
import { BuscadorStock } from "./BuscadorStock";
import { BuscadorStockI } from "../interfaces/buscadorStock";
import { GenerarExcel } from "../../utils/components/GenerarExcel";
import { MostarImagenes } from "../../utils/components/modal/MostarImagenes";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";

export const TablaStock = () => {
  const {token} =useContext(AutenticacionContext)
  const [stocks, setStock] = useState<StockI[]>([])
  const [paginaSelecionada, setPaginaSeleccionada] = useState<number>(1)
  const [paginas, setPaginas] = useState<number>(1)
  const [itemPage, setItemPage] = useState<number>(10)
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

  


  const cantidadItems=(cantidad:string)=>{
    setItemPage(Number(cantidad))
  
    
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
          {<Paginas  page={cantidadItems}/>}
      <table className="min-w-full table-auto text-sm">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-2 py-1 text-left">Codigo</th>
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
              <td className="px-2 py-1">{item.codigo}</td>
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
