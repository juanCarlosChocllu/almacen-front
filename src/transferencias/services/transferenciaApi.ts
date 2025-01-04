import { instance } from "../../config/instanceConfig";
import { httpResponsePagiandor, httpRespuetaI } from "../../interfaces/httpRespuestaInterface";
import { BuscadorTransFerenciaI } from "../interface/buscadorTransferencia";
import { ParamsTransFerenciaI } from "../interface/parametrosTranferenciaInterface";
import { dataTransferenciaI } from "../interface/realizarTransferenciaInterface";
import { transferenciasI } from "../interface/transferenciasInterface";


 
export const  realizarTransferencias =async(data:dataTransferenciaI, token:string):Promise<httpRespuetaI>=>{
    try {
        const response= await instance.post('transferencias', data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}

 
export const  listarTransferencias =async(pagina:number, limite:number, buscadorTransFerencia:BuscadorTransFerenciaI, token:string):Promise<httpResponsePagiandor<transferenciasI>>=>{
    try {
        const params:ParamsTransFerenciaI ={
            limite:limite,
            pagina:pagina

        }
        buscadorTransFerencia.almacenSucursal ? params.almacenSucursal =  buscadorTransFerencia.almacenSucursal  : params
        buscadorTransFerencia.codigo ? params.codigo =  buscadorTransFerencia.codigo  : params
        buscadorTransFerencia.marca ? params.marca =  buscadorTransFerencia.marca  : params
        buscadorTransFerencia.sucursal ? params.sucursal =  buscadorTransFerencia.sucursal  : params

        buscadorTransFerencia.fechaInicio ? params.fechaInicio =  buscadorTransFerencia.fechaInicio  : params

        buscadorTransFerencia.fechaFin ? params.fechaFin =  buscadorTransFerencia.fechaFin  : params

        buscadorTransFerencia.tipo ? params.tipo =  buscadorTransFerencia.tipo  : params
        console.log(params);
        
        const response= await instance.get(`transferencias`,
            {
                params:{
                    ...params
                },
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