import { instance } from "../../config/instanceConfig"
import { tipoE } from "../../stocks/enums/tipos.enum"
import { StockTransferenciaVInterfaceI } from "../interfaces/stockTransferenciaInterface"

export const verificarCantidadStockTransferencia =async(stock:string, almacen:string, tipo:tipoE):Promise<StockTransferenciaVInterfaceI>=>{
  try {
    const response = await instance.get(`stock/transferencia/verificar/cantidad/${stock}/${almacen}/${tipo}`)
    return response.data
  } catch (error) {
    throw error
  }
}