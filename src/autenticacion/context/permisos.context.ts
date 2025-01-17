import { createContext } from "react";

import {PermisosContextI, PermisosContextTipoI} from "../interface/permisosInterface";

export const PermisosContext = createContext<PermisosContextTipoI>({permisos:[],tipo:null})