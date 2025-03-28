import { ModalI } from "../../core/interfaces/modal";
import { RecargarDataI } from "../../core/interfaces/recargarData";

export interface PropsEditarSudCategoriasI  extends RecargarDataI, ModalI {
        idCategoria:string
        categoriaNombre:string
        idSudCategoria:string

}