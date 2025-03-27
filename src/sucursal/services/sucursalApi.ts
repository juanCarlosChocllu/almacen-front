
import { instance } from "../../config/instanceConfig";
import { httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface";
import { formSucursalI } from "../interface/formScursalIterface";
import { sucursalI } from "../interface/sucursalInterface";


export const listarSucursal= async(token:string):Promise<sucursalI[]>=>{

   
    try {
        const response = await instance.get('sucursal',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}

export const crearSucursal= async(data:formSucursalI, token:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post('sucursal',data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}



export const listarSucursalEmpresaBuscador= async(empresa:string | undefined, token:string):Promise<sucursalI[]>=>{    
    try {
        const response = await instance.get(`sucursal/empresa/${empresa}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}


export const eliminarSucursal= async(id:string, token:string):Promise<httpRespuetaI>=>{    
    try {
        const response = await instance.delete(`sucursal/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}


export const actulizarSucursal= async(data:formSucursalI, token:string, id:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.patch(`sucursal/${id}`,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}
