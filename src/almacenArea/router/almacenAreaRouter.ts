import { routerI } from "../../core/interfaces/routerInterface";
import { AlmacenPage } from "../page/AlmacenPage";

export const almacenAreaRouter:routerI[]=[
    {
        path:'/almacen/area',
        component:AlmacenPage
    }
]