import { instance } from "../../config/instanceConfig"
import { httpResponsePagiandor, httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface"
import { Params } from "../../core/interfaces/params"
import { BuscadorProveedorI } from "../interfaces/BuscadorProveedorData"
import { formProveedorPersonaI } from "../interfaces/formProveedorPersonaInterface"
import { proveedorPersonaI } from "../interfaces/proveedorPersonaInterface"

export const proveedorPersonas= async(
    token:string,
    limite:number,
     pagina:number,
     ci:string|undefined,
     nombre:string|undefined,
     apellidos:string|undefined,
     nit:string|undefined,
     celular:string|undefined

):Promise<httpResponsePagiandor<proveedorPersonaI>>=>{
    try {
        const params:Params & BuscadorProveedorI ={
            limite:limite,
            pagina:pagina,
        }

        nit ? params.nit = nit :params
        nombre ? params.nombre = nombre :params
        celular ? params.celular= celular:params
        apellidos ? params.apellidos= apellidos:params
        ci ? params.ci= ci:params
        const response = await instance.get(`proveedor/persona`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
            params
        
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