import { instance } from "../../config/instanceConfig"
import { httpRespuetaI } from "../../interfaces/httpRespuestaInterface"
import { categoriasI, dataCategoria } from "../interfaces/categoriasInterface"

 
export  const listarCategorias= async():Promise<categoriasI[]>=>{
    try {
        const response = await instance.get('categorias')
        return response.data
    } catch (error) {
        throw error
        
    }
}


export const crearCategoria = async(data:dataCategoria):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post('categorias', data)
        return response.data
    } catch (error) {
        throw error
        
    }

}