import { tipoE } from "../enums/tipos.enum"

export interface buscadorStockI{
    codigo:string,
    codigoBarra:string
    tipo:tipoE
}