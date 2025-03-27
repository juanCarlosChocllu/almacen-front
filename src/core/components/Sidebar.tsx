import { useState, ReactNode, useContext } from "react";
import {
  FaTimes,
  FaBars,
  FaBox,
  FaWarehouse,
  FaUsers,
  FaSignOutAlt,
  FaArrowRight,
  FaList,
  FaBuilding,
  FaMapMarkerAlt,
  FaTrademark,
  FaTag,
  FaMap,
  FaExchangeAlt,
  FaUser,
  FaKey,
} from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { PermisosContext } from "../../autenticacion/context/permisos.context";
import { ModulosE } from "../enums/modulos.enum";
import { UsuarioContex } from "../../usuarios/context/usuarioContext";

export const Sidebar = ({ children }: { children: ReactNode }) => {
  const { isAutenticacion, token } = useContext(AutenticacionContext);
  const { permisos } = useContext(PermisosContext);
  const {nombres , apellidos, rol ,area ,sucursal} = useContext(UsuarioContex)

  
  const [isOpen, setIsOpen] = useState(false);
  const [isClasificacionOpen, setIsClasificacionOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [isTraspasosOpen, setIsTraspasosOpen] = useState(false);
  const [isOpenProveedor, setIsOpenProveedor] = useState(false);
  const [isOpenMovimientoArea, setIsOpenMovimientoArea] = useState(false);
  const [isOpenUsuario, setIsOpenUsuario] = useState(false);
  const [isOpenRol, setIsOpenRol] = useState(false);


  const [isStockSucursalOpen, setIsStockSucursalOpen] = useState(false);
  const toggleSidebar = () => {
    if (isOpen) {
      setIsStockOpen(false);
      setIsTraspasosOpen(false);
      setIsOpenProveedor(false);
      setIsClasificacionOpen(false);
      setIsOpenMovimientoArea(false);
      setIsOpenUsuario(false);
      setIsStockSucursalOpen(false);
      setIsOpenRol(false)
    }

    setIsOpen(!isOpen);
  };

  const togglerol =() =>{
    setIsOpenRol(!isOpenRol)
  } 
   const toggleClasificacion = () =>
    setIsClasificacionOpen(!isClasificacionOpen);

  const toggleStock = () => setIsStockOpen(!isStockOpen);
  const toggleStockSucursal = () =>
    setIsStockSucursalOpen(!isStockSucursalOpen);

  const toggleTraspasos = () => setIsTraspasosOpen(!isTraspasosOpen);

  const toggleProveedor = () => setIsOpenProveedor(!isOpenProveedor);
  const toggleMovimientoArea = () =>
    setIsOpenMovimientoArea(!isOpenMovimientoArea);
  const toggleUsuarios = () => setIsOpenUsuario(!isOpenUsuario);

  return (
    <div className="flex">
      <div className="  bg-gray-800 text-white ">
        {token && isAutenticacion && (
          <div
            className={`${
              isOpen ? "w-64" : "w-16"
            } min-h-screen bg-gray-800 text-white p-6 flex flex-col justify-between transition-all duration-300 ease-in-out`}
          >
            <div className="flex justify-between items-center mb-4">
              <button onClick={toggleSidebar} className="text-white">
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>



            <div className="flex items-center mb-6 p-4 border-b border-gray-600">
             

              {isOpen && (
                <div>
                  <h2 className="text-xl font-semibold">Nombre:{nombres} {apellidos}</h2>
                  <p className="text-sm text-gray-500">
                    Rol: <span className="font-medium">{rol}</span>
                  </p>
                  {sucursal && <p className="text-sm text-gray-500">
                    Sucursal: <span className="font-medium">{sucursal}</span>
                  </p>}
                  <p className="text-sm text-gray-500">
                  {area &&  <>Area: {area} <br /> </> }
                    {area &&  <> <Link  to='/bienvenido'>Cambiar de area </Link>  </>}
                  
                  </p>
                  
                </div>
                  
              )}
            </div>



            <div>
              {permisos.map((item , index) => {
                if (item.modulo === ModulosE.EMPRESAS) {
                  return item.acciones.some((p) => p.includes('LISTAR')) &&  <Link to={"/empresas"}>
                  <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
                    <FaBuilding size={isOpen ? 20 : 16} className="mr-3" />
                    {isOpen && <span>Empresas</span>}
                  </div>
                </Link>
                   
                  
                }

                if (item.modulo === ModulosE.SUCURSALES) {
        
                  return ( item.acciones.some((p) => p.includes('LISTAR')) &&
                    <Link to={"/sucursal"}>
                      <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
                        <FaMapMarkerAlt
                          size={isOpen ? 20 : 16}
                          className="mr-3"
                        />
                        {isOpen && <span>Sucursales</span>}
                      </div>
                    </Link>
                  );
                }

                if (item.modulo === ModulosE.ALMACEN_SUCURSAL) {
                  return (item.acciones.some((p) => p.includes('LISTAR')) &&
                    <Link to={"/almacen/sucursal"}>
                      <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
                        <FaWarehouse size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Almacen sucursal</span>}
                      </div>
                    </Link>
                  );
                }

                if (item.modulo === ModulosE.AREAS) {
                  return (item.acciones.some((p) => p.includes('LISTAR')) &&
                    <Link to={"/areas"}>
                      <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
                        <FaMap size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Áreas</span>}
                      </div>
                    </Link>
                  );
                }

                if (item.modulo === ModulosE.ALMACEN_AREA) {
                  return ( item.acciones.some((p) => p.includes('LISTAR')) &&
                    <Link to={"/almacen/area"}>
                      <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
                        <FaWarehouse size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Almacen área</span>}
                      </div>
                    </Link>
                  );
                }

                if (item.modulo === ModulosE.MARCAS) {
                  return ( item.acciones.some((p) => p.includes('LISTAR')) &&
                    <Link to={"/marcas"}>
                      <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
                        <FaTrademark size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Marcas</span>}
                      </div>
                    </Link>
                  );
                }

                if (item.modulo === ModulosE.CATEGORIAS) {
                  return (
                    <div className="mb-4">
                      <div
                        onClick={toggleClasificacion}
                        className="cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center"
                      >
                        <FaTag size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Clasificación</span>}
                      </div>
                      {isClasificacionOpen && (
                        <div className="pl-6">
                          <ol>
                            {item.acciones.some((p) => p.includes('LISTAR')) && <li>
                              <Link
                                to="/categorias"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaArrowRight className="mr-2" /> Categorías
                              </Link>
                            </li> }
                          {item.acciones.some((p) => p.includes('LISTAR')) &&  <li className="mt-2">
                              <Link
                                to="/subcategorias"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaList className="mr-2" /> Sub Categorías
                              </Link>
                            </li> }
                          </ol> 
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.modulo === ModulosE.PRODUCTOS) {
                  return ( item.acciones.some((p) => p.includes('LISTAR')) && 
                    <Link to={"/productos"}>
                      <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
                        <FaBox size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Productos</span>}
                      </div>
                    </Link>
                  );
                }

                if (item.modulo === ModulosE.STOCK) {
                  return (
                    <div className="mb-4">
                      <div
                        onClick={toggleStock}
                        className="cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center"
                      >
                        <FaWarehouse size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Stock</span>}
                      </div>
                      {isStockOpen && (
                        <div className="pl-6">
                          <ol>
                           { item.acciones.some((p) => p.includes('ASIGNAR STOCK')) &&  <li>
                              <Link
                                to="/stock"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaArrowRight className="mr-2" /> Asignar Stock
                              </Link>
                            </li> }
                           
                          {item.acciones.some((p) => p.includes('LISTAR')) &&   <li className="mt-2">
                              <Link
                                to="/stock/listar"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaList className="mr-2" /> Listar Stock
                              </Link>
                            </li> }

                            
                          </ol>
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.modulo === ModulosE.STOCK_SUCURSAL) {
                  return (
                    <div className="mb-4">
                      <div
                        onClick={toggleStockSucursal}
                        className="cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center"
                      >
                        <FaWarehouse size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Stock sucursal</span>}
                      </div>
                      {isStockSucursalOpen && (
                        <div className="pl-6">
                          <ol>
                            {item.acciones.some((p) => p.includes('LISTAR')) &&  <li className="mt-2">
                              <Link
                                to="/stock/sucursal"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaList className="mr-2" /> Listar Stock
                              </Link>
                            </li> }
                          </ol>
                         
                        </div>
                      )}
                    </div>
                  );
                }
                if (
                  item.modulo ==
                  (ModulosE.PROVEEDORES)
                ) {
                  return (
                    <div className="mb-4">
                      <div
                        onClick={toggleProveedor}
                        className="cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center"
                      >
                        <FaUsers size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Proveedores</span>}
                      </div>
                      {isOpenProveedor && (
                        <div className="pl-6">
                         {item.acciones.some((p) => p.includes('LISTAR')) &&   <ol>
                            <li>
                              <Link
                                to="/proveedor/persona"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaArrowRight className="mr-2" /> Proveedor
                                Persona
                              </Link>
                            </li>
                            <li className="mt-2">
                              <Link
                                to="/proveedor/empresa"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaList className="mr-2" /> Proveedor Empresa
                              </Link>
                            </li>
                          </ol> }
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.modulo === ModulosE.TRANSFERENCIAS) {
                  return (
                    <div className="mb-4">
                      <div
                        onClick={toggleTraspasos}
                        className="cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center"
                      >
                        <FaExchangeAlt
                          size={isOpen ? 20 : 16}
                          className="mr-3"
                        />
                        {isOpen && <span>Transferencias</span>}
                      </div>
                      {isTraspasosOpen && (
                        <div className="pl-6">
                          
              
                            <ol>

                            {item.acciones.some((p) => p.includes('REALIZAR TRANSFERENCIAS')) &&   <li>
                              <Link
                                to="/transferencia"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaArrowRight className="mr-2" /> Realizar
                                Transferencia
                              </Link>
                            </li> }
                                

                            {item.acciones.some((p) => p.includes('LISTAR')) &&    <li className="mt-2">
                              <Link
                                to="/listar/transferencia"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaList className="mr-2" /> Listar
                                Transferencias 
                              </Link>
                            </li> }

                            {item.acciones.some((p) => p.includes('LISTAR')) &&     <li className="mt-2">
                              <Link
                                to="/listar/codigo/transferencia"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaList className="mr-2" /> 
                                Transferencias enviadas
                              </Link>
                            </li> }
                        
                            

                           



                          
                            {item.acciones.some((p) => p.includes('RECIBIR TRANSFERENCIAS')) &&    <li className="mt-2">
                              <Link
                                to="/recibir/transferencia"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaList className="mr-2" /> Recibir Transferencia
                              </Link>
                            </li>}
                          
                            </ol> 
                      
                          
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.modulo === ModulosE.MOVIMIENTO_AREA) {
                  return (
                    <div className="mb-4">
                      <div
                        onClick={toggleMovimientoArea}
                        className="cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center"
                      >
                        <FaExchangeAlt
                          size={isOpen ? 20 : 16}
                          className="mr-3"
                        />
                        {isOpen && <span>Movimiento</span>}
                      </div>
                      {isOpenMovimientoArea && (
                        <div className="pl-6">
                          {item.acciones.some((p) => p.includes('LISTAR')) &&    <ol>
                            <li>
                              <Link
                                to="/movimiento/area/ingresos"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaArrowRight className="mr-2" /> Ingresos Stock
                              </Link>
                            </li>
                            
                            <li className="mt-2">
                              <Link
                                to="/codigo/stock"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaList className="mr-2" />Ingresos por codigo
                              </Link>
                            </li>
                          </ol>}

                        </div>
                      )}
                    </div>
                  );
                }

                if (item.modulo === ModulosE.USUARIOS   ) {
                  
                  return (
                    <div className="mb-4">
                      <div
                        onClick={toggleUsuarios}
                        className="cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center"
                      >
                        <RiAdminFill size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Administracion usuarios</span>}
                      </div>
                      {isOpenUsuario && (
                        <div className="pl-6">

                          
                            <ol>
                            {item.acciones.some((i)=> i.includes('LISTAR USUARIOS')) &&  <li>
                              <Link
                                to="/usuarios"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaUser className="mr-2" /> usuarios
                              </Link>
                            </li> }
                              </ol> 
                          
                           <ol>
                      
                          </ol> 
                        </div>
                      )}
                    </div>
                  );
                }

                
                if (item.modulo === ModulosE.ROL   ) {
                  
                  return (
                    <div className="mb-4">
                      <div
                        onClick={togglerol}
                        className="cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center"
                      >
                        <RiAdminFill size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Administracion de roles</span>}
                      </div>
                      {isOpenRol && (
                        <div className="pl-6">

    
                           <ol>
                        {item.acciones.some((i)=> i.includes('LISTAR ROL')) &&  <li>
                              <Link
                                to="/rol"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaKey className="mr-2" /> Roles
                              </Link>
                            </li> }
                          </ol> 
                        </div>
                      )}
                    </div>
                  );
                }
              })}

              <div className="cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
                <Link to={"/logout"}>
                  <FaSignOutAlt size={isOpen ? 20 : 16} className="mr-3" />
                  {isOpen && <span>Logout</span>}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className={`ml-${
          isOpen ? "8" : "8"
        } p-6 w-full transition-all duration-300 ease-in-out`}
      >
        {children}
      </div>
    </div>
  );
};
