import { AutenticacionProvider } from "./autenticacion/context/AutenticacionProvider"
import { PermisosProvider } from "./autenticacion/context/PermisosProvider"
import { Notificacion } from "./notificacion/components/Notificacion"
import { NotificacionProvider } from "./notificacion/context/NotificacionProvider"
import { IndexRouter } from "./routers/IndexRouter"
import { UsuarioProvider } from "./usuarios/context/UsuarioProvider"

function App() {

  return (

          <AutenticacionProvider>
          <PermisosProvider>
           <NotificacionProvider>
            <UsuarioProvider>
            <>
           <IndexRouter/>
           <Notificacion/>
           </>
            </UsuarioProvider>
           </NotificacionProvider>
          </PermisosProvider>
           </AutenticacionProvider>
  )
}

export default App
