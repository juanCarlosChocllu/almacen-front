import { instance } from "../../config/instanceConfig"
import {httpResponsePagiandor, httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface"
import { Params } from "../../core/interfaces/params"
import { BuscadorProveedorI } from "../interface/buscadorProveedor"
import { formProveedorEmpresaI } from "../interface/formEmpresaInterface"
import { proveedorEmpresaI } from "../interface/proveedorEmpresaInterface"

export const proveedorEmpresas= async(token:string , limite:number, pagina:number, nit:string|undefined , nombre:string|undefined , celular:string|undefined ):Promise<httpResponsePagiandor<proveedorEmpresaI>>=>{
    const params:Params & BuscadorProveedorI ={
        limite:limite,
        pagina:pagina
    
    }
    nit ? params.nit = nit :params
    nombre ? params.nombre = nombre :params
    celular ? params.celular= celular:params

    
    try {
        const response = await instance.get(`proveedor/empresa`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
            params
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