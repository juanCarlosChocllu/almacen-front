import { instance } from "../../config/instanceConfig"
import { httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface"
import { formProveedorPersonaI } from "../interfaces/formProveedorPersonaInterface"
import { proveedorPersonaI } from "../interfaces/proveedorPersonaInterface"

export const proveedorPersonas= async(token:string):Promise<proveedorPersonaI[]>=>{
    try {
        const response = await instance.get(`proveedor/persona`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        
        })
         return response.data
    } catch (error) {
        throw  error
    }

}


export const crearProveedorPersonas= async(data:formProveedorPersonaI, token:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post(`proveedor/persona`,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
         return response.data
    } catch (error) {
        throw  error
    }

}