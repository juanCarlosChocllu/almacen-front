import {useContext, useEffect, useState } from "react";
import { marcasPublicas } from "../../marca/service/marcaApi";
import { marcaI } from "../../marca/interfaces/marcaInterface";
import { empresaI } from "../../empresa/interfaces/empresaInterface";
import { listarSucursalEmpresaBuscador } from "../../sucursal/services/sucursalService";
import { sucursalI } from "../../sucursal/interface/sucursalInterface";
import { almacenSucursalI } from "../../almacenSucursal/interfaces/almacenSucursalInterface";
import { listraAlmacenPorSucursalBuscador } from "../../almacenSucursal/services/almacenSucursalService";
import { useForm } from "react-hook-form";
import { BuscadorTransFerenciaI } from "../interface/buscadorTransferencia";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { listarEmpresaPublic } from "../../empresa/services/empresaApi";


export const BuscadorTransferencia = ({onsudmit}:{onsudmit(data:BuscadorTransFerenciaI):  void }) => {
  const {token}=useContext(AutenticacionContext)
  const [marcas, setMarcas] = useState<marcaI[]>([]);
  const [empresas, setEmpresas] = useState<empresaI[]>([]);
    const [empresaSeleccioanda, setEmpresaSeleccioanda] = useState<string>();
    const [sucursales, setSucursales] = useState<sucursalI[]>([]);
    const [almacenes, setAlmacenes] = useState<almacenSucursalI[]>([]);
    const [sucursalSelecionada, setSucursalSeleccioando] = useState<string>();
    const {register,handleSubmit, formState:{errors} , watch}=useForm<BuscadorTransFerenciaI>()
    const fechaInicio = watch('fechaInicio')
    const fechaFin = watch('fechaFin')



  useEffect(() => {
    marca();
    empresa();
    if(empresaSeleccioanda){
        sucursal()
    }
    if(sucursalSelecionada){
        almacen()
    }
  }, [empresaSeleccioanda,sucursalSelecionada]);

  const marca = async () => {
    try {
     if(token){
      const response = await marcasPublicas(token);
      setMarcas(response);
     }
    } catch (error) {
      console.log(error);
    }
  };

  const empresa = async () => {
    try {
      if(token){
        const response = await listarEmpresaPublic(token);
        setEmpresas(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const sucursal = async () => {
    try {
     if(token){
      const response = await listarSucursalEmpresaBuscador(empresaSeleccioanda,token);
      setSucursales(response)
     }
    } catch (error) {
      console.log(error);
    }
  };

  const almacen = async () => {
    try {
    if(sucursalSelecionada && token){
        const response = await listraAlmacenPorSucursalBuscador(sucursalSelecionada, token);
        setAlmacenes(response)
    }
    } catch (error) {
      console.log(error);
    }
  };
  return (
   <>
<form onSubmit={handleSubmit(onsudmit)}> 
  <div className="flex flex-wrap gap-4">
    <div className="flex flex-col space-y-1 w-1/6">
      <label htmlFor="codigo" className="text-gray-700 font-medium text-sm">Código</label>
      <input 
      {...register('codigo')}
        type="text" 
        id="codigo"
        className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex flex-col space-y-1 w-1/6">
      <label htmlFor="marca" className="text-gray-700 font-medium text-sm">Marca</label>
      <select 
        {...register('marca')}
        id="marca" 
        className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione una marca</option>
        {marcas.map((item) => (
          <option key={item._id} value={item._id}>
            {item.nombre}
          </option>
        ))}
      </select>
    </div>

    <div className="flex flex-col space-y-1 w-1/6">
      <label htmlFor="empresa" className="text-gray-700 font-medium text-sm">Empresas</label>
      <select 
        id="empresa" 
        onChange={(e) => {
          const target = e.target as HTMLSelectElement;
          console.log(target.value);
          setEmpresaSeleccioanda(target.value);
        }}
        className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione una empresa</option>
        {empresas.map((item) => (
          <option key={item._id} value={item._id}>
            {item.nombre}
          </option>
        ))}
      </select>
    </div>

    <div className="flex flex-col space-y-1 w-1/6">
      <label htmlFor="sucursal" className="text-gray-700 font-medium text-sm">Sucursal</label>
      <select 
        {...register('sucursal')}
        id="sucursal" 
        onChange={(e) => {
          const target = e.target as HTMLSelectElement;
          setSucursalSeleccioando(target.value);
        }}
        className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione una sucursal</option>
        {sucursales.map((item) => (
          <option key={item._id} value={item._id}>
            {item.nombre}
          </option>
        ))}
      </select>
    </div>

    <div className="flex flex-col space-y-1 w-1/6">
      <label htmlFor="almacen" className="text-gray-700 font-medium text-sm">Almacén</label>
      <select 
        {...register('almacenSucursal')}
        id="almacen" 
        className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione un almacén</option>
        {almacenes.map((item) => (
          <option key={item._id} value={item._id}>
            {item.nombre}
          </option>
        ))}
      </select>
    </div>

    <div className="flex flex-col space-y-1 w-1/6">
      <label htmlFor="tipo" className="text-gray-700 font-medium text-sm">Tipo</label>
      <select 
        {...register('tipo')}
        id="tipo"
        className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione un tipo</option>
        <option value="REGALO">REGALO</option>
        <option value="VENTA">VENTA</option>
      </select>
    </div>
    <div className="flex flex-col space-y-1 w-1/6">
      <label htmlFor="fechaInicio" className="text-gray-700 font-medium text-sm">Fecha Inicio</label>
      <input 
             {...register('fechaInicio', {validate:(value)=>{
                if( fechaFin && ! value){
                    return 'Seleccione una fecha'
                }
                return true
             }})}
        type="date" 
        id="fechaInicio" 
        className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
            {errors.fechaInicio && <p>{errors.fechaInicio.message}</p>}
    </div>

    <div className="flex flex-col space-y-1 w-1/6">
      <label htmlFor="fechaFin" className="text-gray-700 font-medium text-sm">Fecha Fin</label>
      <input 
         {...register('fechaFin', {validate: (value)=> {
            if( fechaInicio && ! value){
                return 'Seleccione una fecha'
            }
            return true
         }
          }) }
        type="date" 
        id="fechaFin" 
        className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.fechaFin && <p>{errors.fechaFin.message}</p>}
    </div>
  </div>

  <div className="mt-4 text-center">
    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Buscar</button>
  </div>
</form>

   </>


  );
};


