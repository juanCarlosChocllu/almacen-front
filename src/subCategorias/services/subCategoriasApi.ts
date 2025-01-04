
import { instance } from "../../config/instanceConfig"
import { httpRespuetaI } from "../../interfaces/httpRespuestaInterface"
import { formSubCategoriaI } from "../interfaces/formSubCategoriaInterface"
import { subCategoriaI } from "../interfaces/subCategoriaInterface"


export const listarSubCategorias= async(categoria:string):Promise<subCategoriaI[]>=>{
    try {
        const response = await instance.get(`sub/categoria/${categoria}`)
         return response.data
    } catch (error) {
        throw  error
    }


}


export const listarSubCategoria= async(token:string):Promise<subCategoriaI[]>=>{
    try {
        const response = await instance.get(`sub/categoria`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
         return response.data
    } catch (error) {
        throw  error
    }



}



export const crearSubCategoria= async(data:formSubCategoriaI, token:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post(`sub/categoria`,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
         return response.data
    } catch (error) {
        throw  error
    }


}