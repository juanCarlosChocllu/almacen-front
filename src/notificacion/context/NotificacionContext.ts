import { createContext } from "react";
import { NotificacionI } from "./interface/notificaicon";

export const NotificacionContext = createContext<{
    notificacion: NotificacionI[];
    setNotificacion: React.Dispatch<React.SetStateAction<NotificacionI[]>>; 
  }>({
    notificacion: [],
    setNotificacion: () => {},
  });
  