import { instance } from "../../config/instanceConfig";
import { httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface";
import { empresaI } from "../interfaces/empresaInterface";
import { formEmpresaI } from "../interfaces/formEmpresaInterface";

export const listarEmpresa= async(token:string):Promise<empresaI[]>=>{
    try {
        const response = await instance.get('empresas',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}


export const listarEmpresaPublic= async(token:string):Promise<empresaI[]>=>{
    try {
        const response = await instance.get('empresas/publico',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}

export const crearEmpresa= async(data:formEmpresaI, token:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post('empresas',data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}


export const editarEmpresa= async(data:formEmpresaI, token:string, id:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.patch(`empresas/${id}`,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}



export const eliminarEmpresa= async(token:string, id:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.delete(`empresas/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}