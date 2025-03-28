import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formProveedorEmpresaI } from "../interface/formEmpresaInterface";
import { errorPropiedadesI } from "../../core/interfaces/errorPropiedades";
import { crearProveedorEmpresas } from "../services/proveedorEmpresaApi";
import { HttpStatus } from "../../core/enums/httStatusEnum";
import { errorClassValidator } from "../../core/utils/errorClassValidator";
import { httAxiosError } from "../../core/utils/error.util";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { RecargarDataI } from "../../core/interfaces/recargarData";


export const CrearProveedorEmpresa = ({recargar, setRecargar}:RecargarDataI) => {
  const { register, handleSubmit , reset, watch} = useForm<formProveedorEmpresaI>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mensaje, setMensaje] = useState<string>();
  const [conflicto, setConflicto] = useState<string>();
   const {token}=useContext(AutenticacionContext)
  useEffect(()=>{
    if(conflicto){
      setConflicto('')
    }
  },[watch('nit')])
  const [mensajePropiedades, setMensajePropiedades] = useState<
    errorPropiedadesI[]
  >([]);
  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const onSubmit = async (data: formProveedorEmpresaI) => {
    try {
      if(token){
        const response = await crearProveedorEmpresas(data, token);
        if (response.status == HttpStatus.CREATED) {
          setMensaje(response.message);
          setMensajePropiedades([]);
          setRecargar(!recargar)
          reset()
        }
      }
    } catch (error) {
      const e = httAxiosError(error);
      if (e.response.status == HttpStatus.BAD_REQUEST) {
        setMensajePropiedades(errorClassValidator(e.response.data.errors));
      }

      if(e.response.status === HttpStatus.CONFLICT){
          setConflicto(e.response.data.message)
        
      }
    }
  };

  return (
    <div>
  <button
    onClick={openModal}
    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
  >
    Añadir proveedor
  </button>

  {isOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Formulario de Proveedor Empresa
          </h2>
          <button
            onClick={closeModal}
            className="text-xl font-bold text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre de la Empresa:
              </label>
              <input
                type="text"
                id="nombre"
                {...register("nombre")}
                placeholder="Ingresa el nombre de la empresa"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              />
              {mensajePropiedades.length > 0 &&
                mensajePropiedades.map((item) => {
                  if (item.propiedad === "nombre") {
                    return item.errors.map((e) => (
                      <p  className="text-red-500" key={item.propiedad}>{e}</p>
                    ));
                  } else {
                    return null;
                  }
                })}
            </div>

            <div className="mb-4">
              <label
                htmlFor="nit"
                className="block text-sm font-medium text-gray-700"
              >
                NIT de la Empresa:
              </label>
              <input
                type="text"
                id="nit"
                {...register("nit")}
                placeholder="Ingresa el NIT de la empresa"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              />
              {mensajePropiedades.length > 0 &&
                mensajePropiedades.map((item) => {
                  if (item.propiedad === "nit") {
                    return item.errors.map((e) => (
                      <p  className="text-red-500" key={item.propiedad}>{e}</p>
                    ));
                  } else {
                    return null;
                  }
                })}
                {conflicto &&   <p  className="text-red-500">{conflicto}</p>}
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
                placeholder="Ingresa el correo electrónico"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              />
              {mensajePropiedades.length > 0 &&
                mensajePropiedades.map((item) => {
                  if (item.propiedad === "correo") {
                    return item.errors.map((e) => (
                      <p  className="text-red-500" key={item.propiedad}>{e}</p>
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
                placeholder="Ingresa la ciudad de la empresa"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              />
              {mensajePropiedades.length > 0 &&
                mensajePropiedades.map((item) => {
                  if (item.propiedad === "ciudad") {
                    return item.errors.map((e) => (
                      <p className="text-red-500"  key={item.propiedad}>{e}</p>
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
                placeholder="Ingresa la dirección de la empresa"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              />
              {mensajePropiedades.length > 0 &&
                mensajePropiedades.map((item) => {
                  if (item.propiedad === "direccion") {
                    return item.errors.map((e) => (
                      <p  className="text-red-500" key={item.propiedad}>{e}</p>
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
                placeholder="Ingresa el número de celular"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              />
              {mensajePropiedades.length > 0 &&
                mensajePropiedades.map((item) => {
                  if (item.propiedad === "celular") {
                    return item.errors.map((e) => (
                      <p className="text-red-500" key={item.propiedad}>{e}</p>
                    ));
                  } else {
                    return null;
                  }
                })}
            </div>
          </div>
          {mensaje && <span>{mensaje}</span>}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4"
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
