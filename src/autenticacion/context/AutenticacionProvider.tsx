import { ReactNode, useContext, useEffect, useState } from 'react'
import { AutenticacionContext } from './crear.autenticacion.context';
import  cookies from 'js-cookie'
import { autenticacionContextI } from '../interface/contextInterface';
export const AutenticacionProvider = ({children}:{children:ReactNode}) => {
  const token:string |undefined= cookies.get('token')
    const [isAutenticacion, setIsAutenticacion] = useState<boolean>(true);

    const asignarToken =(token:string)=>{
      cookies.set('token', token)
      setIsAutenticacion(true)
    }
    
   
    const logout =()=>{
      cookies.remove('token')
      setIsAutenticacion(false)
    }
    useEffect(()=>{
      if(token){
        
        setIsAutenticacion(true)

      }else{
        setIsAutenticacion(false)

      }
    },[token])
    
        
  return (
      <AutenticacionContext.Provider
      value={{
        isAutenticacion,
        token,
        asignarToken,
        logout
      }}
      >
        {children}
      </AutenticacionContext.Provider>
) 
}

export const obtenerToken =()=>{
  const context = useContext(AutenticacionContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}