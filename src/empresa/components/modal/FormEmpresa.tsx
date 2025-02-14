import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { formEmpresaI } from "../../interfaces/formEmpresaInterface";
import { crearEmpresa } from "../../services/empresaApi";
import { HttpStatus } from "../../../core/enums/httStatusEnum";

import { errorPropiedadesI } from "../../../core/interfaces/errorPropiedades";

import { AutenticacionContext } from "../../../autenticacion/context/crear.autenticacion.context";
import { errorClassValidator } from "../../../core/utils/errorClassValidator";
import { httAxiosError } from "../../../core/utils/error.util";

export const FormEmpresa = () => {
  const {token}=useContext(AutenticacionContext)
  const { register, handleSubmit } = useForm<formEmpresaI>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mensaje, setMensaje] = useState<string>();
  const [mensajePropiedades, setMensajePropiedades] = useState<
    errorPropiedadesI[]
  >([]);
  const openModal = () => {
    setMensaje('')
    setMensajePropiedades([])
    setIsOpen(true)
  };

  const closeModal = () => {
    setMensaje('')
    setMensajePropiedades([])
    setIsOpen(false)
  };

  const onSudmit = async (data: formEmpresaI) => {
    try {
     if(token){
      const response = await crearEmpresa(data,token);
      if (response.status == HttpStatus.CREATED) {
        setMensaje(response.message);
        setMensajePropiedades([])
   
      }
     }
    } catch (error) {
      const e = httAxiosError(error);      
      if (e.response.status == HttpStatus.CONFLICT) {
        setMensaje(e.response.data.message);
      } else if (e.response.status == HttpStatus.BAD_REQUEST) {   
        Array.isArray(e.response.data.errors) &&  setMensajePropiedades(errorClassValidator(e.response.data.errors))
    
      }
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Crear Empresa
      </button>

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
