import { instance } from "../../config/instanceConfig"
import { httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface"
import { almacenSucursalI } from "../interfaces/almacenSucursalInterface"
import { formAlmacenSucursalI } from "../interfaces/formAlmacenSucursal"

export const listarAlmacenSucursal=async(token:string):Promise<almacenSucursalI[]>=>{
    try {
        const response = await instance.get('almacen/sucursal',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data        
    } catch (error) {
        throw error
    }
}


export const crearAlmacenSucursal=async(data:formAlmacenSucursalI, token:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post('almacen/sucursal',data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data        
    } catch (error) {
        throw error
    }
}

export const listraAlmacenPorSucursalBuscador=async(sucursal:string, token:string):Promise<almacenSucursalI[]>=>{
    console.log(token);
    
    try {
        const response = await instance.get(`almacen/sucursal/listar/${sucursal}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data        
    } catch (error) {
        throw error
    }
}


export const listarAlmacenPublicas=async(sucursal:string | undefined, token:string):Promise<almacenSucursalI[]>=>{
    console.log(token);
    
    try {
        const response = await instance.get(`almacen/sucursal/listar/buscador/${sucursal}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data        
    } catch (error) {
        throw error
    }
}




export const eliminarAlmacenSucursal=async(id:string, token:string):Promise<httpRespuetaI>=>{
    
    try {
        const response = await instance.delete(`almacen/sucursal/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data        
    } catch (error) {
        throw error
    }
}

export const obtenerSucursalAlmacen=async(id:string, token:string):Promise<formAlmacenSucursalI>=>{
    
    try {
        const response = await instance.get(`almacen/sucursal/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data        
    } catch (error) {
        throw error
    }
}


export const actulizarAlmacenSucursal=async(data:formAlmacenSucursalI, token:string, id:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.patch(`almacen/sucursal/${id}`,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data        
    } catch (error) {
        throw error
    }
}