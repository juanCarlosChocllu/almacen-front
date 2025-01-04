import { tipoE } from "../../stocks/enums/tipos.enum";

export interface StockSucursalVerificarI {
    id: string;
    cantidad:number,
    tipo:tipoE
}