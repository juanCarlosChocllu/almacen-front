import { instance } from "../../config/instanceConfig";
import { httpResponsePagiandor, httpRespuetaI } from "../../interfaces/httpRespuestaInterface";
import { dataTransferenciaI } from "../interface/realizarTransferenciaInterface";
import { transferenciasI } from "../interface/transferenciasInterface";


 
export const  realizarTransferencias =async(data:dataTransferenciaI):Promise<httpRespuetaI>=>{
    try {
        const response= await instance.post('transferencias', data)
        return response.data
    } catch (error) {
        throw error
    }
}

 
export const  listarTransferencias =async(pagina:number, limite:number):Promise<httpResponsePagiandor<transferenciasI>>=>{
    try {
        
        const response= await instance.get(`transferencias?pagina=${pagina}&limite=${limite}`)
        return response.data
    } catch (error) {
        throw error
    }
}