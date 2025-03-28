import { instance } from "../../config/instanceConfig"
import { httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface"
import { categoriasI, dataCategoria } from "../interfaces/categoriasInterface"

 
export  const listarCategorias= async(token:string):Promise<categoriasI[]>=>{
    try {
        const response = await instance.get('categorias',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
        
    }
}


export const crearCategoria = async(data:dataCategoria,token:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post('categorias', data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
        
    }

}



export const eliminarCategoria = async(id:string,token:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.delete(`categorias/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
        
    }
}

export const editarCategoria = async(data:dataCategoria,token:string, id:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.patch(`categorias/${id}`, data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
        
    }

}