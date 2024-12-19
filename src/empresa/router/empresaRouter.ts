

import { EmpresaPage } from "../../empresa/page/EmpresaPage";
import { routerI } from "../../interfaces/routerInterface";

export const empresaRouter:routerI[]=[
    {
        path: '/empresas',
        component: EmpresaPage, 
      },
]