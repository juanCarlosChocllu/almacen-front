import { ModalPropsI } from "../../interfaces/modalProps.Interface"

export interface proveedorEmpresaI {
    
_id:string
nombre:string
nit:string
correo:string
ciudad:string
direccion:string
celular:string
}

export interface  proveedorEmpresaSeleccioanadoI extends ModalPropsI{
    proveedorEmpresa:(proveedorEmpresa:proveedorEmpresaI)=>void
}