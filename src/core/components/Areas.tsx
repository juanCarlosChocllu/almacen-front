import React, { useContext, useEffect, useState } from 'react'
import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context'
import { listarDetalleArea } from '../services/coreService'
import { DetalleAreaI } from '../interfaces/detalleArea'

export const Areas = ({onsubmit}:{onsubmit:(area:string)=>void}) => {
    const {token}= useContext(AutenticacionContext)
    const [areas , setAreas]=useState<DetalleAreaI[]>([])
    useEffect(()=>{
        listarAreas()
    },[])

    const listarAreas =async()=>{
        try {
            if(token){
                const response = await listarDetalleArea(token)
                setAreas(response)
            }
        } catch (error) {
            
        }
    }
  return (
    <div className="max-w-sm mx-auto">
    <label htmlFor="area" className="block text-sm font-medium text-gray-700">
Areas
    </label>
    <select
        onChange={(e)=>{
            const data = e.target  as HTMLSelectElement
            onsubmit(data.value)
        }}
      id="area"
      className="mt-2 block w-40 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    >   
      <option value=''>Seleccione un area</option>
      {areas.map((item) => (
        <option key={item._id} value={item._id}>
          {item.area}
        </option>
      ))}
    </select>
  </div>
  
  )
}

