import { instance } from "../../config/instanceConfig";

import { httpRespuetaI } from "../../interfaces/httpRespuestaInterface";

import { productoI } from "../interface/productoInterface";

export const crearProducto= async(data:FormData):Promise<httpRespuetaI>=>{
    try {
        const response:httpRespuetaI  = await instance.post('productos',data,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        return response
    } catch (error) {
        throw error
    }

}


export const listarProductos = async():Promise<productoI[]>=>{
    try {
        const response = await instance.get('productos')
        return response.data
    } catch (error) {
        throw error
    }

}