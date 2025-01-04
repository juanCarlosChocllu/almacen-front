import { createContext } from "react";
import { autenticacionContextI } from "../interface/contextInterface";

export  const  AutenticacionContext = createContext<autenticacionContextI>({
    isAutenticacion:false,
    token:null,
    asignarToken(){},
    logout(){}
})

