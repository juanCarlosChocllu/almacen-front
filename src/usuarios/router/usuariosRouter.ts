import { routerI } from "../../interfaces/routerInterface";
import { UsuariosPage } from "../page/UsuariosPage";

export const usuariosRouter:routerI[]=[
   

    {
        path: '/usuarios',
        component: UsuariosPage, 
    },
]