import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { dataCategoria } from "../interfaces/categoriasInterface";
import { httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface";
import { crearCategoria } from "../service/categoriasService";
import { errorPropiedadesI } from "../../core/interfaces/errorPropiedades";

import { HttpStatus } from "../../core/enums/httStatusEnum";

import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { httAxiosError } from "../../core/utils/error.util";
import { errorClassValidator } from "../../core/utils/errorClassValidator";
import { RecargarDataI } from "../../core/interfaces/recargarData";

export const CrearCategorias = ({ recargarData, setRecargarData}:RecargarDataI) => {
    const {token}=useContext(AutenticacionContext)
  const{ register,handleSubmit}=useForm<dataCategoria>()
  const [modalClose, setModalClose] = useState<Boolean>(false)
  const [mensajeError, setMensajeError] = useState<string>()
    const [mensajePropiedades, setMensajePropiedades] = useState<
      errorPropiedadesI[]
    >([]);
  const abrirModal=(cerrar:boolean)=>{
    setModalClose(cerrar)
  }
  const  onSubmit = async(data:dataCategoria)=>{
    try {
      if(token){
        const response:httpRespuetaI = await crearCategoria(data, token)
        if(response.status === 201){
          setMensajeError('Categoria registrada')
          setRecargarData(!recargarData)
        }
      }
    } catch (error) {
      
      const err = httAxiosError(error)
      console.log(err);
      
      if(err.response.data.statusCode === HttpStatus.CONFLICT){
        setMensajeError(err.response.data.message)
      }else if(err.response.data.statusCode === HttpStatus.BAD_REQUEST){
      Array.isArray(err.response.data.errors)&& setMensajePropiedades(errorClassValidator(err.response.data.errors))
      }
    }
  }

  return (
    <>
<button
  className="bg-blue-500 text-white px-4 py-2 rounded-sm shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
  onClick={() => abrirModal(true)}
>
  Añadir Categoria
</button>


    {modalClose &&  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Agregar Nueva Categoría</h2>
        <form  onSubmit={handleSubmit(onSubmit)} >
          <div className="mb-4">
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Nombre de la Categoría</label>
            <input
              type="text"
              id="nombre"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              
              {...register('nombre')}
            />
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
          </div>
          <span>{mensajeError ? mensajeError :''}</span>
          <div className="flex justify-end space-x-4">
            <button 
              type="button" 
              onClick={()=>abrirModal(false)}
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
