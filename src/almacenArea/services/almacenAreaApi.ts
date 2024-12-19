import { instance } from "../../config/instanceConfig"
import { httpRespuetaI } from "../../interfaces/httpRespuestaInterface"
import { almacenAreaI } from "../interfaces/almacenAreaInterface"
import { formAlmacenAreaI } from "../interfaces/formAlmacenAreaInterface"


export const listarAlmacenArea= async():Promise<almacenAreaI[]>=>{
    try {
        const response = await instance.get('almacen/area')
        return response.data
    } catch (error) {
        throw error
        
    }
}

export const listarAlmacenPorArea= async():Promise<almacenAreaI[]>=>{
    try {
        const response = await instance.get('almacen/area/listar')
        return response.data
    } catch (error) {
        throw error
        
    }
}


export const crearAlmacenArea= async(data:formAlmacenAreaI):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post('almacen/area',data)
        return response.data
    } catch (error) {
        throw error
        
    }
}