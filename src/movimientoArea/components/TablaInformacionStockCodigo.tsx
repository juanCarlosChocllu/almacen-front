import { useContext, useEffect, useState } from "react"

import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context"
import { MostarImagenes } from "../../core/components/modal/MostarImagenes"
import { MovimientoAreaI } from "../interface/movimientoAreaInterface"
import { listarStockPorCodigo } from "../services/movimientoAreaService"


export const TablaInformacionStockCodigo = ({id}:{id:string}) => {
  const {token}= useContext(AutenticacionContext)
  const [data,setData] =useState<MovimientoAreaI[]>([])
  useEffect(()=>{
    informacionStock()
  },[id])

  const informacionStock= async()=>{
      try {
        if(token && id){
          const response = await listarStockPorCodigo(token, id)
          console.log(response);
          
          setData(response)
        }
      } catch (error) {
        console.log(error);
        
      }
  }
  return (
    <div>
        <table className="min-w-full table-auto text-sm">
              <thead>
                <tr className="bg-gray-800 text-white">
                
                  <th className="px-2 py-1 text-left">Codigo Producto</th>
         
                  <th className="px-2 py-1 text-left">Producto</th>
                  <th className="px-2 py-1 text-left">codigo barra</th>
                  <th className="px-2 py-1 text-left">Usuario</th>
                  <th className="px-2 py-1 text-left">Cantidad</th>
                  
                  <th className="px-2 py-1 text-left">Precio</th>
                  <th className="px-2 py-1 text-left">Tipo</th>
           
                  <th className="px-2 py-1 text-left">fecha Vencimiento</th>
                  <th className="px-2 py-1 text-left">Imagen</th>
             
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="px-2 py-1">{item.codigo}</td>
                    <td className="px-2 py-1">{item.producto}</td>
                    <td className="px-2 py-1">{item.codigoBarra}</td>
                    <td className="px-2 py-1">{item.usuario}</td>
                    <td className="px-2 py-1">{item.cantidad || 0}</td>
                    <td className="px-2 py-1">{item.precio}</td>
                    <td className="px-2 py-1">{item.tipo}</td>
                    <td className="px-2 py-1">{item.fechaVencimiento}</td>
                    <td className="px-2 py-1"><MostarImagenes  key={index} url={item.imagen}/></td>
                  </tr>
                ))}
              </tbody>
            </table>

    </div>
  )
}
