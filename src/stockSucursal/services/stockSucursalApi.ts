import { instance } from "../../config/instanceConfig"
import { tipoE } from "../../stocks/enums/tipos.enum"
import { StockSucursalVerificarI } from "../interfaces/stockSucursalInterface"

export const verificarCantidadStockSucursal =async(stock:string, almacen:string, tipo:tipoE, token:string):Promise<StockSucursalVerificarI>=>{
  try {
    const response = await instance.get(`stock/sucursal/verificar/cantidad/${stock}/${almacen}/${tipo}`,
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


export const listarStockSucursal= async(token:string )=>{
  try {
    const response = await instance.get(`stock/sucursal`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    throw error
  }

}