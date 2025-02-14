

import { routerI } from "../../core/interfaces/routerInterface";
import { Logout } from "../components/Logout";
import { AuntenticacionPage } from "../page/AuntenticacionPage";

export const autenticacionRouter:routerI[]=[
    {
        path: '/',
        component: AuntenticacionPage, 
      },
]

export const logoutRouter:routerI[]=[
  {
      path: '/logout',
      component: Logout, 
    },
]