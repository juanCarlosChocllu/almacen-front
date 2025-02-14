import { ReactNode, useContext, useEffect, useState } from 'react'
import { UsuarioContex } from './usuarioContext'
import { informacionUsuario } from '../services/usuariosApi'
import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context'
import { UsuariosI } from '../interfaces/usuariosInterface'
import { UserInfo } from '../interfaces/userInfo'

export const UsuarioProvider = ({children}:{children:ReactNode}) => {
    const {token} = useContext(AutenticacionContext)
    const [info, setInfo]= useState<UserInfo>({
        _id:'',
    apellidos:'',
    nombres:'',
    rol:'',
    tipo:''
    })
    useEffect(()=>{
        usuarioInfo()
    },[token])

    const usuarioInfo = async()=>{
        try {
          if(token){
            const response = await informacionUsuario(token)
                setInfo(response)
                
          }
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
        <UsuarioContex.Provider value={info}>
            {children}
        </UsuarioContex.Provider>
  )
}

