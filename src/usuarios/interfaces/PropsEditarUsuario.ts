import { ModalI } from "../../core/interfaces/modal";
import { RecargarDataI } from "../../core/interfaces/recargarData";

export interface PropsEditarUsuario extends ModalI, RecargarDataI {
    id:string
}