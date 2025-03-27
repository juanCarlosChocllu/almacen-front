import { useContext, useEffect, useState } from "react"
import { transferenciasI } from "../interface/transferenciasInterface"
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context"
import {  aprobarCodigoTransferencia, transferenciasPorCodigo } from "../services/codigoTransferenciasService"
import { ImCancelCircle } from "react-icons/im"
import { TiTick } from "react-icons/ti"
import { aprobarTransferencia } from "../services/transferenciaService"
import { EstadoTransferenciaE } from "../../core/enums/estadoTranferencia"
import { HttpStatus } from "../../core/enums/httStatusEnum"
import { alertaDeconfirmacion } from "../../core/utils/alertaDeConfirmacion"


export const ListarTransferenciaPorCodigoSucursal = ({id}:{id:string|undefined}) => {
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


    const aprobar= async (transferencia:string)=>{
      try {

        if(token && transferencia){
        //  const response = await aprobarTransferencia(transferencia, token)
        }
      } catch (error) {
        console.log(error);
        
      }
    }

    const rechazar= async (transferencia:string)=>{
      try {

        
        if(token && transferencia){
        //  const response = await rechazarTransferencia(transferencia, token)
        }
      } catch (error) {
        console.log(error);
        
      }
    }

      
        const aprobarTransferencia = async( codigo:string)=>{
              try {
                if(token){
                  const response = await aprobarCodigoTransferencia(codigo, token)
                  if(response.status === HttpStatus.OK){
       
                  } 
                }
                
              } catch (error) {
                 console.log(error);
                 
              }
        }
    
  return (
    <div>
        <h1 className='text-center'>Listado de transferencia sucursal</h1>
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
      <div className="text-center">{id &&   <button onClick={()=>alertaDeconfirmacion(()=> aprobarTransferencia(id))} className="text-white bg-green-500 p-1 rounded-sm m-4"> Aprobar</button>  }</div>
    </div>  
  )
}
