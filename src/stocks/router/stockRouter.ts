import { StockPage } from "../page/StockPage";
import { routerI } from "../../core/interfaces/routerInterface";
import { StockPageListar } from "../page/StockPageListar";


export const stockRouter:routerI[]=[
    {
        path: '/stock',
        component: StockPage, 
      },

      {
        path: '/stock/listar',
        component: StockPageListar, 
      },

]

