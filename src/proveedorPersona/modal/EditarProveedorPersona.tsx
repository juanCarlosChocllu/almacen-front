import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formProveedorPersonaI } from "../interfaces/formProveedorPersonaInterface";
import { errorPropiedadesI } from "../../core/interfaces/errorPropiedades";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import {  editarProveedorPersonas, obtenerProveedorPersona } from "../services/proveedorPersonaApi";
import { httAxiosError } from "../../core/utils/error.util";
import { errorClassValidator } from "../../core/utils/errorClassValidator";
import { HttpStatus } from "../../core/enums/httStatusEnum";

import { PropsEditarProveedorPersonaI } from "../interfaces/PropsEditarProveedorPersona";

export const EditarProveedorPersona = ({closeModal,id,isOpen,recargar,setRecargar}: PropsEditarProveedorPersonaI) => {
  const { register, handleSubmit, reset, watch, setValue } = useForm<formProveedorPersonaI>();

  const [mensaje, setMensaje] = useState<string>();
  const [conflictCi, setConflictCi] = useState<string>();
  const [mensajePropiedades, setMensajePropiedades] = useState<
    errorPropiedadesI[]
  >([]);
  const { token } = useContext(AutenticacionContext);

  const ci = watch('ci')

  useEffect(()=>{
    proveedor()
  },[])


  useEffect(() => {
    if(conflictCi){
      setConflictCi('')
    }
  } ,[ci])



  const onSubmit = async (data: formProveedorPersonaI) => {
    try {
      if (token) {
        const response = await editarProveedorPersonas(data, token, id);
        if (response.status == HttpStatus.OK) {
          setMensajePropiedades([]);
          setRecargar(!recargar);
          reset();
          closeModal()
        }
      }
    } catch (error) {
      console.log(error);

      const e = httAxiosError(error);
      if (e.response.status == HttpStatus.BAD_REQUEST) {
        setMensajePropiedades(errorClassValidator(e.response.data.errors));
      } else if (e.response.status == HttpStatus.CONFLICT) {
        setConflictCi(e.response.data.message);
        setMensajePropiedades([]);
      }
    }
  };

  const proveedor =  async()=>{
    try {
      if(token){
        const response = await obtenerProveedorPersona(id, token)
        setValue('ci', response.ci)
        setValue('nombres', response.nombres)
        setValue('apellidos', response.apellidos)
        setValue('celular', response.celular)
        setValue('ciudad', response.ciudad)
        setValue('correo', response.correo)
        setValue('nit', response.nit)
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div>
    

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Formulario de Proveedor Persona
              </h2>
              <button
                onClick={closeModal}
                className="text-xl font-bold text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 grid grid-cols-1 gap-4"
            >
              <div className="mb-4">
                <label
                  htmlFor="ci"
                  className="block text-sm font-medium text-gray-700"
                >
                  CI:
                </label>
                <input
                  type="text"
                  id="ci"
                  {...register("ci")}
                  placeholder="Ingresa tu CI"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg text-sm"
                />
                {mensajePropiedades.length > 0 &&
                  mensajePropiedades.map((item) => {
                    if (item.propiedad === "ci") {
                      return item.errors.map((e) => (
                        <p
                          key={item.propiedad}
                          className="text-xs text-red-500"
                        >
                          {e}
                        </p>
                      ));
                    } else {
                      return null;
                    }
                  })}
                {conflictCi && (
                  <span className="text-xs text-red-500">{conflictCi}</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="nit"
                  className="block text-sm font-medium text-gray-700"
                >
                  NIT:
                </label>
                <input
                  type="text"
                  id="nit"
                  {...register("nit")}
                  placeholder="Ingresa el NIT"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg text-sm"
                />
                {mensajePropiedades.length > 0 &&
                  mensajePropiedades.map((item) => {
                    if (item.propiedad === "nit") {
                      return item.errors.map((e) => (
                        <p
                          key={item.propiedad}
                          className="text-xs text-red-500"
                        >
                          {e}
                        </p>
                      ));
                    } else {
                      return null;
                    }
                  })}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="nombres"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombres:
                </label>
                <input
                  type="text"
                  id="nombres"
                  {...register("nombres")}
                  placeholder="Ingresa tus nombres"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg text-sm"
                />
                {mensajePropiedades.length > 0 &&
                  mensajePropiedades.map((item) => {
                    if (item.propiedad === "nombres") {
                      return item.errors.map((e) => (
                        <p
                          key={item.propiedad}
                          className="text-xs text-red-500"
                        >
                          {e}
                        </p>
                      ));
                    } else {
                      return null;
                    }
                  })}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="apellidos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellidos:
                </label>
                <input
                  type="text"
                  id="apellidos"
                  {...register("apellidos")}
                  placeholder="Ingresa tus apellidos"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg text-sm"
                />
                {mensajePropiedades.length > 0 &&
                  mensajePropiedades.map((item) => {
                    if (item.propiedad === "apellidos") {
                      return item.errors.map((e) => (
                        <p
                          key={item.propiedad}
                          className="text-xs text-red-500"
                        >
                          {e}
                        </p>
                      ));
                    } else {
                      return null;
                    }
                  })}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="correo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  id="correo"
                  {...register("correo")}
                  placeholder="Ingresa tu correo electrónico"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg text-sm"
                />
                {mensajePropiedades.length > 0 &&
                  mensajePropiedades.map((item) => {
                    if (item.propiedad === "correo") {
                      return item.errors.map((e) => (
                        <p
                          key={item.propiedad}
                          className="text-xs text-red-500"
                        >
                          {e}
                        </p>
                      ));
                    } else {
                      return null;
                    }
                  })}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="ciudad"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ciudad:
                </label>
                <input
                  type="text"
                  id="ciudad"
                  {...register("ciudad")}
                  placeholder="Ingresa tu ciudad"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg text-sm"
                />
                {mensajePropiedades.length > 0 &&
                  mensajePropiedades.map((item) => {
                    if (item.propiedad === "ciudad") {
                      return item.errors.map((e) => (
                        <p
                          key={item.propiedad}
                          className="text-xs text-red-500"
                        >
                          {e}
                        </p>
                      ));
                    } else {
                      return null;
                    }
                  })}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="direccion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dirección:
                </label>
                <input
                  type="text"
                  id="direccion"
                  {...register("direccion")}
                  placeholder="Ingresa tu dirección"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg text-sm"
                />
                {mensajePropiedades.length > 0 &&
                  mensajePropiedades.map((item) => {
                    if (item.propiedad === "direccion") {
                      return item.errors.map((e) => (
                        <p
                          key={item.propiedad}
                          className="text-xs text-red-500"
                        >
                          {e}
                        </p>
                      ));
                    } else {
                      return null;
                    }
                  })}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="celular"
                  className="block text-sm font-medium text-gray-700"
                >
                  Número de Celular:
                </label>
                <input
                  type="text"
                  id="celular"
                  {...register("celular")}
                  placeholder="Ingresa tu número de celular"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg text-sm"
                />
                {mensajePropiedades.length > 0 &&
                  mensajePropiedades.map((item) => {
                    if (item.propiedad === "celular") {
                      return item.errors.map((e) => (
                        <p
                          key={item.propiedad}
                          className="text-xs text-red-500"
                        >
                          {e}
                        </p>
                      ));
                    } else {
                      return null;
                    }
                  })}
              </div>

              {mensaje && (
                <span className="text-xs text-green-500">{mensaje}</span>
              )}
              <div className="flex justify-center col-span-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
