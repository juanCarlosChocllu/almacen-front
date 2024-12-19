import { instance } from "../../config/instanceConfig"
import { httpRespuetaI } from "../../interfaces/httpRespuestaInterface"
import { almacenSucursalI } from "../interfaces/almacenSucursalInterface"
import { formAlmacenSucursalI } from "../interfaces/formAlmacenSucursal"

export const listarAlmacenSucursal=async():Promise<almacenSucursalI[]>=>{
    try {
        const response = await instance.get('almacen/sucursal')
        return response.data        
    } catch (error) {
        throw error
    }
}


export const crearAlmacenSucursal=async(data:formAlmacenSucursalI):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post('almacen/sucursal',data)
        return response.data        
    } catch (error) {
        throw error
    }
}

export const listraAlmacenPorSucursal=async(sucursal:string):Promise<almacenSucursalI[]>=>{
    try {
        const response = await instance.get(`almacen/sucursal/listar/${sucursal}`)
        return response.data        
    } catch (error) {
        throw error
    }
}

