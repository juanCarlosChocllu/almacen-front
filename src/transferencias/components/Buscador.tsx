import { useForm } from "react-hook-form";
import { BuscadorI } from "../interface/buscador";
import { useContext } from "react";
import { PermisosContext } from "../../autenticacion/context/permisos.context";
import { TipoUsuarioE } from "../../core/enums/tipoUsuario";

export const Buscador = ({
  onsubmit,
}: {
  onsubmit: (data: BuscadorI) => void;
}) => {
  const { register, handleSubmit } = useForm<BuscadorI>();
  const {tipo}=useContext(PermisosContext)
  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="flex space-x-4">
          <div>
            <label
              htmlFor="codigo"
              className="block text-sm font-medium text-gray-700"
            >
              Código
            </label>
            <input
              {...register("codigo")}
              type="text"
              id="codigo"
              placeholder="Código"
              className="w-48 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="estado"
              className="block text-sm font-medium text-gray-700"
            >
              Estado
            </label>
            <div className="w-full max-w-xs mx-auto">
              <select
                {...register('estado')}
                id="estado"
                name="estado"
                className="block w-full py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              >
                <option value="">seleccione un estado</option>
                <option value="APROBADO">APROBADO</option>
                <option value="RECHAZADO">RECHAZADO</option>
                <option value="PENDIENTE">PENDIENTE</option>
             
                {
                  tipo != TipoUsuarioE.SUCURSAL &&         <option value="CANCELADO">CANCELADO</option> 
                  
                }
                  {
                  tipo != TipoUsuarioE.SUCURSAL &&         <option value="REENVIADO">REENVIADO</option> 
                  
                }

{
                  tipo != TipoUsuarioE.SUCURSAL &&         <option value="RECHAZO ACEPTADO">RECHAZO ACEPTADO</option> 
                  
                }
              </select>
            </div>
          </div>
          <div></div>
          <div>
            <label
              htmlFor="fechaInicio"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha Inicio
            </label>
            <input
              {...register("fechaInicio")}
              type="date"
              id="fechaInicio"
              className="w-48 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="fechaFin"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha Fin
            </label>
            <input
              type="date"
              {...register("fechaFin")}
              id="fechaFin"
              className="w-48 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-48 bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-5 "
            >
              Buscar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
