import { instance } from "../../config/instanceConfig";
import { httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface";
import { FormUsuariosI } from "../interfaces/formUsuarioInterface";
import { UserInfo } from "../interfaces/userInfo";
import { UsuariosI } from "../interfaces/usuariosInterface";

export const crearUsuarios=async(data:FormUsuariosI, token:string):Promise<httpRespuetaI>=>{
    try {   
        const response = await instance.post('usuarios', data,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        )
        return response.data
    } catch (error) {
        throw error
    }
}

export const listarUsuarios=async(token:string):Promise<UsuariosI[]>=>{
    try {   
        const response = await instance.get('usuarios',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}


export const informacionUsuario=async(token:string):Promise<UserInfo>=>{
    try {   
        const response = await instance.get('usuarios/informacion',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const eliminarUsuario=async(token:string, id:string):Promise<httpRespuetaI>=>{
    try {   
        const response = await instance.delete(`usuarios/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}


export const obtenerUsuario=async(token:string, id:string):Promise<FormUsuariosI>=>{
    try {   
        const response = await instance.get(`usuarios/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}


export const editarUsuarios=async(data:FormUsuariosI, token:string, id:string):Promise<httpRespuetaI>=>{
    try {   
        const response = await instance.patch(`usuarios/${id}`, data,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        )
        return response.data
    } catch (error) {
        throw error
    }
}
