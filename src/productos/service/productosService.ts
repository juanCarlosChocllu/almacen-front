import { instance } from "../../config/instanceConfig";

import {
  httpResponsePagiandor,
  httpRespuetaI,
} from "../../core/interfaces/httpRespuestaInterface";
import { formProductoI } from "../interface/formProductoInterface";
import { ParamsAxiosI } from "../interface/paramsAxiosInterface";

import { productoI } from "../interface/productoInterface";

export const crearProducto = async (data: FormData, token:string): Promise<httpRespuetaI> => {
 
  
  try {
    const response: httpRespuetaI = await instance.post("productos", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:`Bearer ${token}`
      },
    
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const listarProductos = async (
  limite: number,
  pagina: number,
  codigo: string | null,
  categoria: string | null,
  subCategoria: string | null,
  marca: string | null,
  token:string
): Promise<httpResponsePagiandor<productoI>> => {
  try {
    const params: ParamsAxiosI = {
      limite: limite,
      pagina: pagina,
    };
    if (codigo) {
      params.codigo = codigo;
    }
    if (categoria) {
      params.categoria = categoria;
    }
    if (subCategoria) {
      params.subCategoria = subCategoria;
    }
    if (marca) {
        params.marca = marca;
      }
  

    const response = await instance.get(`productos`, {
      params,
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const productoFindOne = async (id:string, token:string): Promise<formProductoI> => {
 
  
  try {
    const response = await instance.get(`productos/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:`Bearer ${token}`
      },
    
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const editarProducto = async (data: FormData, token:string, id:string): Promise<httpRespuetaI> => {
 
  
  try {
    const response: httpRespuetaI = await instance.patch(`productos/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:`Bearer ${token}`
      },
    
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const eliminarProducto = async (id:string, token:string): Promise<httpRespuetaI> => {
 
  
  try {
    const response = await instance.delete(`productos/${id}`, {
      headers: {
        Authorization:`Bearer ${token}`
      },
    
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
