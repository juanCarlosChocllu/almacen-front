import { routerI } from "../../core/interfaces/routerInterface";
import { RecibirTranferenciaPage } from "../pages/RecibirTranferenciaPage";
import { ListarTransferenciaPage } from "../pages/ListarTransferenciaPage";
import { mostrarTranferenciaCodigoPage } from "../pages/MostrarTranferenciaCodigoPage";
import { TransferenciaPage } from "../pages/TransferenciaPage";
import { listarAlmaceBuscadorSucursal } from "../../almacenSucursal/services/almacenSucursalApi";
import { ListarTransferenciaPorCodigoSucursal } from "../components/ListarTransferenciaPorCodigoSucursal";
import { listarTransferenciaSucursalPage } from "../pages/listarTransferenciaSucursalPage";


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
        component: RecibirTranferenciaPage, 
    },

     {
            path: '/transferencia/sucursal/:id',
            component: listarTransferenciaSucursalPage, 
        },
    

   

]