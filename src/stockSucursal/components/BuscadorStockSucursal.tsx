import { useContext, useEffect, useState } from "react";
import { almacenSucursalI } from "../../almacenSucursal/interfaces/almacenSucursalInterface";
import { marcaI } from "../../marca/interfaces/marcaInterface";
import { listarMarcas } from "../../marca/service/marcaApi";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { listarAlmacenSucursal } from "../../almacenSucursal/services/almacenSucursalApi";
import { useForm } from "react-hook-form";
import { BuscadorStockSucursalI } from "../interfaces/buscadorStockSucursal";

export const BuscadorStockSucursal = ({onSubmit}:{onSubmit (data:BuscadorStockSucursalI):void}) => {
  const {register, handleSubmit}=useForm<BuscadorStockSucursalI>()
  const {token}=useContext(AutenticacionContext)
  const [almacenes, setAlmacenes] = useState<almacenSucursalI[]>([]);
  const [marcas, setMarcas] = useState<marcaI[]>([]);
  useEffect(()=>{
    if(token){
      (async()=>{
        try {
            const response = await listarMarcas(token)
            setMarcas(response)
        } catch (error) {
          
        }
      })(),

      (async()=>{
        try {
            const response = await listarAlmacenSucursal(token)
            setAlmacenes(response)
        } catch (error) {
          
        }
      })()
    }
  },[])

  

  return (
    <div >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="flex flex-col">
            <label htmlFor="codigo" className="text-gray-600 font-medium mb-2">Código</label>
            <input
            {...register('codigo')}
              type="text"
              name="codigo"
              id="codigo"
              className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          
    
          <div className="flex flex-col">
            <label htmlFor="almacenSucursal" className="text-gray-600 font-medium mb-2">Almacén</label>
            <select
               {...register('almacenSucursal')}
              name="almacenSucursal"
              id="almacenSucursal"
              className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="">Seleccione el Almacén</option>
              {almacenes.map((item)=> <option key={item._id} value={item._id}> {item.nombre} </option> )}
            </select>
          </div>

 
          <div className="flex flex-col">
            <label htmlFor="marca" className="text-gray-600 font-medium mb-2">Marca</label>
            <select
                       {...register('marca')}
              name="marca"
              id="marca"
              className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="">Seleccione la Marca</option>
                {marcas.map((item)=> <option key={item._id} value={item._id}> {item.nombre} </option> )}
            </select>
          </div>


          <div className="flex flex-col">
            <label htmlFor="tipo" className="text-gray-600 font-medium mb-2">Tipo</label>
            <select
              {...register('tipo')}
              name="tipo"
              id="tipo"
              className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="">Seleccione la Venta</option>
              <option value="REGALO">REGALO</option>
              <option value="VENTA">VENTA</option>
            </select>
          </div>
        </div>

  
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-200 transform hover:scale-105">
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};
