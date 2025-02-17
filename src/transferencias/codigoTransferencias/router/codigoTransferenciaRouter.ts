import { routerI } from "../../../core/interfaces/routerInterface";

import { CodigoTransferenciaPage } from "../pages/CodigoTransferenciaPage";
import { TransferenciasPageInformacion } from "../pages/TransferenciasPageInformacion";


export const codigoTransferenciaRouter:routerI[]=[

    {
        path: '/listar/codigo/transferencia',
        component: CodigoTransferenciaPage, 
    },

    {
        path: '/transferencia/:id',
        component: TransferenciasPageInformacion, 
    },

]