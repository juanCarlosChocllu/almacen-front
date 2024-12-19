import { useState } from "react";
import { useForm } from "react-hook-form";
import { dataCategoria } from "../../interfaces/categoriasInterface";
import { httpRespuetaI } from "../../../interfaces/httpRespuestaInterface";
import { crearCategoria } from "../../service/categoriasApi";
import { httpAxiosErrorI } from "../../../interfaces/httpErrorInterface";

export const FormCategorias = () => {
  const{ register,handleSubmit}=useForm<dataCategoria>()
  const [modalClose, setModalClose] = useState<Boolean>(false)
  const [mensajeError, setMensajeError] = useState<string | null>(null)
  const abrirModal=(cerrar:boolean)=>{
    setModalClose(cerrar)
  }
  const  onSubmit = async(data:dataCategoria)=>{
    try {
      const response:httpRespuetaI = await crearCategoria(data)
      if(response.status === 201){
        setMensajeError('Categoria registrada')
      }
    } catch (error) {
      const err = error as httpAxiosErrorI
      if(err.response.data.statusCode === 409){
        setMensajeError(err.response.data.message)
      }
    }
  }

  return (
    <>
<button
  className="bg-blue-500 text-white px-4 py-2 rounded-sm shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
  onClick={() => abrirModal(true)}
>
  Abrir Formulario
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
              required
              {...register('nombre')}
            />
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
              Agregar Categoría
            </button>
          </div>
        </form>
      </div>
    </div>}
    </>
  );
}
