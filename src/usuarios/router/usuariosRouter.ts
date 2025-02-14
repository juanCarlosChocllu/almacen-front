import { routerI } from "../../core/interfaces/routerInterface";
import { UsuariosPage } from "../page/UsuariosPage";

export const usuariosRouter:routerI[]=[
   

    {
        path: '/usuarios',
        component: UsuariosPage, 
    },
]