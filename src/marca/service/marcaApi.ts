import { instance } from "../../config/instanceConfig"
import { httpRespuetaI } from "../../interfaces/httpRespuestaInterface"
import { formMarcaI } from "../interfaces/formMarcaInterface"
import { marcaI } from "../interfaces/marcaInterface"

export const listarMarcas =async (token:string):Promise<marcaI[]>=>{
    try {
        const response= await instance.get('marca',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
        
    } catch (error) {
        throw error
        
    }



}


export const crearMarca =async (data:formMarcaI,token:string):Promise<httpRespuetaI>=>{
    try {
        const response= await instance.post('marca',data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
        
    } catch (error) {
        throw error
        
    }

}