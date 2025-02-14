import { ReactNode, useContext, useEffect, useState } from "react"
import { PermisosContext } from "./permisos.context"
import { AutenticacionContext } from "./crear.autenticacion.context"
import {useJwt} from 'react-jwt' 
import { TokenI } from "../interface/tokenInterface"
import { PermisosContextI } from "../interface/permisosInterface"
import { verificarPermisosPorRol } from "../../permisos/services/permisosApi"
import { TipoE } from "../../usuarios/enums/tipo.enum"


export const PermisosProvider = ({children}:{children:ReactNode}) => {
    const [permisos, setPermisos] = useState<PermisosContextI[]>([])
    const [tipo, setTipo]=useState<string> ('')
    const [sucursal, setSucursal]=useState<string> ('')

    const {token}= useContext(AutenticacionContext)
  if(token){
    var { decodedToken }  = useJwt<TokenI>(token);    
    useEffect(()=>{
     if(decodedToken){
   
      
      setTipo(decodedToken.tipo)
        obtenerPermisos(decodedToken.rol, token)
       if(decodedToken.tipo == TipoE.SUCURSAL){
        setSucursal(decodedToken.sucursal)
       }
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
   <PermisosContext.Provider value={{permisos:permisos, tipo:tipo , sucursal}}>{children}</PermisosContext.Provider>
  )
}
