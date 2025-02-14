
import { routerI } from "../../core/interfaces/routerInterface";
import { ProveedorEmpresaPage } from "../page/ProveedorEmpresaPage";

export const proveedorEmpresaRouter:routerI[]=[
    {
        path: '/proveedor/empresa',
        component:ProveedorEmpresaPage ,
      },
]