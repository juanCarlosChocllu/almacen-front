import { instance } from "../../config/instanceConfig"
import { httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface"
import { rolI } from "../interface/rolInterface"

export const listarRol = async(token:string):Promise<rolI[]>=>{
    try {
        const response = await instance.get('rol',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}

export const listarRolPublicas = async(token:string):Promise<rolI[]>=>{
    try {
        const response = await instance.get('rol/publicas',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}

export const Permisos= async():Promise<any>=>{
    try {
        const response = await instance.post('permisos')
        return response.data
    } catch (error) {
        throw error
    }


}

export const crearRol=  async(data:FormData, token:string )=>{
    try {
        const response = await instance.post('rol', data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}

export const editarRol=  async(data:FormData, token:string , id:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.patch(`rol/${id}`, data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}


export const eliminarRol=  async(token:string , id:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.delete(`rol/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}