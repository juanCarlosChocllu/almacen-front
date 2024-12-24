import { tipoE } from "../../stocks/enums/tipos.enum";

export interface StockTransferenciaVInterfaceI {
    id: string;
    cantidad:number,
    tipo:tipoE
}