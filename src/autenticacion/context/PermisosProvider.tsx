import { ReactNode, useContext, useEffect, useState } from "react"
import { PermisosContext } from "./permisos.context"
import { AutenticacionContext } from "./crear.autenticacion.context"
import {useJwt} from 'react-jwt' 
import { TokenI } from "../interface/tokenInterface"
import { PermisosContextI } from "../interface/permisosInterface"
import { verificarPermisosPorRol } from "../../permisos/services/permisosApi"


export const PermisosProvider = ({children}:{children:ReactNode}) => {
    const [permisos, setPermisos] = useState<PermisosContextI[]>([])
    
    const {token}= useContext(AutenticacionContext)
  if(token){
    var { decodedToken, isExpired }  = useJwt<TokenI>(token);
    useEffect(()=>{
     if(decodedToken){
        obtenerPermisos(decodedToken.rol, token)
     }
    },[token,decodedToken])   
  }

  const obtenerPermisos= async(rol:string, token:string)=>{
    try {
       const response =  await verificarPermisosPorRol(rol, token)
       const p = response.map((item)=> {
        const p = {
            modulo:item.modulo,
            acciones:item.acciones
        }
        return p
        
       } )
      setPermisos(p)
    } catch (error) {
        console.log(error);
        
    }
  }
  return (
   <PermisosContext.Provider value={permisos}>{children}</PermisosContext.Provider>
  )
}
