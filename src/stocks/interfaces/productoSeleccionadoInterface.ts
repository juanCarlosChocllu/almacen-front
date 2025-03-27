import { productoI } from "../../productos/interface/productoInterface";
import { dataProductoI } from "./dataProducto";

export interface productoSeleccionadoPropsI{
    data:dataProductoI[],
    nuevaData?:(data:dataProductoI[])=>void | undefined
}


export interface productoIProps {
    producto:productoI
}