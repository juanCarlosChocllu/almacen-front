
import { useContext, useEffect, useState } from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'

import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context'
import { transferenciasSucursal } from '../services/transferenciaService'
import { TransFerenciaSucursal } from '../core/interface/transferenciaSucursal'

export const AceptarTransferenciasTabla = () => {
    const [data ,setData]= useState<TransFerenciaSucursal[]>([])
    const {token}= useContext(AutenticacionContext)
    useEffect(()=>{
        tranferencias()
    },[])

   const tranferencias= async()=>{
    try {
        if(token){  

           const response= await transferenciasSucursal(token)
            setData(response)

        }
    } catch (error) {
        console.log(error);
        
    }

   }
  return (
    <div className="overflow-x-auto">
<h1 className='text-center'>Lista de productos recibidos</h1>
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead >
            <tr className="bg-gray-100 text-left text-xs">
                <th className="px-4 py-2 font-semibold text-gray-700">Codigo producto</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Producto</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Area</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Almacen destino</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Cantidad</th>
                <th className="px-4 py-2 font-semibold text-gray-700">fecha</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Accion</th>
            </tr>
        </thead>
        <tbody>
          { data.map((item)=> (
              <tr className="border-b hover:bg-gray-50 text-xs">
              <td className="px-4 py-2 text-gray-800">{item.codigoProducto}</td>
              <td className="px-4 py-2 text-gray-800">{item.producto}</td>
              <td className="px-4 py-2 text-gray-800">{item.area}</td>
              <td className="px-4 py-2 text-gray-800">{item.almacen}</td>
              <td className="px-4 py-2 text-gray-800">{item.cantidad}</td>
              <td className="px-4 py-2 text-gray-800">{item.fecha}</td>
              <td className="px-4 py-2">
                  <button className="px-4 py-2 bg-green-500 text-white rounded"><TiTick /></button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded "><MdOutlineCancel /></button>
              </td>
          </tr>
          ))}
           
        </tbody>
    </table>
</div>

  )
}

