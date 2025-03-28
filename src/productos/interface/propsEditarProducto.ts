import { ModalI } from "../../core/interfaces/modal";
import { RecargarDataI } from "../../core/interfaces/recargarData";

export interface PropsEditarProducto extends RecargarDataI, ModalI {
    idProducto:string
    }


