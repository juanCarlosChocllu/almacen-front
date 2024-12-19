import { instance } from "../../config/instanceConfig";
import { httpRespuetaI } from "../../interfaces/httpRespuestaInterface";
import { formSucursalI } from "../interface/formScursalIterface";
import { sucursalI } from "../interface/sucursalInterface";


export const listarSucursal= async():Promise<sucursalI[]>=>{
    try {
        const response = await instance.get('sucursal')
        return response.data
    } catch (error) {
        throw error
    }

}

export const crearSucursal= async(data:formSucursalI):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post('sucursal',data)
        return response.data
    } catch (error) {
        throw error
    }

}



export const listarSucursalEmpresa= async(empresa:string | undefined):Promise<sucursalI[]>=>{    
    try {
        const response = await instance.get(`sucursal/empresa/${empresa}`)
        return response.data
    } catch (error) {
        throw error
    }

}