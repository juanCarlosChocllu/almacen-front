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
import { PermisosContext } from "../autenticacion/context/permisos.context";
import { ModulosE } from "../enums/modulos.enum";
import { NotFound } from "../notFound/NotFound";



const rutas = (routes: any[], isAutenticacion: boolean) => {
  return routes.map((route, index) => (
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
  ));
};


export const IndexRouter = () => {
  const { isAutenticacion } = useContext(AutenticacionContext);
  const { permisos } = useContext(PermisosContext);

  return (
    <>
      <Router>
        <Routes>
          {autenticacionRouter.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={!isAutenticacion ? <route.component /> : <Navigate to="/" />}
            />
          ))}
        </Routes>
        <Sidebar>
          <Routes>
            {permisos.map((item) => {
              switch (item.modulo) {
                case ModulosE.PRODUCTOS:
                  return rutas(productosRouter, isAutenticacion);
                case ModulosE.CATEGORIAS:
                  return rutas(categoriasRouter, isAutenticacion);
                case ModulosE.STOCK:
                  return rutas(stockRouter, isAutenticacion);
                case ModulosE.EMPRESAS:
                  return rutas(empresaRouter, isAutenticacion);
                case ModulosE.SUCURSALES:
                  return rutas(sucursalRouter, isAutenticacion);
                case ModulosE.ALMACEN_SUCURSAL:
                  return rutas(almacenSucursalRouter, isAutenticacion);
                case ModulosE.TRANSFERENCIAS:
                  return rutas(transferenciaRouter, isAutenticacion);
                case ModulosE.AREAS:
                  return rutas(areasRouter, isAutenticacion);
                case ModulosE.ALMACEN_AREA:
                  return rutas(almacenAreaRouter, isAutenticacion);
                case ModulosE.MARCAS:
                  return rutas(marcasRouter, isAutenticacion);
                case ModulosE.SUB_CATEGORIAS:
                  return rutas(subCategoriaRouter, isAutenticacion);
                case ModulosE.PROVEEDOR_PERSONA:
                  return rutas(proveedorPersonaRouter, isAutenticacion);
                case ModulosE.PROVEEDOR_EMPRESA:
                  return rutas(proveedorEmpresaRouter, isAutenticacion);
                case ModulosE.MOVIMIENTO_AREA:
                  return rutas(movimientoAreaRouter, isAutenticacion);
                case ModulosE.ROL:
                  return rutas(rolRouter, isAutenticacion);
                case ModulosE.USUARIOS:
                  return rutas(usuariosRouter, isAutenticacion);
                case ModulosE.STOCK_SUCURSAL:
                  return rutas(stockSucursalRouter, isAutenticacion);
                default:
                  return <Route path="*" element={<NotFound />} />;
              }
            })}
            {rutas(logoutRouter, isAutenticacion)}
            {rutas(homeRouter, isAutenticacion)}
          </Routes>
        </Sidebar>
      </Router>
    </>
  );
};