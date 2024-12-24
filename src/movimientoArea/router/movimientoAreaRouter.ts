

import { routerI } from "../../interfaces/routerInterface.ts";
import { IngresosPage } from "../page/IngresosPage.tsx";

export const movimientoAreaRouter:routerI[]=[
    {
        path: '/movimiento/area/ingresos',
        component: IngresosPage, 
      },
     
]