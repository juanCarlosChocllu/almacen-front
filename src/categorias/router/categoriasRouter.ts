
import { IndexPageCategorias } from "../../categorias/page/IndexPageCategorias";
import { routerI } from "../../core/interfaces/routerInterface";

export const categoriasRouter:routerI[]=[
    {
        path: '/categorias',
        component: IndexPageCategorias, 
      },
]