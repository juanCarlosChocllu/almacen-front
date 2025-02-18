
import { useContext, useEffect, useState } from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'


import { Paginador } from '../../core/components/Paginador'
import { ItemsPorPagina } from '../../core/components/ItemsPorPagina'
import { Buscador } from './Buscador'
import { listarCodigoTransferencias } from '../services/codigoTransferenciasService'
import { CodigoTransferenciaI } from '../interfaces/codigoTransferencias'
import { BuscadorI } from '../interfaces/buscador'
import { useNavigate } from 'react-router-dom'
import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context'
import { FaSheetPlastic } from 'react-icons/fa6'

export const ListarTransferenciaSucursal = () => {
    const navigate = useNavigate();
    const {token} = useContext(AutenticacionContext)
    const [transferencias, setTransferencia]=useState<CodigoTransferenciaI[]>([])
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
    
    },[onSubmit, pagina, limite])
  
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
  
  
  
    return (
  
  
  <div>
    <Buscador onsubmit={setOnSubmit}/>
    <ItemsPorPagina page={setLimite}/>
    <table className="w-full table-auto border-collapse border border-gray-300 shadow-md rounded-md overflow-hidden text-xs mx-auto">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="px-3 py-2">Codigo transferencia</th>
          <th className="px-3 py-2">Area orgien</th>
          <th className="px-3 py-2">Usuario</th>
          <th className="px-3 py-2">Codigo Fecha</th>
          <th className="px-3 py-2">Acción</th>
        </tr>
      </thead>
      <tbody>
        {
          transferencias.map((item)=>(
            <tr className="bg-white hover:bg-gray-100  text-sm">
            <th className="px-3 py-2">{item.codigo}</th>
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2">{item.usuario}</th>
            <th className="px-3 py-2">{item.fecha}</th>
            <th className="px-3 py-2"> <button className="text-red-500 text-2xl"><MdOutlineCancel /></button> 
             <button className="text-blue-500 text-2xl" onClick={()=> navigate(`/transferencia/sucursal/${item._id}`)}><FaSheetPlastic  /></button>
             <button className="text-green-500 text-2xl"><TiTick  /></button>
             
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

