import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { dataCategoria } from "../interfaces/categoriasInterface";
import { httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface";
import { editarCategoria } from "../service/categoriasService";

import { HttpStatus } from "../../core/enums/httStatusEnum";

import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";


export const EditarCategorias = ({ recargar, setRecargar,categoria,closeModal,idCategoria,isOpen}:{recargar:boolean,setRecargar:(recargar:boolean)=>void, idCategoria:string, categoria:string, isOpen:boolean, closeModal:()=>void}) => {
    const {token}=useContext(AutenticacionContext)
  const{ register,handleSubmit, setValue, formState:{errors}}=useForm<dataCategoria>()



    useEffect(()=>{
        setValue("nombre", categoria)
    },[])

  const  onSubmit = async(data:dataCategoria)=>{
    try {
      if(token){
        const response:httpRespuetaI = await editarCategoria(data, token, idCategoria)        
        if(response.status === HttpStatus.OK){
          setRecargar(!recargar)
          closeModal()
        }
      }
    } catch (error) {
        console.log(error);
        
      
    }
  }

  return (
    <>

    {isOpen &&  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Agregar Nueva Categoría</h2>
        <form  onSubmit={handleSubmit(onSubmit)} >
          <div className="mb-4">
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Nombre de la Categoría</label>
            <input
              type="text"
              id="nombre"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              
              {...register('nombre',{required:'Ingrese la categoria'})}
            />
             {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
          </div>

          <div className="flex justify-end space-x-4">
            <button 
              type="button" 
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>}
    </>
  );
}
