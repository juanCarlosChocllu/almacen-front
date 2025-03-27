import { createContext } from "react";
import { UsuariosI } from "../interfaces/usuariosInterface";
import { UserInfo } from "../interfaces/userInfo";


export const UsuarioContex = createContext<UserInfo>({
    _id:'',
    apellidos:'',
    nombres:'',
    rol:'',
    tipo:''
})