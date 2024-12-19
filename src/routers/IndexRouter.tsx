import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

export const IndexRouter = () => {
  return (
    <>
      <Router>
        <Sidebar>
          {
            <Routes>
              {productosRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}

              {categoriasRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
              {stockRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
              {empresaRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
              {sucursalRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}

              {almacenSucursalRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}

              {transferenciaRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}

              {areasRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}

              {almacenAreaRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}

              {marcasRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}

              {subCategoriaRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}

              {proveedorPersonaRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}

              {proveedorEmpresaRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
          }
        </Sidebar>
      </Router>
    </>
  );
};
