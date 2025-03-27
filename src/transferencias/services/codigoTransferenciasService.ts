import { instance } from "../../config/instanceConfig"
import { httpResponsePagiandor, httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface"
import { transferenciasI } from "../interface/transferenciasInterface"
import { BuscadorI } from "../interface/buscador"
import { CodigoTransferenciaI } from "../interface/codigoTransferencias"
import { ParamsI } from "../interface/params"



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
        onSubmit.estado ? params.estado = onSubmit.estado :params
        console.log(params);
        
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

export  const  aprobarCodigoTransferencia = async(id:string, token:string):Promise<httpRespuetaI>=> {
        try {
            const response =await instance.get(`transferencias/codigo/aprobar/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            })
            return response.data
            
        } catch (error) {
            throw error
        }
}

export const rechazarTransferencia =async(transferencia:string, token:string):Promise<httpRespuetaI>=>{ 
    try {
        const response = await instance.get(`transferencias/codigo/rechazar/${transferencia}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (error) {
        throw error
    }
}



export const cancelarTransferencia =async(transferencia:string, token:string):Promise<httpRespuetaI>=>{ 
    try {
        const response = await instance.get(`transferencias/codigo/cancelar/${transferencia}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (error) {
        throw error
    }
}