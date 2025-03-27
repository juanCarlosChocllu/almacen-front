import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { HttpStatus } from "../../core/enums/httStatusEnum";

import { errorPropiedadesI } from "../../core/interfaces/errorPropiedades";

import { formAlmacenSucursalI } from "../interfaces/formAlmacenSucursal";
import { empresaI } from "../../empresa/interfaces/empresaInterface";
import { listarEmpresaPublic } from "../../empresa/services/empresaApi";
import { sucursalI } from "../../sucursal/interface/sucursalInterface";
import { listarSucursalEmpresaBuscador } from "../../sucursal/services/sucursalApi";
import { crearAlmacenSucursal } from "../services/almacenSucursalService";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { httAxiosError } from "../../core/utils/error.util";
import { errorClassValidator } from "../../core/utils/errorClassValidator";
import { RecargarDataI } from "../../core/interfaces/recargarData";

export const CrearAlmacenSucursal = ({ recargarData,setRecargarData}:RecargarDataI) => {
  
    const {token}=useContext(AutenticacionContext)
  const { register, handleSubmit , watch} = useForm<formAlmacenSucursalI>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mensaje, setMensaje] = useState<string>();
  const [mensajePropiedades, setMensajePropiedades] = useState<
    errorPropiedadesI[]
  >([]);
  const [empresas, setEmpresas] = useState<empresaI[]>([]);
  const [sucursales, setSucursales] = useState<sucursalI[]>([]);
  const empresa = watch('empresa')
  
    
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

  const openModal = async () => {
    try {
     if(token){
      const response = await listarEmpresaPublic(token);
      setEmpresas(response);
     }
      setMensaje("");
      setMensajePropiedades([]);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setMensaje("");
    setMensajePropiedades([]);
    setIsOpen(false);
  };

  const onSudmit = async (data: formAlmacenSucursalI) => {
     try {
       if(token){
        data.empresa ? delete data.empresa :delete data.empresa
        const response = await crearAlmacenSucursal(data, token);
        if (response.status == HttpStatus.CREATED) {
          setMensajePropiedades([]);
          setMensaje(response.message);
          setRecargarData(!recargarData)
        }
       }
    } catch (error) {     
      const e = httAxiosError(error);
      if (e.response.status == HttpStatus.CONFLICT) {
        setMensaje(e.response.data.message);
      } else if (e.response.status == HttpStatus.BAD_REQUEST) {
        setMensajePropiedades(errorClassValidator(e.response.data.errors));
      }
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Crear Almacen
      </button>

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
                  {...register("nombre")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {mensajePropiedades.length > 0 &&
                mensajePropiedades.map((item) => {
                  if (item.propiedad === "nombre") {
                    return item.errors.map((e) => (
                      <p key={item.propiedad}>{e}</p>
                    ));
                  } else {
                    return null;
                  }
                })}

              <div className="mb-4">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de la Empresa
                </label>
                <select
                  id="nombre"
                  {...register("empresa")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecciona una Empresa</option>
                  {empresas.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
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
                  {...register("sucursal")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecciona una sucursal</option>
                  {sucursales.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>


                {mensajePropiedades.length > 0 &&
                mensajePropiedades.map((item) => {
                  if (item.propiedad === "sucursal") {
                    return item.errors.map((e) => (
                      <p key={item.propiedad}>{e}</p>
                    ));
                  } else {
                    return null;
                  }
                })}
              </div>

              {mensaje && <p>{mensaje}</p>}

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
