import { routerI } from "../../interfaces/routerInterface";
import { AreasPage } from "../page/AreasPage";

export const areasRouter:routerI[]=[
    {
        path: '/areas',
        component: AreasPage, 
      },
]