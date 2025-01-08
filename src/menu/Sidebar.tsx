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
import { AutenticacionContext } from "../autenticacion/context/crear.autenticacion.context";
import { PermisosContext } from "../autenticacion/context/permisos.context";
import { ModulosE } from "../enums/modulos.enum";



export const Sidebar = ({ children }: { children: ReactNode }) => {
  const { isAutenticacion, token } = useContext(AutenticacionContext);
  const permisos = useContext(PermisosContext);


  const [isOpen, setIsOpen] = useState(false);
  const [isClasificacionOpen, setIsClasificacionOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [isTraspasosOpen, setIsTraspasosOpen] = useState(false);
  const [isOpenProveedor, setIsOpenProveedor] = useState(false);
  const [isOpenMovimientoArea, setIsOpenMovimientoArea] = useState(false);
  const [isOpenUsuario, setIsOpenUsuario] = useState(false);

  const [isStockSucursalOpen, setIsStockSucursalOpen] = useState(false);
  const toggleSidebar = () => {
    if (isOpen) {
      setIsStockOpen(false);
      setIsTraspasosOpen(false);
      setIsOpenProveedor(false);
      setIsClasificacionOpen(false);
      setIsOpenMovimientoArea(false);
      setIsOpenUsuario(false);
      setIsStockSucursalOpen(false)
    }

    setIsOpen(!isOpen);
  };

  const toggleClasificacion = () =>
    setIsClasificacionOpen(!isClasificacionOpen);

  const toggleStock = () => setIsStockOpen(!isStockOpen);
  const toggleStockSucursal = () => setIsStockSucursalOpen(!isStockSucursalOpen);

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
            className={`${isOpen ? "w-64" : "w-16"
              } min-h-screen bg-gray-800 text-white p-6 flex flex-col justify-between transition-all duration-300 ease-in-out`}
          >
            <div className="flex justify-between items-center mb-4">
              <button onClick={toggleSidebar} className="text-white">
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>

            <div>
              {permisos.map((item) => {
                if (item.modulo === ModulosE.EMPRESAS) {
                  return (
                    <Link to={"/empresas"}>
                      <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
                        <FaBuilding size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Empresas</span>}
                      </div>
                    </Link>
                  );
                }

                if (item.modulo === ModulosE.SUCURSALES) {
                  return (
                    <Link to={"/sucursal"}>
                      <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
                        <FaMapMarkerAlt size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Sucursales</span>}
                      </div>
                    </Link>)
                }

                if (item.modulo === ModulosE.ALMACEN_SUCURSAL) {
                  return (
                    <Link to={"/almacen/sucursal"}>
                      <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
                        <FaWarehouse size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Almacen sucursal</span>}
                      </div>
                    </Link>
                  )
                }

                if (item.modulo === ModulosE.AREAS) {
                  return (
                    <Link to={"/areas"}>
                      <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
                        <FaMap size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Áreas</span>}
                      </div>
                    </Link>
                  )
                }

                if (item.modulo === ModulosE.ALMACEN_AREA) {
                  return (
                    <Link to={"/almacen/area"}>
                      <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
                        <FaWarehouse size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Almacen área</span>}
                      </div>
                    </Link>
                  )
                }

                if (item.modulo === ModulosE.MARCAS) {
                  return (
                    <Link to={"/marcas"}>
                      <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
                        <FaTrademark size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Marcas</span>}
                      </div>
                    </Link>
                  )
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
                            <li>
                              <Link
                                to="/categorias"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaArrowRight className="mr-2" /> Categorías
                              </Link>
                            </li>
                            <li className="mt-2">
                              <Link
                                to="/subcategorias"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaList className="mr-2" /> Sub Categorías
                              </Link>
                            </li>
                          </ol>
                        </div>
                      )}
                    </div>
                  )
                }


                if (item.modulo === ModulosE.PRODUCTOS) {
                  return (
                    <Link to={"/productos"}>
                      <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
                        <FaBox size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Productos</span>}
                      </div>
                    </Link>
                  )
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
                            <li>
                              <Link
                                to="/stock"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaArrowRight className="mr-2" /> Asignar Stock
                              </Link>
                            </li>
                            <li className="mt-2">
                              <Link
                                to="/stock/listar"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaList className="mr-2" /> Listar Stock
                              </Link>
                            </li>
                          </ol>
                        </div>
                      )}
                    </div>
                  )
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
                            
                            <li className="mt-2">
                              <Link
                                to="/stock/sucursal"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaList className="mr-2" /> Listar Stock
                              </Link>
                            </li>
                          </ol>
                        </div>
                      )}
                    </div>
                  )
                }
                if (item.modulo === ModulosE.PROVEEDOR_EMPRESA /*|| item.modulo === ModulosE.PROVEEDOR_PERSONA*/) {
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
                          <ol>
                            <li>
    
                              <Link
                                to="/proveedor/persona"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaArrowRight className="mr-2" /> Proveedor Persona
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
                          </ol>
                        </div>
                      )}
                    </div>
                  )
                }

                if (item.modulo === ModulosE.TRANSFERENCIAS) {
                  return (
                    <div className="mb-4">
                      <div
                        onClick={toggleTraspasos}
                        className="cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center"
                      >
                        <FaExchangeAlt size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Transferencias</span>}
                      </div>
                      {isTraspasosOpen && (
                        <div className="pl-6">
                          <ol>
                            <li>
                              <Link
                                to="/transferencia"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaArrowRight className="mr-2" /> Realizar
                                Transferencia
                              </Link>
                            </li>
                            <li className="mt-2">
                              <Link
                                to="/listar/transferencia"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaList className="mr-2" /> Listar Transferencias
                              </Link>
                            </li>
                          </ol>
                        </div>
                      )}
                    </div>
                  )
                }
                

                if (item.modulo === ModulosE.MOVIMIENTO_AREA) {
                  return (
                    <div className="mb-4">
                      <div
                        onClick={toggleMovimientoArea}
                        className="cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center"
                      >
                        <FaExchangeAlt size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Movimiento</span>}
                      </div>
                      {isOpenMovimientoArea && (
                        <div className="pl-6">
                          <ol>
                            <li>
                              <Link
                                to="/movimiento/area/ingresos"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaArrowRight className="mr-2" /> Ingresos Stock
                              </Link>
                            </li>
                          </ol>
                        </div>
                      )}
                    </div>
                  )
                }

                if (item.modulo === ModulosE.USUARIOS) {
                  return (
                    <div className="mb-4">
                      <div
                        onClick={toggleUsuarios}
                        className="cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center"
                      >
                        <RiAdminFill size={isOpen ? 20 : 16} className="mr-3" />
                        {isOpen && <span>Administracion</span>}
                      </div>
                      {isOpenUsuario && (
                        <div className="pl-6">
                          <ol>
                            <li>
                              <Link
                                to="/usuarios"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaUser className="mr-2" /> usuarios
                              </Link>
                            </li>
                          </ol>
                          <ol>
                            <li>
                              <Link
                                to="/rol"
                                className="w-full block text-gray-300 hover:text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                              >
                                <FaKey className="mr-2" /> Roles
                              </Link>
                            </li>
                          </ol>
                        </div>
                      )}
                    </div>


                  )
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
        className={`ml-${isOpen ? "8" : "8"
          } p-6 w-full transition-all duration-300 ease-in-out`}
      >
        {children}
      </div>
    </div>
  );
};
