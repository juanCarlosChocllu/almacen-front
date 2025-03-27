import { useContext, useEffect, useState } from "react";
import { listarAlmacenPublicas } from "../../almacenSucursal/services/almacenSucursalService";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { almacenSucursalI } from "../../almacenSucursal/interfaces/almacenSucursalInterface";
import { useForm } from "react-hook-form";
import { EditarTranferenciaI } from "../interface/editarTransferencia";
import { editarTransferenciaRechazada } from "../services/transferenciaService";
import { HttpStatus } from "../../core/enums/httStatusEnum";
import { HttpStatusCode } from "axios";

import { httAxiosError } from "../../core/utils/error.util";

export const EditarTrasnferenciaModal = ({
  transferencia,
  isModalOpen,
  closeModal,
  idSusursal,
  idAlmacen,
  cantidad,
  recargarDara,
  setRecargarData,
  codigo,
  producto
}: {
  transferencia: string;
  idSusursal: string;
  codigo:string
  producto:string
  idAlmacen: string;
  isModalOpen: boolean;
  cantidad: number;
  closeModal: () => void;
  setRecargarData: (data: boolean) => void;
  recargarDara: boolean;
}) => {
  
  const { token } = useContext(AutenticacionContext);
  const [almacenes, setAlmaces] = useState<almacenSucursalI[]>([]);
  const [mesaje, setMensaje] = useState<string>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditarTranferenciaI>();
  useEffect(() => {
    listarAlmacen();
  }, [idSusursal]);


  setValue("almacenSucursal", idAlmacen);

  const listarAlmacen = async () => {
    try {
      if (token) {
        const response = await listarAlmacenPublicas(idSusursal, token);
        setAlmaces(response);
      }
    } catch (error) {}
  };
  const onSubmit = async (data: EditarTranferenciaI) => {
    try {
      if (token) {
        const response = await editarTransferenciaRechazada(
          transferencia,
          data.cantidad,
          data.almacenSucursal,
          token
        );
        if (response.status === HttpStatus.OK) {
          setRecargarData(!recargarDara);
          closeModal();
        }
      }
    } catch (error) {
      const e = httAxiosError(error)
      if(e.response.data.statusCode == HttpStatusCode.BadRequest){
        setMensaje(e.response.data.message)
      }
   
    }
  };
  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <button onClick={closeModal}>X</button>
            <h2 className="text-xl font-semibold mb-4">Editar transferencia</h2>
            <div>
                <p>Codigo : {codigo}</p>
                <p>Producto : {producto}</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="cantidad"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad
                </label>
                <input
                  {...register("cantidad", {
                    required: "Ingrese la nueva cantidad",
                  })}
                  defaultValue={cantidad}
                  id="cantidad"
                  type="number"
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.cantidad && (
                  <p className="text-red-500 text-xs">
                    {errors.cantidad.message}
                  </p>
                )}

{mesaje && (
                  <p className="text-red-500 text-xs">
                    {mesaje}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="almacen"
                  className="block text-sm font-medium text-gray-700"
                >
                  Almacén
                </label>
                <select
                  {...register("almacenSucursal", {
                    required: "Seleccione el almacen",
                  })}
                  defaultValue={idAlmacen}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccione el almacen</option>
                  {almacenes.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
                {errors.almacenSucursal && (
                  <p className="text-red-500 text-xs">
                    {errors.almacenSucursal.message}
                  </p>
                )}
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
