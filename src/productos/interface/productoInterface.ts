import { ModalPropsI } from "../../core/interfaces/modalProps.Interface"

export interface productoI{
    _id:string
    codigo:string,
    nombre:string,
    descripcion:string
    categoria:string
    genero:string
    talla:string
    subCategoria:string
    codigoBarra:string
    color:string
    imagen:string
    marca:string
}   

export interface productosPropsI extends ModalPropsI{
    productoSeleccionado:(producto:productoI)=>void
}