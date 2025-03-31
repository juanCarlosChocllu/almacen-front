import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HttpStatus } from "../../core/enums/httStatusEnum";

import { formSucursalI } from "../interface/formScursalIterface";
import {  listarEmpresaPublic } from "../../empresa/services/empresaApi";
import { empresaI } from "../../empresa/interfaces/empresaInterface";
import { actulizarSucursal } from "../services/sucursalService";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";

export const EditarSucursal = ({
  recargar,
  setRecargar,
  closeModal,
  isOpen,
  empresa,
  idSucursal,
  sucursal,
}: {
  recargar: boolean;
  setRecargar: (recargar: boolean) => void;
  isOpen: boolean;
  closeModal: () => void;
  empresa: string;
  idSucursal: string;
  sucursal: string;
}) => {
  const { token } = useContext(AutenticacionContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formSucursalI>();

  const [empresas, setEmpresas] = useState<empresaI[]>([]);

  useEffect(() => {
    if (isOpen) {
      listarEmpresas();
    }
  }, [isOpen, empresa, sucursal]);

  setValue("nombre", sucursal);
  setValue("empresa", empresa);

  const listarEmpresas = async () => {
    try {
      if (token) {
        const response = await listarEmpresaPublic(token);
        setEmpresas(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSudmit = async (data: formSucursalI) => {
    try {
      if (token && idSucursal) {
        const response = await actulizarSucursal(data, token, idSucursal);
        if (response.status == HttpStatus.OK) {
          closeModal();
          setRecargar(!recargar);
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
            <h2 className="text-xl font-bold mb-4">Crear Nueva Sucursal</h2>
            <form onSubmit={handleSubmit(onSudmit)}>
              <div className="mb-4">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de la sucursal
                </label>
                <input
                  type="text"
                  id="nombre"
                  {...register("nombre", {
                    required: "Ingrese el nombre de la empresa",
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.nombre && (
                  <p className="text-red-500 text-sm">
                    {errors.nombre.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de la Empresa
                </label>
                <select
                  id="empresa"
                  {...register("empresa", {
                    required: "Seleccione una empresa",
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecciona una Empresa</option>
                  {empresas.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
                {errors.empresa && (
                  <p className="text-red-500 text-sm">
                    {errors.empresa.message}
                  </p>
                )}
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
