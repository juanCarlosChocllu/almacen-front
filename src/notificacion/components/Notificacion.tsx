import { useContext, useEffect } from "react";
import { NotificacionContext } from "../context/NotificacionContext";
import { FaTimes } from "react-icons/fa";

export const Notificacion = () => {
  const { notificacion, setNotificacion } = useContext(NotificacionContext);
  useEffect(() => {
    if (notificacion.length > 0) {
      console.log(Notification.permission);
      
      if (Notification.permission === 'default') {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification('Nueva notificación', {
            body: 'Tienes notificaciones en el Sistema de almacen',
            icon: '/icon.png',
          });
        });
      }else{
        console.log('permiso denegado');
        
      }
    }
  }, [notificacion]);

  return (
    <div className="fixed top-4 right-4 flex flex-col items-end space-y-2 z-50">
      {notificacion.length > 0 &&
        notificacion.map((notif) => (
          <div
            key={notif.uuid} 
            className="bg-green-600 text-white p-4 rounded-lg shadow-xl w-80 flex flex-col space-y-3 transform transition-all duration-500 ease-in-out animate__animated animate__fadeInUp"
          >
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">{notif.producto}</p>
              <button
                className="bg-transparent text-white hover:text-gray-300 text-2xl focus:outline-none transition-colors duration-200"
                onClick={() => {
                  const nuevaNotificaicon = notificacion.filter((item) => item.uuid !== notif.uuid);
                  setNotificacion(nuevaNotificaicon);
                }}
              >
                <FaTimes />
              </button>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">Código:</span> {notif.codigoProducto}
              </p>
              <p className="text-sm">
                <span className="font-medium">Cantidad:</span> {notif.cantidad}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
