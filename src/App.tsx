import { AutenticacionProvider } from "./autenticacion/context/AutenticacionProvider"
import { PermisosProvider } from "./autenticacion/context/PermisosProvider"
import { IndexRouter } from "./routers/IndexRouter"

function App() {

  return (

          <AutenticacionProvider>
          <PermisosProvider>
          <IndexRouter/>
          </PermisosProvider>
           </AutenticacionProvider>
  )
}

export default App
