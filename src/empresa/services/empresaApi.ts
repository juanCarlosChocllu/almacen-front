import { instance } from "../../config/instanceConfig";
import { httpRespuetaI } from "../../interfaces/httpRespuestaInterface";
import { empresaI } from "../interfaces/empresaInterface";
import { formEmpresaI } from "../interfaces/formEmpresaInterface";

export const listarEmpresa= async():Promise<empresaI[]>=>{
    try {
        const response = await instance.get('empresas')
        return response.data
    } catch (error) {
        throw error
    }

}

export const crearEmpresa= async(data:formEmpresaI):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post('empresas',data)
        return response.data
    } catch (error) {
        throw error
    }

}