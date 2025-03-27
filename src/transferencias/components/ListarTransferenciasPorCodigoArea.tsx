import  { useContext, useEffect, useState } from 'react'
import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context'
import { transferenciasI } from '../interface/transferenciasInterface'

import { cancelarTransferencia, transferenciasPorCodigo } from '../services/codigoTransferenciasService'
import { HttpStatus } from '../../core/enums/httStatusEnum'
import { alertaDeCancelacion } from '../../core/utils/alerteDeCancelacion'

export const ListarTransferenciasPorCodigoArea = ({id}:{id:string| undefined}) => {
    const [data, setData] = useState<transferenciasI[]>([])
    const {token}=useContext(AutenticacionContext)
    useEffect(()=>{
        transferencia()
    },
    [id])

    
    const transferencia = async()=>{        
        try {
            if(id && token){
                const response = await transferenciasPorCodigo(id, token)
                setData(response)
                
            }
            
        } catch (error) {
                console.log(error);
                
        }
    } 

const cancelar = async(codigo:string)=>{
      try {
        if(token){
          const response = await cancelarTransferencia(codigo, token)
          if(response.status === HttpStatus.OK){
            
          }
        }
      } catch (error) {
        throw error
      }
  }
  return (
    <div>
        <h1 className='text-center'>Listado de transferencias areas</h1>
        <table className="min-w-full table-auto border-collapse text-xs">
   
    <thead className="bg-gray-800 text-white">
        <tr className="bg-gray-800 text-white">
          <th className="px-4 py-2 border-b">Código</th>
          <th className="px-4 py-2 border-b">Producto</th>
          <th className="px-4 py-2 border-b">Color</th>
          <th className="px-4 py-2 border-b">Marca</th>
          <th className="px-4 py-2 border-b">Cantidad</th>
          <th className="px-4 py-2 border-b">Tipo</th>
          <th className="px-4 py-2 border-b">Sucursal Destino</th>
          <th className="px-4 py-2 border-b">Almacén Destino</th>
          <th className="px-4 py-2 border-b">fecha</th>
          <th className="px-4 py-2 border-b">Estado</th>
        </tr>
      </thead>
      <tbody>
        {data.map((transferencia) => (
          <tr key={transferencia._id} className="hover:bg-gray-100">
            <td className="px-4 py-2 border-b">{transferencia.codigo}</td>
            <td className="px-4 py-2 border-b">{transferencia.producto}</td>
            <td className="px-4 py-2 border-b">{transferencia.color}</td>
            <td className="px-4 py-2 border-b">{transferencia.marca}</td>
            <td className="px-4 py-2 border-b">{transferencia.cantidad}</td>
            <td className="px-4 py-2 border-b">{transferencia.tipo}</td>
            <td className="px-4 py-2 border-b">{transferencia.sucursal}</td>
            <td className="px-4 py-2 border-b">{transferencia.almacenSucursal}</td>
            <td className="px-4 py-2 border-b">{transferencia.fecha}</td>
            <td className="px-4 py-2 border-b">{transferencia.estado}</td>
         
          </tr>
        ))}
      </tbody>
    </table>
    {id && <div className='text-center mt-2'>
    <button onClick={()=>alertaDeCancelacion(()=>cancelar(id))} 
         className="bg-red-500 text-white p-1 rounded-md">CANCELAR</button>
    </div>}
    </div>
  )
}
