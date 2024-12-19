
import { ProductosPage } from "../page/ProductosPage.tsx";
import { routerI } from "../../interfaces/routerInterface.ts";

export const productosRouter:routerI[]=[
    {
        path: '/productos',
        component: ProductosPage, 
      },
]