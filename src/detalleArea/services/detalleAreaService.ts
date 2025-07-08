import { instance } from "../../config/instanceConfig"
import { ActualizarDetalleI } from "../interfaces/actulizarArea"
import { DetalleAreaI } from "../../core/interfaces/detalleArea"
import { httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface";



export const listarDetalleAreaPorUsuario = async(token:string):Promise<DetalleAreaI[]>=>{
    try {

        
        const response = await instance.get('ubicacion/usuario',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
        
    } catch (error) {
        throw error
    }
}


export const actualizarDetalleArea = async(data:ActualizarDetalleI, token:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post('ubicacion',data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
        
    } catch (error) {
        throw error
    }
}

export const obtenerDetallleAreaUsuarioPublico = async(token:string, id:string):Promise<DetalleAreaI[]>=>{
    try {

        
        const response = await instance.get(`ubicacion/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
        
    } catch (error) {
  
        
        throw error
    }
}
