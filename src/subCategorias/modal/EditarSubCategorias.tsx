import { useContext, useEffect, useState } from 'react'

import { HttpStatus } from '../../core/enums/httStatusEnum';
import { formSubCategoriaI } from '../interfaces/formSubCategoriaInterface';
import { useForm } from 'react-hook-form';

import { listarCategorias } from '../../categorias/service/categoriasService';
import { categoriasI } from '../../categorias/interfaces/categoriasInterface';
import {editarSubCategoria } from '../services/subCategoriasApi';

import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context';
import { errorPropiedadesI } from '../../core/interfaces/errorPropiedades';
import { httAxiosError } from '../../core/utils/error.util';
import { errorClassValidator } from '../../core/utils/errorClassValidator';
import { PropsEditarSudCategoriasI } from '../interfaces/propsEditarSubCategoria';

export const EditarSubCategorias = ({ categoriaNombre, closeModal, idCategoria, idSudCategoria, isOpen, recargar, setRecargar }: PropsEditarSudCategoriasI) => {
  const { token } = useContext(AutenticacionContext)
  const { register, handleSubmit, setValue } = useForm<formSubCategoriaI>();
  const [mensaje, setMensaje] = useState<string>();
  const [categorias, setCategorias] = useState<categoriasI[]>([]);
  const [mensajePropiedades, setMensajePropiedades] = useState<
    errorPropiedadesI[]
  >([]);


  useEffect(() => {
    if (isOpen) {
      listaCategorias()
    }
  }, [])
  setValue('nombre', categoriaNombre)
  setValue('categoria', idCategoria)


  const listaCategorias = async () => {
    try {
      if (token) {
        const response = await listarCategorias(token);
        setCategorias(response);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const onSudmit = async (data: formSubCategoriaI) => {
    try {

      if (token) {
        const response = await editarSubCategoria(data, token, idSudCategoria);
        if (response.status == HttpStatus.OK) {
          setRecargar(!recargar)
          closeModal()
        }
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
