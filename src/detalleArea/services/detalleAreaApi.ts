import { instance } from "../../config/instanceConfig"
import { ActualizarDetalleI } from "../interfaces/actulizarArea"
import { DetalleAreaI } from "../interfaces/detalleArea"



export const listarDetalleArea = async(token:string):Promise<DetalleAreaI[]>=>{
    try {
        const response = await instance.get('detalle/area',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
        
    } catch (error) {
        throw error
    }
}


export const actualizarDetalleArea = async(data:ActualizarDetalleI, token:string):Promise<DetalleAreaI[]>=>{
    try {
        const response = await instance.post('detalle/area',data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
        
    } catch (error) {
        throw error
    }
}