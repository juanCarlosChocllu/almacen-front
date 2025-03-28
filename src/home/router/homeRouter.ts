
import { routerI } from "../../core/interfaces/routerInterface";
import { HomePage } from "../pages/HomePage";

export const homeRouter:routerI[]=[
    {
        path: '/bienvenido',
        component:HomePage ,
      },
]