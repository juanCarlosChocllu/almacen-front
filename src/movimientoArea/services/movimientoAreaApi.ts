import { instance } from "../../config/instanceConfig";
import { httpResponsePagiandor } from "../../interfaces/httpRespuestaInterface";
import { BuscadorMAreaI } from "../interface/buscadorMAreaInterface";
import { MovimientoAreaI } from "../interface/movimientoAreaInterface";
import { paramsMareaI } from "../interface/paramsMAreaInterface";

export const listarIngresos = async (
  limite: number,
  pagina: number,
  buscadorMAreaI: BuscadorMAreaI,
  token:string
): Promise<httpResponsePagiandor<MovimientoAreaI>> => {
  const params: paramsMareaI = {
    limite: limite,
    pagina: pagina,
  };

  buscadorMAreaI.almacenArea
    ? (params.almacenArea = buscadorMAreaI.almacenArea)
    : params;

  buscadorMAreaI.codigo ? (params.codigo = buscadorMAreaI.codigo) : params;

  buscadorMAreaI.tipo ? (params.tipo = buscadorMAreaI.tipo) : params;

  buscadorMAreaI.fechaFin
    ? (params.fechaFin = buscadorMAreaI.fechaFin)
    : params;

  buscadorMAreaI.fechaInicio
    ? (params.fechaInicio = buscadorMAreaI.fechaInicio)
    : params;
  try {
    const response = await instance.get("movimiento/area/ingresos", {
      params: {
        ...params,
      },
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarSalidas = async (): Promise<MovimientoAreaI[]> => {
  try {
    const response = await instance.get("movimiento/area/salidas");
    return response.data;
  } catch (error) {
    throw error;
  }
};
