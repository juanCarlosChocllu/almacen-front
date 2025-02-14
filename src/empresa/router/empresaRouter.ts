

import { EmpresaPage } from "../../empresa/page/EmpresaPage";
import { routerI } from "../../core/interfaces/routerInterface";

export const empresaRouter:routerI[]=[
    {
        path: '/empresas',
        component: EmpresaPage, 
      },
]