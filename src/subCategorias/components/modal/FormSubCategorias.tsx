import  { useState } from 'react'
import { errorPropiedadesI } from '../../../interfaces/errorPropiedades';
import { httAxiosError } from '../../../utils/error/error.util';
import { HttpStatus } from '../../../enums/httStatusEnum';
import { formSubCategoriaI } from '../../interfaces/formSubCategoriaInterface';
import { useForm } from 'react-hook-form';

import { listarCategorias } from '../../../categorias/service/categoriasApi';
import { categoriasI } from '../../../categorias/interfaces/categoriasInterface';
import { crearSubCategoria } from '../../services/subCategoriasApi';
import { errorClassValidator } from '../../../utils/error/errorClassValidator';

export const FormSubCategorias = () => {
      const { register, handleSubmit } = useForm<formSubCategoriaI>();
      const [isOpen, setIsOpen] = useState<boolean>(false);
      const [mensaje, setMensaje] = useState<string>();
      const [categorias, setCategorias] = useState<categoriasI[]>([]);
      const [mensajePropiedades, setMensajePropiedades] = useState<
        errorPropiedadesI[]
      >([]);
        const openModal = async () => {
          try {
            const response = await listarCategorias();
            setCategorias(response);
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

        
          const onSudmit = async (data: formSubCategoriaI) => {
            try {
         
              const response = await crearSubCategoria(data);
              if (response.status == HttpStatus.CREATED) {
                setMensaje(response.message);
                setMensajePropiedades([])
              }
            } catch (error) {     
              const e = httAxiosError(error);
              if (e.response.status == HttpStatus.CONFLICT) {
                setMensaje(e.response.data.message);
                setMensajePropiedades([])
              } else if (e.response.status == HttpStatus.BAD_REQUEST) {                
              Array.isArray(e.response.data.errors) && setMensajePropiedades(errorClassValidator(e.response.data.errors));
              }
            }
          };
      
  return (
<div className="p-4">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Crear Sub Categoria
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Crear Nuevo Sub Categoria</h2>
            <form onSubmit={handleSubmit(onSudmit)}>
              <div className="mb-4">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de Sub Categoria
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
                  Nombre de la Sub Categoria
                </label>
                <select
                  id="nombre"
                  {...register("categoria")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecciona una Categoria</option>
                  {categorias.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>


              
            <div>

                {mensajePropiedades.length > 0 &&
                mensajePropiedades.map((item) => {
                  if (item.propiedad === "categoria") {
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
  )
}
