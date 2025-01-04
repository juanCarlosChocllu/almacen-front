import { createContext } from "react";

import {PermisosContextI } from "../interface/permisosInterface";


export const PermisosContext = createContext<PermisosContextI[]>([])