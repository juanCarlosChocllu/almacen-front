
import { instance } from "../../config/instanceConfig"
import { httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface"
import { formSubCategoriaI } from "../interfaces/formSubCategoriaInterface"
import { subCategoriaI } from "../interfaces/subCategoriaInterface"


export const listarSubCategorias= async(categoria:string, token:string):Promise<subCategoriaI[]>=>{
    try {
        const response = await instance.get(`sub/categoria/${categoria}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
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



export const eliminarSubCategoria= async(id:string, token:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.delete(`sub/categoria/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
         return response.data
    } catch (error) {
        throw  error
    }


}

export const editarSubCategoria= async(data:formSubCategoriaI, token:string, id:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.patch(`sub/categoria/${id}`,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
         return response.data
    } catch (error) {
        throw  error
    }


}