import { instance } from "../../config/instanceConfig"
import {httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface"
import { formProveedorEmpresaI } from "../interface/formEmpresaInterface"
import { proveedorEmpresaI } from "../interface/proveedorEmpresaInterface"

export const proveedorEmpresas= async(token:string):Promise<proveedorEmpresaI[]>=>{
    try {
        const response = await instance.get(`proveedor/empresa`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
         return response.data
    } catch (error) {
        throw  error
    }

}

export const crearProveedorEmpresas= async(data:formProveedorEmpresaI, token:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post(`proveedor/empresa`,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
         return response.data
    } catch (error) {
        throw  error
    }

}