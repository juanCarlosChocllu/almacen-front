
import { routerI } from "../../interfaces/routerInterface";
import { HomePage } from "../components/pages/HomePage";

export const homeRouter:routerI[]=[
    {
        path: '/bienvenido',
        component:HomePage ,
      },
]