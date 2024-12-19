import { routerI } from "../../interfaces/routerInterface";
import { AlmAcenSucursalPage } from "../page/AlmAcenSucursalPage";

export const almacenSucursalRouter:routerI[]=[
    {
        path:'/almacen/sucursal',
        component:AlmAcenSucursalPage
    }
]