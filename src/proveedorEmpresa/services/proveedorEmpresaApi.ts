import { instance } from "../../config/instanceConfig"
import {httpRespuetaI } from "../../interfaces/httpRespuestaInterface"
import { formProveedorEmpresaI } from "../interface/formEmpresaInterface"
import { proveedorEmpresaI } from "../interface/proveedorEmpresaInterface"

export const proveedorEmpresas= async():Promise<proveedorEmpresaI[]>=>{
    try {
        const response = await instance.get(`proveedor/empresa`)
         return response.data
    } catch (error) {
        throw  error
    }

}

export const crearProveedorEmpresas= async(data:formProveedorEmpresaI):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post(`proveedor/empresa`,data)
         return response.data
    } catch (error) {
        throw  error
    }

}