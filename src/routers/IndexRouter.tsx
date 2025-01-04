import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { productosRouter } from "../productos/router/productosRouter";
import { stockRouter } from "../stocks/router/stockRouter";
import { Sidebar } from "../menu/Sidebar";
import { empresaRouter } from "../empresa/router/empresaRouter";
import { categoriasRouter } from "../categorias/router/categoriasRouter";
import { sucursalRouter } from "../sucursal/router/sucursalRouter";
import { almacenSucursalRouter } from "../almacenSucursal/router/almacenSucursalRouter";
import { transferenciaRouter } from "../transferencias/router/transferenciasRouter";
import { areasRouter } from "../areas/router/areasRouter";
import { almacenAreaRouter } from "../almacenArea/router/almacenAreaRouter";
import { marcasRouter } from "../marca/router/marcaRouter";
import { subCategoriaRouter } from "../subCategorias/router/subCategoriasRouter";
import { proveedorPersonaRouter } from "../proveedorPersona/router/proveedorPersonaRouter";
import { proveedorEmpresaRouter } from "../proveedorEmpresa/router/proveedorEmpresaRouter";
import { movimientoAreaRouter } from "../movimientoArea/router/movimientoAreaRouter";
import {
  autenticacionRouter,
  logoutRouter,
} from "../autenticacion/router/autenticacionRouter";
import { rolRouter } from "../rol/router/rolRouter";
import { usuariosRouter } from "../usuarios/router/usuariosRouter";
import { useContext } from "react";
import { AutenticacionContext } from "../autenticacion/context/crear.autenticacion.context";
import { homeRouter } from "../home/router/homeRouter";
import { stockSucursalRouter } from "../stockSucursal/router/sotckSucursalRouter";

export const IndexRouter = () => {
  const { isAutenticacion } = useContext(AutenticacionContext);

  return (
    <>
      <Router>
        <Routes>
          {autenticacionRouter.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={!isAutenticacion &&<route.component />}
            />
          ))}
        </Routes>
        <Sidebar>
          {
            <Routes>
              {productosRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}

              {categoriasRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}
              {stockRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}
              {empresaRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}
              {sucursalRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}

              {almacenSucursalRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}
              {transferenciaRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}

              {areasRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}

              {almacenAreaRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}

              {marcasRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}

              {subCategoriaRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}

              {proveedorPersonaRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}

              {proveedorEmpresaRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}

              {movimientoAreaRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}

              {rolRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}

              {usuariosRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}

              {homeRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}

              
{stockSucursalRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}

              {logoutRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAutenticacion ? (
                      <route.component />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))}
            </Routes>
          }
        </Sidebar>
      </Router>
    </>
  );
};
