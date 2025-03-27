import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { formEmpresaI } from "../interfaces/formEmpresaInterface";
import {editarEmpresa } from "../services/empresaApi";
import { HttpStatus } from "../../core/enums/httStatusEnum";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";


export const EditarEmpresa = (
  { recargar,  idEmpresa,setRecargar,closeModal,isOpen ,empresa }:{
    empresa:string,
    recargar:boolean,
     isOpen:boolean,
     closeModal:()=>void,
     setRecargar:(
      recargar:boolean)=>void,
     idEmpresa:string
    
    } ) => {
  const {token}=useContext(AutenticacionContext)
  const { register, handleSubmit, setValue , formState:{errors} } = useForm<formEmpresaI>();

  

  useEffect(()=>{
    if(isOpen){
      setValue("nombre", empresa)
    }
  },[idEmpresa])
  const onSudmit = async (data: formEmpresaI) => {
    try {
     if(token){
      const response = await editarEmpresa(data,token, idEmpresa);      
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
            <h2 className="text-xl font-bold mb-4">Crear Nueva Empresa</h2>
            <form onSubmit={handleSubmit(onSudmit)}>
              <div className="mb-4">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de la empresa
                </label>
                <input
                  type="text"
                  id="nombre"
                  {...register("nombre", {required:'Ingrese el nombre de la empresa'})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              
              />
                { errors.nombre &&  <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
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
