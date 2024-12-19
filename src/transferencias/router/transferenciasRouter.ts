
import { routerI } from "../../interfaces/routerInterface";
import { ListarTransferenciaPage } from "../pages/ListarTransferenciaPage";
import { TransferenciaPage } from "../pages/TransferenciaPage";

export const transferenciaRouter:routerI[]=[
    {
        path: '/listar/transferencia',
        component: ListarTransferenciaPage, 
    },

    {
        path: '/transferencia',
        component: TransferenciaPage, 
    },
]