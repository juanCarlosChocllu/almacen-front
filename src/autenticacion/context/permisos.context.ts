import { createContext } from "react";

import {PermisosContextTipoI} from "../interface/permisosInterface";

export const PermisosContext = createContext<PermisosContextTipoI>({permisos:[],tipo:null,sucursal:null})