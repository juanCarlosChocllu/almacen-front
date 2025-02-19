
import { useContext, useEffect, useState } from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'


import { Paginador } from '../../core/components/Paginador'
import { ItemsPorPagina } from '../../core/components/ItemsPorPagina'
import { Buscador } from './Buscador'
import { aprobarCodigoTransferencia, listarCodigoTransferencias, rechazarTransferencia } from '../services/codigoTransferenciasService'
import { CodigoTransferenciaI } from '../interface/codigoTransferencias'
import { BuscadorI } from '../interface/buscador'
import { useNavigate } from 'react-router-dom'
import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context'
import { FaSheetPlastic } from 'react-icons/fa6'
import { EstadoTransferenciaE } from '../../core/enums/estadoTranferencia'
import { HttpStatus } from '../../core/enums/httStatusEnum'
import { alertaDeconfirmacion } from '../../core/utils/alertaDeConfirmacion'
import { alertaDeRechazo } from '../../core/utils/alertaDeRechazo'

export const ListarTransferenciaCodigoSucursal = () => {
    const navigate = useNavigate();
    const {token} = useContext(AutenticacionContext)
    const [transferencias, setTransferencia]=useState<CodigoTransferenciaI[]>([])
    const [recardarDAta, setRecargarData] =useState<boolean>(false)
    const [paginas, setPaginas] = useState<number>(1)
    const [pagina, setPagina] = useState<number>(1)
    const [limite, setLimite] = useState<number>(20)
    const [onSubmit , setOnSubmit]= useState<BuscadorI>({
      codigo:'',
      fechaFin:'',
      fechaInicio:''
    })
  
  
    useEffect(()=>{
   
        listraTransferencias()
    
    },[onSubmit, pagina, limite,recardarDAta])
  
    const listraTransferencias= async()=>{
        try {
            if(token){
              const response = await listarCodigoTransferencias(token ,onSubmit,limite, pagina)
         
            
              setTransferencia(response.data)
              setPaginas(response.paginas)
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
                  setRecargarData(!recardarDAta)
              } 
            }
            
          } catch (error) {
             console.log(error);
             
          }
    }


    const rechazar = async( codigo:string)=>{
      try {
        if(token){
          const response = await rechazarTransferencia(codigo, token)
          if(response.status === HttpStatus.OK){
              setRecargarData(!recardarDAta)
          } 
        }
        
      } catch (error) {
         console.log(error);
         
      }
}
  
    return (
  
  
  <div>
    <Buscador onsubmit={setOnSubmit}/>
    <ItemsPorPagina page={setLimite}/>
    <table className="w-full table-auto border-collapse border border-gray-300 shadow-md rounded-md overflow-hidden text-xs mx-auto">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="px-3 py-2">Codigo transferencia</th>
          <th className="px-3 py-2">Area origen</th>
          <th className="px-3 py-2">Usuario</th>
          <th className="px-3 py-2">Estado</th>
          <th className="px-3 py-2">Fecha Transferencia</th>
       
          <th className="px-3 py-2">Acción</th>
        </tr>
      </thead>
      <tbody>
        {
          transferencias.map((item)=>(
            <tr className="bg-white hover:bg-gray-100  text-sm">
            <th className="px-3 py-2">{item.codigo}</th>
            <th className="px-3 py-2">{item.area}</th>
            <th className="px-3 py-2">{item.usuario}</th>
            <th className="px-3 py-2">{item.estado}</th>
            <th className="px-3 py-2">{item.fecha}</th>
            <th className="px-3 py-2"> 
             {item.estado != EstadoTransferenciaE.APROBADO && item.estado != EstadoTransferenciaE.RECHAZADO && <button 
             onClick={()=>alertaDeRechazo(()=>rechazar(item._id))}
             className="text-red-500 text-2xl"><MdOutlineCancel /></button> }

             <button className="text-blue-500 text-2xl" onClick={()=> navigate(`/transferencia/sucursal/${item._id}`)}><FaSheetPlastic  /></button>
            {item.estado != EstadoTransferenciaE.APROBADO &&   item.estado != EstadoTransferenciaE.RECHAZADO && <button onClick={()=>alertaDeconfirmacion(()=> aprobarTransferencia(item._id))} className="text-green-500 text-2xl"><TiTick  /></button>  }

              </th>
  
          </tr>
          ))
        }
      </tbody>
    </table>
    <Paginador paginas={paginas} paginaSeleccionada={setPagina} paginaActual={pagina}/>
  </div>
  )
}

