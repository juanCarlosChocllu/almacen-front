import { useState } from "react";
import { useForm } from "react-hook-form";
import { formProveedorEmpresaI } from "../../interface/formEmpresaInterface";
import { crearProveedorEmpresas } from "../../services/proveedorEmpresaApi";
import { HttpStatus } from "../../../enums/httStatusEnum";
import { httAxiosError } from "../../../utils/error/error.util";
import { errorPropiedadesI } from "../../../interfaces/errorPropiedades";
import { errorClassValidator } from "../../../utils/error/errorClassValidator";

export const FormProveedorEmpresa = () => {
  const { register, handleSubmit } = useForm<formProveedorEmpresaI>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mensaje, setMensaje] = useState<string>("");

  const [mensajePropiedades, setMensajePropiedades] = useState<
    errorPropiedadesI[]
  >([]);
  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const onSubmit = async (data: formProveedorEmpresaI) => {
    try {
      const response = await crearProveedorEmpresas(data);
      if (response.status == HttpStatus.CREATED) {
        setMensaje(response.message);
        setMensajePropiedades([]);
      }
    } catch (error) {
      const e = httAxiosError(error);
      if (e.response.status == HttpStatus.BAD_REQUEST) {
        setMensajePropiedades(errorClassValidator(e.response.data.errors));
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
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
                        <p key={item.propiedad}>{e}</p>
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
                        <p key={item.propiedad}>{e}</p>
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
                  placeholder="Ingresa el correo electrónico"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                />
                {mensajePropiedades.length > 0 &&
                  mensajePropiedades.map((item) => {
                    if (item.propiedad === "correo") {
                      return item.errors.map((e) => (
                        <p key={item.propiedad}>{e}</p>
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
                        <p key={item.propiedad}>{e}</p>
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
                        <p key={item.propiedad}>{e}</p>
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
                        <p key={item.propiedad}>{e}</p>
                      ));
                    } else {
                      return null;
                    }
                  })}
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
