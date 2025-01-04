import React, { useContext, useEffect, useState } from 'react'
import { listarStockSucursal } from '../services/stockSucursalApi'
import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context'
import { StockSucursalI } from '../interfaces/stockSucursal'
import { MostarImagenes } from '../../utils/components/modal/MostarImagenes'
import { BuscadorStockSucursal } from './BuscadorStockSucursal'

export const TablaStockSucursal = () => {
  const [stocks, setStocks] = useState<StockSucursalI[]>([])
  const {token}= useContext(AutenticacionContext)
  useEffect(()=>{
    stock()
  },[])

  const stock = async ()=>{
    try {
        if(token){
          const response = await listarStockSucursal(token)
          setStocks(response)
        }
        
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
  <div>
    

       <BuscadorStockSucursal/>
    
      <table className="min-w-full table-auto text-sm">
        <thead>
          <tr className="bg-gray-800 text-white">
          <th className="px-2 py-1 text-left">Codigo</th>
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
            <tr key={item._id}>
                    <td className="px-2 py-1">{item.codigo}</td>
                     <td className="px-2 py-1">{item.nombre}</td>
              <td className="px-2 py-1">{item.marca}</td>
              <td className="px-2 py-1">{item.cantidad || 0}</td>
              <td className="px-2 py-1">{item.color}</td>
              <td className="px-2 py-1">{item.tipo}</td>

              <td className="px-2 py-1"><MostarImagenes  key={item._id} url={item.imagen}/></td>
            </tr>
          ))}
        </tbody>
      </table>
          
    </div>
  )
}

