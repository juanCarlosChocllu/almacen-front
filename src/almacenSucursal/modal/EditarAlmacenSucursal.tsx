import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { HttpStatus } from "../../core/enums/httStatusEnum";


import { formAlmacenSucursalI } from "../interfaces/formAlmacenSucursal";
import { empresaI } from "../../empresa/interfaces/empresaInterface";
import { listarEmpresaPublic } from "../../empresa/services/empresaApi";
import { sucursalI } from "../../sucursal/interface/sucursalInterface";
import { listarSucursalEmpresaBuscador } from "../../sucursal/services/sucursalApi";
import { actulizarAlmacenSucursal, obtenerSucursalAlmacen } from "../services/almacenSucursalService";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";


export const EditarAlmacenSucursal = ({ id,recargar,setRecargar,closeModal,isOpen}:{ id:string,isOpen:boolean,recargar:boolean, setRecargar:( recargar:boolean)=>void , closeModal:()=>void}) => {
  
const {token}=useContext(AutenticacionContext)
  const { register, handleSubmit , watch, setValue, formState:{errors}} = useForm<formAlmacenSucursalI>();  
  const [empresas, setEmpresas] = useState<empresaI[]>([]);
  const [sucursales, setSucursales] = useState<sucursalI[]>([]);
  const empresa = watch('empresa')

  
    
  useEffect(()=>{
    empresasPublic()
    if(isOpen) {
      obtenerAlmacen()
    }

  },[]) 

  useEffect(()=>{
    listarSucursal()
  },[empresa])




  
   const listarSucursal=async()=>{
     try {
        if(empresa){
         if(token){
          const response = await listarSucursalEmpresaBuscador(empresa, token)  
          setSucursales(response)
         }
        }
     } catch (error) {
        console.log(error);
        
     }
   }

   const obtenerAlmacen = async()=> {
      try {
        if(id && token) {
          const response =  await obtenerSucursalAlmacen(id, token)  
           setValue("nombre", response.nombre)
          setValue("empresa", response.empresa)
          setTimeout(() => {   
            setValue("sucursal", response.sucursal);
          }, 100);
          
          
        }
      } catch (error) {
        console.log(error);
        
      }
   }

  const empresasPublic = async () => {
    try {
     if(token){
      const response = await listarEmpresaPublic(token);
      setEmpresas(response);
     }
    
    } catch (error) {
      console.log(error);
    }
  };

  
  const onSudmit = async (data: formAlmacenSucursalI) => {
     try {
       if(token){
        data.empresa ? delete data.empresa :delete data.empresa
        const response = await actulizarAlmacenSucursal(data, token,id);
        if (response.status == HttpStatus.OK) {
           setRecargar(!recargar)
          closeModal()
        }
       }
    } catch (error) {     
        console.log(error);
        
    }
  };

  return (
    <div className="p-4">
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Crear Nuevo Almacen</h2>
            <form onSubmit={handleSubmit(onSudmit)}>
              <div className="mb-4">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de almacen
                </label>
                <input
                  type="text"
                  id="nombre"
                  {...register("nombre",{required:'Ingrese el nombre del almcane'})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.nombre &&  <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
              </div>
              

              <div className="mb-4">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de la Empresa
                </label>
                <select
                  id="nombre"
                  {...register("empresa", {required:'Seleccione una empresa'})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecciona una Empresa</option>
                  {empresas.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.nombre}
                    </option>
                  ))}
                  
                </select>
                {errors.empresa &&  <p className="text-red-500 text-sm">{errors.empresa.message}</p>}
              </div>


              <div className="mb-4">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de la Sucursal
                </label>
                <select
                  id="nombre"
                  {...register("sucursal",{required:'Seleccione una sucursal'})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecciona una sucursal</option>
                  {sucursales.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
                {errors.sucursal &&  <p className="text-red-500 text-sm">{errors.sucursal.message}</p>}

                
              </div>



              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
