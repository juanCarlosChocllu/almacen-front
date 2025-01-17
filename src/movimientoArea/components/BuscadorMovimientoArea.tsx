import { useContext, useEffect, useState } from "react";
import { BuscadorMAreaI } from "../interface/buscadorMAreaInterface";
import { listarAlmacenArea } from "../../almacenArea/services/almacenAreaApi";
import { almacenAreaI } from "../../almacenArea/interfaces/almacenAreaInterface";
import { useForm } from "react-hook-form";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";

export const BuscadorMovimientoArea = ({
  onSubmit,
}: {
  onSubmit(data: BuscadorMAreaI): void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BuscadorMAreaI>();
  const [almacenes, setAlmacenes] = useState<almacenAreaI[]>([]);
  const fechaInicio = watch("fechaInicio");
  const fechaFin = watch("fechaFin");
  const {token} =useContext(AutenticacionContext)

  useEffect(() => {
    almacen();
  }, []);

  const almacen = async () => {
    try {
   if(token){
    const response = await listarAlmacenArea(token);
    setAlmacenes(response);
   }
    } catch (error) {}
  };
  return (
<div>
  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-6">
    <div className="flex flex-col space-y-1 w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
      <label htmlFor="codigo" className="text-gray-700 font-medium text-sm">
        Código
      </label>
      <input
        id="codigo"
        type="text"
        {...register("codigo")}
        className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex flex-col space-y-1 w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
      <label htmlFor="almacen" className="text-gray-700 font-medium text-sm">
        Almacen
      </label>
      <select
        {...register("almacenArea")}
        id="almacen"
        className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione el almacen</option>
        {almacenes.map((item) => (
          <option key={item._id} value={item._id}>
            {item.nombre}
          </option>
        ))}
      </select>
    </div>

    <div className="flex flex-col space-y-1 w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
      <label htmlFor="tipo" className="text-gray-700 font-medium text-sm">
        Tipo
      </label>
      <select
        {...register("tipo")}
        id="tipo"
        className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione un tipo</option>
        <option value="REGALO">REGALO</option>
        <option value="VENTA">VENTA</option>
      </select>
    </div>

    <div className="flex flex-col space-y-1 w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
      <label htmlFor="fechaInicio" className="text-gray-700 font-medium text-sm">
        Fecha inicio
      </label>
      <input
        {...register("fechaInicio", {
          validate: (value) => {
            if (fechaFin && !value) {
              return "Seleccione una fecha";
            }
            return true;
          },
        })}
        id="fechaInicio"
        type="date"
        className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.fechaInicio && <p>{errors.fechaInicio.message}</p>}
    </div>

    <div className="flex flex-col space-y-1 w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
      <label htmlFor="fechaFin" className="text-gray-700 font-medium text-sm">
        Fecha fin
      </label>
      <input
        {...register("fechaFin", {
          validate: (value) => {
            if (fechaInicio && !value) {
              return "Seleccione una fecha";
            }
            return true;
          },
        })}
        id="fechaFin"
        type="date"
        className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.fechaFin && <p>{errors.fechaFin.message}</p>}
    </div>

    <div className="flex items-center justify-center mt-4 w-full sm:w-auto">
      <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Buscar
      </button>
    </div>
  </form>
</div>
  )
};
