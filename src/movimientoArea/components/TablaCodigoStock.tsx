import React, { useContext, useEffect, useState } from 'react'

import { BuscadorCodigoStockI } from '../interface/buscadorCodigoStock'
import { listarCodigoStock } from '../../stocks/service/stockService'
import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context'
import { CodigoStock } from '../interface/codigoStock'
import { ItemsPorPagina } from '../../core/components/ItemsPorPagina'
import { IoIosInformationCircle } from 'react-icons/io'
import { Paginador } from '../../core/components/Paginador'
import { useNavigate } from 'react-router-dom'
import { BuscadorCodigoStock } from './BuscadorCodigoStock'

export const TablaCodigoStock = () => {
    const navigate = useNavigate();
    const [buscador, setBuscador] = useState<BuscadorCodigoStockI>({
        codigo:'',
        fechaFin:'',
        fechaInicio:''
    })
    const {token} = useContext(AutenticacionContext)
    const [data, setData] = useState<CodigoStock[]>([])
    const [limite , setLimite]=useState(20)
    const [paginas , setPaginas]=useState(1)
    const [pagina , setPagina]=useState(1)
    useEffect(()=>{
        codigoStock()
    },[buscador, limite , pagina])

    const codigoStock = async() =>{
        try {
        if(token){
            const response = await listarCodigoStock(token, buscador,limite, pagina)
 
            
                    setData(response.data)
                    setPaginas(response.paginas)
        }
        } catch (error) {

            
        }

    }
  return (
    <div>
      <BuscadorCodigoStock onsubmit={setBuscador}/>  
          <ItemsPorPagina page={setLimite}/>
          <table className="w-full table-auto border-collapse border border-gray-300 text-xs mx-auto">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-3 py-2">Codigo transferencia</th>
                <th className="px-3 py-2">Usuario</th>
                <th className="px-3 py-2">Fecha</th>
                <th className="px-3 py-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((item)=>(
                  <tr className="bg-white hover:bg-gray-100  text-sm">
                  <th className="px-3 py-2">{item.codigo}</th>
                  <th className="px-3 py-2">{item.usuario}</th>
                  <th className="px-3 py-2">{item.fecha}</th>
                  <th className="px-3 py-2"> <button><IoIosInformationCircle onClick={()=> navigate(`/informacion/codigo/stock/${item._id}`)}  /></button> </th>
                </tr>
                ))
              }
            </tbody>
          </table>
          <Paginador paginas={paginas} paginaSeleccionada={setPagina} paginaActual={pagina}/>
        

    </div>
  )
}

