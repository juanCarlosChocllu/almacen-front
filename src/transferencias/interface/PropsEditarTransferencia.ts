import { ModalI } from "../../core/interfaces/modal";
import { RecargarDataI } from "../../core/interfaces/recargarData";

export interface PropsEditarTransferencia extends ModalI, RecargarDataI{
    transferencia: string;
    idSusursal: string;
    codigo:string
    producto:string
    idAlmacen: string;
    cantidad: number;
   
}