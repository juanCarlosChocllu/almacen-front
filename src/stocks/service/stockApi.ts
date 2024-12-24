
import { instance } from "../../config/instanceConfig";
import { httpResponsePagiandor, httpRespuetaI } from "../../interfaces/httpRespuestaInterface";
import { gudarStockI, StockI, StockVerificarI } from "../interfaces/stockInterface";


export const guardarStock= async(data:gudarStockI):Promise<httpRespuetaI>=>{
    try {
        const response = await instance.post('stocks',data)
        return response.data
    } catch (error) {
        throw error
        
    }

}


export const listarStock = async (almacen: string, pagina: number, limite: number): Promise<httpResponsePagiandor<StockI>> => {
    try {       
        


        
      const response = await instance.get(`stocks/${almacen}?pagina=${String(pagina)}&limite=${String(limite)}`);
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