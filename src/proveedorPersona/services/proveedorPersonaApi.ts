import { instance } from "../../config/instanceConfig"
import { httpRespuetaI } from "../../interfaces/httpRespuestaInterface"
import { formProveedorPersonaI } from "../interfaces/formProveedorPersonaInterface"
import { proveedorPersonaI } from "../interfaces/proveedorPersonaInterface"

export const proveedorPersonas= async():Promise<proveedorPersonaI[]>=>{
    try {
        const response = await instance.get(`proveedor/persona`)
         return response.data
    } catch (error) {
        throw  error
    }

}


export const crearProveedorPersonas= async(data:formProveedorPersonaI):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post(`proveedor/persona`,data)
         return response.data
    } catch (error) {
        throw  error
    }

}