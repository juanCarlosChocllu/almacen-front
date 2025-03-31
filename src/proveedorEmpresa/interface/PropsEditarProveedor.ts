import { ModalI } from "../../core/interfaces/modal";
import { RecargarDataI } from "../../core/interfaces/recargarData";

export interface PropsEditarProveedorI extends ModalI, RecargarDataI {
    id:string
}