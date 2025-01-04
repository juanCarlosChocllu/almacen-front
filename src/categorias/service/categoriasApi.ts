import { instance } from "../../config/instanceConfig"
import { httpRespuetaI } from "../../interfaces/httpRespuestaInterface"
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