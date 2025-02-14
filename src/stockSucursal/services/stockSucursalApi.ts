import { instance } from "../../config/instanceConfig"
import { httpResponsePagiandor } from "../../core/interfaces/httpRespuestaInterface"
import { tipoE } from "../../stocks/enums/tipos.enum"
import { BuscadorStockSucursalI, ParamsStockSucursalI } from "../interfaces/buscadorStockSucursal"
import { StockSucursalI } from "../interfaces/stockSucursal"
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


export const listarStockSucursal= async(token:string , limite:number, pagina:number,buscador:BuscadorStockSucursalI ):Promise<httpResponsePagiandor<StockSucursalI>>=>{  
    
  
  if(buscador.empresa) {
    delete buscador.empresa
  }

 
  try {
    const params:ParamsStockSucursalI={
      limite:limite,
      pagina:pagina
    }

    buscador.almacenSucursal ? params.almacenSucursal = buscador.almacenSucursal : params
    buscador.codigo ? params.codigo = buscador.codigo : params
    buscador.marca ? params.marca = buscador.marca : params
    buscador.tipo ? params.tipo = buscador.tipo : params
    buscador.sucursal ? params.sucursal = buscador.sucursal : params
    const response = await instance.get(`stock/sucursal`,{
      headers:{
        Authorization:`Bearer ${token}`,
        
      },
      params
    })
    return response.data
  } catch (error) {
    throw error
  }

}