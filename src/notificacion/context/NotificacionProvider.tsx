import React, { useContext, useEffect, useState } from 'react'
import { NotificacionContext } from './NotificacionContext'
import { NotificacionI } from './interface/notificaicon'
import { handleConnection } from '../service/notificacionService'
import * as uuid from "uuid";
import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context';
import { PermisosContext } from '../../autenticacion/context/permisos.context';

export const NotificacionProvider = ({children}:{children:React.ReactNode}) => {
    const [notificacion, setNotificacion] = useState<NotificacionI[]>([])
    const {isAutenticacion,token}=useContext(AutenticacionContext)
    const {sucursal} =useContext(PermisosContext)
    useEffect(() => {
      if(isAutenticacion && token){      
          const io = handleConnection(sucursal);
          io.on('notificaciones', (socket: NotificacionI) => {
            socket.uuid = uuid.v4();        
            setNotificacion((notificaciones) => [...notificaciones, socket]);
        });
        return () => {
            io.off('notificaciones'); 
        };
      }
    }, [sucursal]);  

    return (
        <NotificacionContext.Provider value={{ notificacion, setNotificacion }}>
            {children}
        </NotificacionContext.Provider>
    );
}
