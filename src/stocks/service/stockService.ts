
import { instance } from "../../config/instanceConfig";
import { httpResponsePagiandor, httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface";
import { Params } from "../../core/interfaces/params";
import { BuscadorCodigoStockI } from "../../movimientoArea/interface/buscadorCodigoStock";
import { BuscadorStockI } from "../interfaces/buscadorStock";
import { CodigoStock } from "../../movimientoArea/interface/codigoStock";
import { ParametrosStockI } from "../interfaces/parametrosStock";
import { guardarStockI, StockI, StockVerificarI } from "../interfaces/stockInterface";


export const guardarStock= async(data:guardarStockI, token:string):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post('stocks',data,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        return response.data
    } catch (error) {
        throw error
        
    }

}


export const listarStock = async (pagina: number, limite: number, buscadorStockI:BuscadorStockI, token:string): Promise<httpResponsePagiandor<StockI>> => {
    try {       
      const params:ParametrosStockI ={
        pagina:pagina,
        limite:limite
      }  
      buscadorStockI.almacen ? params.almacenArea = buscadorStockI.almacen : params
      buscadorStockI.codigo ? params.codigo = buscadorStockI.codigo : params
      buscadorStockI.marca ? params.marca = buscadorStockI.marca : params
      buscadorStockI.tipo ? params.tipo = buscadorStockI.tipo : params
      const response = await instance.get(`stocks`,{
        params,
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  


export   const vericarStockProducto =async(producto:string, token:string):Promise<StockVerificarI[]>=>{
    try {
      const response = await instance.get(`stocks/verificar/stock/${producto}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      });
      return response.data
    } catch (error) {
      throw error;
    }

  }



  export   const listarCodigoStock =async(token:string ,buscador:BuscadorCodigoStockI , limite:number, pagina:number):Promise<httpResponsePagiandor<CodigoStock>>=>{
    const params:Params & BuscadorCodigoStockI = {
      limite:limite,
      pagina:pagina,

    }
    buscador.codigo ? params.codigo = buscador.codigo : params
    buscador.fechaInicio ? params.fechaInicio = buscador.fechaInicio : params
    buscador.fechaFin ? params.fechaFin = buscador.fechaFin : params

    try {
      const response = await instance.get(`codigo/stock`,{
        headers:{
            Authorization:`Bearer ${token}`
        },
        params
      });
      return response.data
    } catch (error) {
      throw error;
    }

  }


