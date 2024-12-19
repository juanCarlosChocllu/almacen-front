

import { routerI } from "../../interfaces/routerInterface.ts";
import { MarcaPage } from "../page/MarcaPage.tsx";

export const marcasRouter:routerI[]=[
    {
        path: '/marcas',
        component: MarcaPage, 
      },
]