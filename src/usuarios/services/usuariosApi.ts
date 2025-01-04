import { instance } from "../../config/instanceConfig";
import { httpRespuetaI } from "../../interfaces/httpRespuestaInterface";
import { FormUsuariosI } from "../interfaces/formUsuarioInterface";
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