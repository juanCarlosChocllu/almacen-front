import { instance } from "../../config/instanceConfig"
import { httpRespuetaI } from "../../interfaces/httpRespuestaInterface"
import { almacenAreaI } from "../interfaces/almacenAreaInterface"
import { formAlmacenAreaI } from "../interfaces/formAlmacenAreaInterface"


export const listarAlmacenArea= async(token:string | null):Promise<almacenAreaI[]>=>{    
    try {
        const response = await instance.get('almacen/area',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
        
    }
}

export const listarAlmacenPorArea= async(token:string):Promise<almacenAreaI[]>=>{
 
    
    try {
        const response = await instance.get('almacen/area/listar',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
        
    }
}


export const crearAlmacenArea= async(data:formAlmacenAreaI, token:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post('almacen/area',data,{
            headers:{
                  Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
        
    }
}