import { instance } from "../../config/instanceConfig"
import { httpRespuetaI } from "../../interfaces/httpRespuestaInterface"
import { formMarcaI } from "../interfaces/formMarcaInterface"
import { marcaI } from "../interfaces/marcaInterface"

export const listarMarcas =async ():Promise<marcaI[]>=>{
    try {
        const response= await instance.get('marca')
        return response.data
        
    } catch (error) {
        throw error
        
    }



}


export const crearMarca =async (data:formMarcaI):Promise<httpRespuetaI>=>{
    try {
        const response= await instance.post('marca',data)
        return response.data
        
    } catch (error) {
        throw error
        
    }

}