import { routerI } from "../../core/interfaces/routerInterface";
import { AceptarTransferenciasPage } from "../pages/AceptarTransferenciasPage";
import { ListarTransferenciaPage } from "../pages/ListarTransferenciaPage";
import { mostrarTranferenciaCodigoPage } from "../pages/MostrarTranferenciaCodigoPage";
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

    
    {
        path: '/transferencia/codigo',
        component: mostrarTranferenciaCodigoPage, 
    },

   

]