import { routerI } from "../../core/interfaces/routerInterface";
import { TransferenciaCodigoSucursalPage } from "../pages/TransferenciaCodigoSucursalPage";
import { ListarTransferenciaPage } from "../pages/ListarTransferenciaPage";
import { mostrarTranferenciaCodigoPage } from "../pages/MostrarTranferenciaCodigoPage";
import { TransferenciaPage } from "../pages/TransferenciaPage";
import { listarTransferenciaSucursalPage } from "../pages/listarTransferenciaSucursalPage";
import {EditarTransferenciaRechazadaPage} from "../pages/EditarTransferenciaRechazadaPage";


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
    {
        path: '/recibir/transferencia',
        component: TransferenciaCodigoSucursalPage, 
    },

     {
            path: '/transferencia/sucursal/:id',
            component: listarTransferenciaSucursalPage, 
        },
        {
            path: '/transferencia/editar/rechazado/:id',
            component: EditarTransferenciaRechazadaPage, 
        },
    

   

]