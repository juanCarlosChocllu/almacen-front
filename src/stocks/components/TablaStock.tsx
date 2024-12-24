import { useEffect, useState } from "react";
import { StockI } from "../interfaces/stockInterface";
import { almacenAreaI } from "../../almacenArea/interfaces/almacenAreaInterface";
import { listarAlmacenPorArea } from "../../almacenArea/services/almacenAreaApi";
import { Paginas } from "../../utils/components/Paginas";
import { Paginador } from "../../utils/components/Paginador";
import { listarStock } from "../service/stockApi";

export const TablaStock = () => {
  const [stocks, setStock] = useState<StockI[]>([])
  const [almacen, setAlmacen] = useState<almacenAreaI[]>([])
  const [paginaSelecionada, setPaginaSeleccionada] = useState<number>(1)
  const [paginas, setPaginas] = useState<number>()
  const [itemPage, setItemPage] = useState<number>(10)
  
  const [almacenSeleccionado,  setAlamcenSeleccionado]= useState<string>()
  useEffect(() => {

    listarAlamcen()
    if(almacenSeleccionado){
      listarStocks()
    }
  }, [almacenSeleccionado,paginaSelecionada,itemPage])


  const listarStocks = async () => {
     try {
      if(almacenSeleccionado){
        const response= await listarStock(almacenSeleccionado,paginaSelecionada,itemPage)
        setStock(response.data)
        setPaginas(response.paginas)
      
       }
     } catch (error) {
       console.log(error);
       
     }
  }

  
  const listarAlamcen = async () => {
    try {
      const response = await listarAlmacenPorArea()
      setAlmacen(response)

    } catch (error) {

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
  const seleccionarAlamacen= (almacen:string)=>{
   setAlamcenSeleccionado(almacen)
  }
  return (
    <div>
      <div>
        <label htmlFor="almacen" className="block text-sm font-medium text-gray-700">
          Seleccione el Almacén
        </label>
        <select
          id="almacen"
          name="almacen"
          onChange={(e)=>{
            const target = e.target as HTMLSelectElement
            seleccionarAlamacen(target.value)
          }}
          className="mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Seleccione el Almacén</option>
          {almacen.map((item) => (
            <option key={item._id} value={item._id}>
              {item.nombre}
            </option>
          ))}
        </select>
      </div>
          {<Paginas  page={cantidadItems}/>}
      <table className="min-w-full table-auto text-sm">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-2 py-1 text-left">Codigo</th>
            <th className="px-2 py-1 text-left">Cod. barra</th>
            <th className="px-2 py-1 text-left">Nombre</th>
            <th className="px-2 py-1 text-left">Marca</th>
            <th className="px-2 py-1 text-left">Cantidad</th>
                {/*  <th className="px-2 py-1 text-left">Precio</th>
            <th className="px-2 py-1 text-left">Total</th>*/}
            <th className="px-2 py-1 text-left">Color</th>
            <th className="px-2 py-1 text-left">Tipo</th>
            {/* <th className="px-2 py-1 text-left">Fecha de Compra</th>
            <th className="px-2 py-1 text-left">Fecha de Vencimiento</th>*/}
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
            </tr>
          ))}
        </tbody>
      </table>
          <Paginador paginaSeleccionada={paginaSelect} paginas={Number(paginas)}  paginaActual={Number(paginaSelecionada)}/>
    </div>

  );
}
