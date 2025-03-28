import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {modulosConAcciones} from '../utils/modulos.utils'
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { PermisosI } from "../../permisos/interfaces/permisoInterface";
import { verificarPermisosPorRol } from "../../permisos/services/permisosApi";
import { editarRol } from "../services/rolService";
import { HttpStatus } from "../../core/enums/httStatusEnum";
import { PropsEditarRol } from "../interface/PropsEditarRol";


export const EditarRoles = ({id,closeModal,isOpen, rol}:PropsEditarRol) => {
  const { register, handleSubmit, setValue} = useForm<any>();
  const {token}= useContext(AutenticacionContext) 
  const [verPermisos, setVerPermisos] = useState<PermisosI[]>([])
    useEffect(()=>{
        permisos()
    },[id])

    useEffect(()=>{
        setValue('rol', rol)
            if (verPermisos.length > 0) {
        verPermisos.forEach(({ modulo, acciones }) => {
          acciones.forEach((accion) => {
            setValue(`modulos.${modulo}.${accion}`, true);
          });
        })}
    }, [verPermisos])

  const onSubmit = async (data: any) => {
    let dataR:  any = {
      nombre: data.rol,
      permisos: [], 
    };

    for (const modulo of Object.keys(data.modulos)) {
      const accionesSeleccionadas = Object.keys(data.modulos[modulo])
        .filter((accion) => data.modulos[modulo][accion]) 
        .map((accion) => accion); 

      if (accionesSeleccionadas.length > 0) {
      
        dataR.permisos.push({
          modulo, 
          acciones: accionesSeleccionadas, 
        });
      }
    }

    try {
        
        if(token){            
         const response = await editarRol(dataR, token, id)
            if(response.status == HttpStatus.OK) {
                closeModal()
            }
        }
    } catch (error) {
        console.log(error);
        
    }
  };

  const permisos=async()=>{
    try {
      if(token){
        const response = await verificarPermisosPorRol(id,token)
        console.log(response);
        
        setVerPermisos(response)
      }
       
    } catch (error) {
        
    }
  }  



  return (
    <>
      

      {isOpen && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[90%] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
              PERMISOS
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="mb-4">
                <label htmlFor="rol" className="block text-sm font-medium text-gray-700">
                  Nombre del Rol
                </label>
                <input
                  {...register("rol", { required: true })}
                  type="text"
                  id="rol"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="modulos" className="block text-sm font-medium text-gray-700">
                  Selecciona los módulos y permisos
                </label>
                <div className="space-y-4">
                  {Object.keys(modulosConAcciones).map((modulo) => (
                    <div key={modulo}>
                      <h3 className="font-medium text-gray-700">{modulo}</h3>
                      <div className="flex flex-wrap gap-4">
                        {modulosConAcciones[modulo].map((accion) => (
                          <div key={accion} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`${modulo}-${accion}`}
                              {...register(`modulos.${modulo}.${accion}`)}
                              className="mr-2"
                            />
                            <label htmlFor={`${modulo}-${accion}`} className="text-sm">
                              {accion}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-6 space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Guardar Rol
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
