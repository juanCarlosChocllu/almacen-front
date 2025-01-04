
import { instance } from "../../config/instanceConfig";
import { httpResponsePagiandor, httpRespuetaI } from "../../interfaces/httpRespuestaInterface";
import { BuscadorStockI } from "../interfaces/buscadorStock";
import { ParametrosStockI } from "../interfaces/parametrosStock";
import { gudarStockI, StockI, StockVerificarI } from "../interfaces/stockInterface";


export const guardarStock= async(data:gudarStockI):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post('stocks',data)
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
  


export   const vericarStockProducto =async(producto:string):Promise<StockVerificarI>=>{
    try {
      const response = await instance.get(`stocks/verificar/stock/${producto}`);
      return response.data
    } catch (error) {
      throw error;
    }

  }