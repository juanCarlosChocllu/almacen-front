import { tipoE } from "../enums/tipos.enum";
import { dataProductoStock } from "./dataProducto"

export interface StockI {
    cantidad: number;
    precio: number;
    total: number;
    fechaCompra: string; 
    fechaVencimiento: string; 
    idStock: string;
    idProducto: string;
    codigoBarra: string;
    color: string;
    nombre: string;
    marca: string;
    codigo: string;
    tipo:tipoE
    almacen:string
    almacenArea:string
    
  }

export interface gudarStockI{
    data:dataProductoStock[]
    proveedorPersona?:string
    proveedorEmpresa?:string
}



export interface StockVerificarI {
  _id: string;
  codigo: string;
  cantidad: number;
  precio: number;
  total: number;
  factura: string;
  tipo: tipoE;
  fechaCompra: Date;
  fechaVencimiento: Date;
  almacenArea: string;
  producto: string;

}
