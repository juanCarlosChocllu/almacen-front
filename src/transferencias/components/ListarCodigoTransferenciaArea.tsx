import { useContext, useEffect, useState } from "react"
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context"
import { CodigoTransferenciaI } from "../interface/codigoTransferencias"


import { ItemsPorPagina } from "../../core/components/ItemsPorPagina"
import { Paginador } from "../../core/components/Paginador"
import { Buscador } from "./Buscador"
import { BuscadorI } from "../interface/buscador"
import { useNavigate } from "react-router-dom"
import { MdOutlineCancel } from "react-icons/md"
import { FaSheetPlastic } from "react-icons/fa6"
import { cancelarTransferencia, listarCodigoTransferencias } from "../services/codigoTransferenciasService"
import { EstadoTransferenciaE } from "../../core/enums/estadoTranferencia"
import { FaRegEdit } from "react-icons/fa"
import { HttpStatus } from "../../core/enums/httStatusEnum"
import { alertaDeCancelacion } from "../../core/utils/alerteDeCancelacion"

export const ListarCodigoTransferenciaArea = () => {  


  
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
  
  },[onSubmit, pagina, limite, recardarDAta])

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
  const cancelar = async(codigo:string)=>{
      try {
        if(token){
          const response = await cancelarTransferencia(codigo, token)
          if(response.status === HttpStatus.OK){
             setRecargarData(!recardarDAta)
          }
        }
      } catch (error) {
        throw error
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
        <th className="px-3 py-2">Usuario</th>
        <th className="px-3 py-2">Estado</th>
        <th className="px-3 py-2">Codigo Fecha</th>
        <th className="px-3 py-2">Acción</th>
      </tr>
    </thead>
    <tbody>
      {
        transferencias.map((item)=>(
          <tr className="bg-white hover:bg-gray-100  text-sm">
          <th className="px-3 py-2">{item.codigo}</th>
          <th className="px-3 py-2">{item.usuario}</th>
          <th className="px-3 py-2">{item.estado}</th>
          <th className="px-3 py-2">{item.fecha}</th>
          <th className="px-3 py-2"> 
        {item.estado === EstadoTransferenciaE.PENDIENTE && 
         <button onClick={()=>alertaDeCancelacion(()=>cancelar(item._id))} 
         className="bg-red-500 text-white p-1 rounded-md">CANCELAR</button>
      
         }
           <button className="text-blue-500 text-2xl" 
           onClick={()=> navigate(`/transferencia/${item._id}`)}><FaSheetPlastic  /></button>
           {item.estado === EstadoTransferenciaE.RECHAZADO && 
           <button className="text-yellow-400 text-2xl" onClick={()=> navigate(`/transferencia/editar/rechazado/${item._id}`)}><FaRegEdit /></button>}
           
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
