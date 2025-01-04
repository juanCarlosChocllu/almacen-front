import { useContext, useEffect } from 'react'
import { AutenticacionContext } from '../context/crear.autenticacion.context'

export const Logout = () => {
    const {logout} = useContext(AutenticacionContext)
   useEffect(()=>{
    logout()
   },[])
   window.location.href ='/'
    return null
}
