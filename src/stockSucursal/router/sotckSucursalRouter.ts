
import { routerI } from "../../core/interfaces/routerInterface";
import { StockSucursalPage } from "../pages/StockSucursalPage";


export const stockSucursalRouter:routerI[]=[
    {
        path: '/stock/sucursal',
        component: StockSucursalPage, 
    },

]