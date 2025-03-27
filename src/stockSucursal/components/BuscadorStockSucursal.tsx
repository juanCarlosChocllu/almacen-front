import { useContext, useEffect, useState } from "react";
import { almacenSucursalI } from "../../almacenSucursal/interfaces/almacenSucursalInterface";
import { marcaI } from "../../marca/interfaces/marcaInterface";
import { marcasPublicas } from "../../marca/service/marcaApi";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { listarAlmacenPublicas,  } from "../../almacenSucursal/services/almacenSucursalService";
import { useForm } from "react-hook-form";
import { BuscadorStockSucursalI } from "../interfaces/buscadorStockSucursal";
import { listarEmpresaPublic } from "../../empresa/services/empresaApi";
import { empresaI } from "../../empresa/interfaces/empresaInterface";
import { PermisosContext } from "../../autenticacion/context/permisos.context";

import { TipoUsuarioE } from "../../core/enums/tipoUsuario";
import { listarSucursalEmpresaBuscador } from "../../sucursal/services/sucursalApi";
import { sucursalI } from "../../sucursal/interface/sucursalInterface";

export const BuscadorStockSucursal = ({onSubmit}:{onSubmit (data:BuscadorStockSucursalI):void}) => {
  const {register, handleSubmit, watch}=useForm<BuscadorStockSucursalI>()
  const empresa = watch("empresa")
  const sucursal = watch("sucursal") || undefined
  const {token }=useContext(AutenticacionContext)
  const { tipo} =useContext(PermisosContext)
  console.log(sucursal);
  
  const [almacenes, setAlmacenes] = useState<almacenSucursalI[]>([]);
  const [empresas, setEmpresas] = useState<empresaI[]>([]);
  const [sucursales, setSucursales] = useState<sucursalI[]>([]);
  const [marcas, setMarcas] = useState<marcaI[]>([]);
  useEffect(()=>{
    if(token){
      (async()=>{
        try {
            const response = await marcasPublicas(token)
            setMarcas(response)
        } catch (error) {
          
        }
      })(),

      (async()=>{
        try {
            if(token){
             const response = await listarAlmacenPublicas(sucursal, token)
              setAlmacenes(response)
            }
        } catch (error) {
          console.log(error);
          
        }
      })()
    }


  },[empresa, sucursal])


  useEffect(()=>{
    listarEmpresa()
    listarSucursal()
  },[empresa])

  
    const listarEmpresa=async()=>{
      try {
         if(token){
          const respose = await listarEmpresaPublic(token)
          setEmpresas(respose)
         }
      } catch (error) {
        
      }
    }
    const listarSucursal=async()=>{
      try {
         if(token && empresa){
          const response = await listarSucursalEmpresaBuscador(empresa,token)
       
          
          setSucursales(response)
         }
      } catch (error) {
        
      }
    }

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
          

        {
          tipo !== TipoUsuarioE.SUCURSAL &&  <div className="flex flex-col">
          <label htmlFor="empresa" className="text-gray-600 font-medium mb-2">Empresa</label>
          <select
             {...register('empresa')}
            name="empresa"
            id="empresa"
            className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="">Seleccione la empresa</option>
            {empresas.map((item)=> <option key={item._id} value={item._id}> {item.nombre} </option> )}
          </select>
        </div>
        }

{
          tipo !== TipoUsuarioE.SUCURSAL &&  <div className="flex flex-col">
          <label htmlFor="almacenSucursal" className="text-gray-600 font-medium mb-2">Sucursal</label>
          <select
             {...register('sucursal')}
            name="sucursal"
            id="sucursal"
            className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="">Seleccione la sucursal</option>
            {sucursales.map((item)=> <option key={item._id} value={item._id}> {item.nombre} </option> )}
          </select>
        </div>
        }

          
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
