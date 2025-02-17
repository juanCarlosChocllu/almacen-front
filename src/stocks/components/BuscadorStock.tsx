import { useForm } from "react-hook-form";

import { BuscadorStockI } from "../interfaces/buscadorStock";
import { useContext, useEffect, useState } from "react";
import { listarAlmacenArea } from "../../almacenArea/services/almacenAreaApi";
import { almacenAreaI } from "../../almacenArea/interfaces/almacenAreaInterface";
import { marcasPublicas } from "../../marca/service/marcaApi";
import { marcaI } from "../../marca/interfaces/marcaInterface";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";

export const BuscadorStock = ({
  onSubmit,
}: {
  onSubmit: (data: BuscadorStockI) => void;
}) => {
  const { token } = useContext(AutenticacionContext);
  const { register, handleSubmit } = useForm<BuscadorStockI>();
  const [almacen, setAlmacen] = useState<almacenAreaI[]>([]);
  const [marcas, setMarcas] = useState<marcaI[]>([]);
  useEffect(() => {
    listarAlmacen();
    listarMarca();
  }, []);

  const listarAlmacen = async () => {
    try {
      if (token) {
        const response = await listarAlmacenArea(token);
        setAlmacen(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const listarMarca = async () => {
    try {
      if (token) {
        const response = await marcasPublicas(token);
        setMarcas(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label
              htmlFor="codigoProducto"
              className="block text-gray-700 text-sm font-medium"
            >
              Código producto
            </label>
            <input
              placeholder="Ingrese código"
              type="text"
              id="codigoProducto"
              {...register("codigo")}
              className="mt-1 p-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="almacen"
              className="block text-gray-700 text-sm font-medium"
            >
              Almacén
            </label>
            <select
              id="almacen"
              className="mt-1 p-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("almacen")}
            >
              <option value="">Seleccione un almacén</option>
              {almacen.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="marca"
              className="block text-gray-700 text-sm font-medium"
            >
              Marca
            </label>
            <select
              id="marca"
              className="mt-1 p-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("marca")}
            >
              <option value="">Seleccione una marca</option>
              {marcas.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="tipo"
              className="block text-gray-700 text-sm font-medium"
            >
              Tipo
            </label>
            <select
              id="tipo"
              className="mt-1 p-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("tipo")}
            >
              <option value="">Seleccione un tipo</option>
              <option value="REGALO">REGALO</option>
              <option value="VENTA">VENTA</option>
            </select>
          </div>
        </div>

        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};
function marcasBuscador(token: string) {
  throw new Error("Function not implemented.");
}

