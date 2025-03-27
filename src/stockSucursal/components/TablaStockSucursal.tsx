import React, { useContext, useEffect, useState } from 'react'
import { listarStockSucursal } from '../services/stockSucursalApi'
import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context'
import { StockSucursalI } from '../interfaces/stockSucursal'

import { BuscadorStockSucursal } from './BuscadorStockSucursal'
import { BuscadorStockSucursalI } from '../interfaces/buscadorStockSucursal'
import { ItemsPorPagina } from '../../core/components/ItemsPorPagina'
import { Paginador } from '../../core/components/Paginador'
import { MostarImagenes } from '../../core/modal/MostarImagenes'
import { diasRestantes } from '../../core/utils/diasVencimiento'

export const TablaStockSucursal = () => {
  const [stocks, setStocks] = useState<StockSucursalI[]>([])
  const [buscador, setBuscador] =useState<BuscadorStockSucursalI>({
    almacenSucursal:null,
    codigo:null,
    marca:null,
    tipo:null
  })
  const [paginas, setPaginas]=useState<number> (1)
  const [pagina, setPagina]=useState<number> (1)
  const [limite, setLimite]=useState<number> (20)
  const {token}= useContext(AutenticacionContext)
  useEffect(()=>{
    stock()
  },[buscador, pagina, limite])

  const stock = async ()=>{
    try {
        if(token){
          const response = await listarStockSucursal(token,limite, pagina, buscador)
          setStocks(response.data)
          setPaginas(response.paginas)
          
          
        }
        
    } catch (error) {
      console.log(error);
      
    }
  }
  const onsubmit =(data:BuscadorStockSucursalI)=>{
    console.log(data);
    
    setBuscador(data);
      
  }



  
  return (
  <div>
    

       <BuscadorStockSucursal onSubmit={onsubmit}/>
      <ItemsPorPagina page={setLimite} />
      <table className="min-w-full table-auto text-sm">
        <thead>
          <tr className="bg-gray-800 text-white">
          <th className="px-2 py-1 text-left">Codigo Producto</th>
          <th className="px-2 py-1 text-left">Almacen</th>
            <th className="px-2 py-1 text-left">Nombre</th>
            <th className="px-2 py-1 text-left">Marca</th>
            <th className="px-2 py-1 text-left">Cantidad</th>
            
            <th className="px-2 py-1 text-left">Color</th>
            <th className="px-2 py-1 text-left">Tipo</th>
            <th className="px-2 py-1 text-left">fecha de vencimiento</th>
            <th className="px-2 py-1 text-left">Dias</th>
            <th className="px-2 py-1 text-left">Imagen</th>
       
          </tr>
        </thead>
        <tbody>
          {stocks.map((item) => (
            <tr key={item._id}>
              <td className="px-2 py-1">{item.codigoProducto}</td>
              <td className="px-2 py-1">{item.almacen}</td>
              <td className="px-2 py-1">{item.nombre}</td>
              <td className="px-2 py-1">{item.marca}</td>
              <td className="px-2 py-1">{item.cantidad || 0}</td>
              <td className="px-2 py-1">{item.color}</td>
              <td className="px-2 py-1">{item.tipo}</td>
              <td className="px-2 py-1">{item.fechaVencimiento}</td>
              <td className="px-2 py-1">{diasRestantes(item.fechaVencimiento)}</td>
              <td className="px-2 py-1"><MostarImagenes  key={item._id} url={item.imagen}/></td>
            </tr>
          ))}
        </tbody>
      </table>
          <Paginador paginas={paginas} paginaSeleccionada={setPagina} paginaActual={pagina}/>
    </div>
  )
}

