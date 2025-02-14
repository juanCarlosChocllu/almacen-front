

import { routerI } from "../../core/interfaces/routerInterface.ts";
import { CodigoStockPage } from "../page/CodigoStockPage.tsx";

import { InformacionCodigoStockPage } from "../page/InformacionCodigoStockPage.tsx";
import { IngresosPage } from "../page/IngresosPage.tsx";

export const movimientoAreaRouter:routerI[]=[
    {
        path: '/movimiento/area/ingresos',
        component: IngresosPage, 
      },
      
      {
        path: '/codigo/stock',
        component: CodigoStockPage, 
      },

      {
        path: 'informacion/codigo/stock/:id',
        component: InformacionCodigoStockPage, 
      },
     
]