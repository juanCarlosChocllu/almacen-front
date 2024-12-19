import { ModalPropsI } from "../../interfaces/modalProps.Interface";

export interface proveedorPersonaI {
    _id:string,
    ci:string,
    nombres: string,
    apellidos: string,
    nit: string,
    correo: string,
    ciudad: string,
    direccion: string,
    celular:string,
}

export interface ProveedorPersonaSeleccionadoI extends ModalPropsI {
    proveedorPersona:(provedor:proveedorPersonaI)=>void

}