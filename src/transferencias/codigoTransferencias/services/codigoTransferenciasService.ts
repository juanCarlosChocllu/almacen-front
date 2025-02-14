import { instance } from "../../../config/instanceConfig"
import { httpResponsePagiandor } from "../../../core/interfaces/httpRespuestaInterface"
import { transferenciasI } from "../../core/interface/transferenciasInterface"
import { BuscadorI } from "../interfaces/buscador"
import { CodigoTransferenciaI } from "../interfaces/codigoTransferencias"
import { ParamsI } from "../interfaces/params"



export const listarCodigoTransferencias= async(token:string ,onSubmit:BuscadorI, limite:number, pagina:number):Promise<httpResponsePagiandor<CodigoTransferenciaI>>=>{
    
    try {
        const params:ParamsI ={
            limite: limite,
            pagina:pagina


        }
        onSubmit.codigo ? params.codigo = onSubmit.codigo :params
        onSubmit.fechaFin ? params.fechaFin = onSubmit.fechaFin :params
        onSubmit.fechaInicio ? params.fechaInicio = onSubmit.fechaInicio :params
        onSubmit.area ? params.area = onSubmit.area :params
        
         const response = await instance.get('codigo/transferencia',{
            headers:{
                Authorization:`Bearer ${token}`
            },
            params
         })
    return response.data
    } catch (error) {
        throw error
        
    }

}


export const transferenciasPorCodigo =async (id:string, token:string):Promise<transferenciasI[]> =>{
    try {
        const response =await instance.get(`transferencias/codigo/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
        })
        return response.data
    } catch (error) {
        throw error
    }
}