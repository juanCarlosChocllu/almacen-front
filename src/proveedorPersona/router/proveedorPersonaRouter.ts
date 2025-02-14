
import { routerI } from "../../core/interfaces/routerInterface";
import { ProveedorPersonaPage } from "../page/ProveedorPersonaPage";


export const proveedorPersonaRouter:routerI[]=[
    {
        path: '/proveedor/persona',
        component:ProveedorPersonaPage ,
      },
]