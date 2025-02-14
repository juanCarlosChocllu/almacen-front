

import { routerI } from "../../core/interfaces/routerInterface.ts";
import { MarcaPage } from "../page/MarcaPage.tsx";

export const marcasRouter:routerI[]=[
    {
        path: '/marcas',
        component: MarcaPage, 
      },
]