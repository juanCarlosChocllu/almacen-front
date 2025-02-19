import React, { useContext, useEffect, useState } from 'react'
import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context'
import { transferenciasI } from '../interface/transferenciasInterface'
import { ImCancelCircle } from 'react-icons/im'
import { EstadoTransferenciaE } from '../../core/enums/estadoTranferencia'
import { transferenciasPorCodigo } from '../services/codigoTransferenciasService'

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
    </div>
  )
}
