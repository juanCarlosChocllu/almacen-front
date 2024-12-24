import { useState, ReactNode } from "react";
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
} from "react-icons/fa";
import { Link } from "react-router-dom";

export const Sidebar = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClasificacionOpen, setIsClasificacionOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [isTraspasosOpen, setIsTraspasosOpen] = useState(false);
  const [isOpenProveedor, setIsOpenProveedor] = useState(false);
  const [isOpenMovimientoArea, setIsOpenMovimientoArea] = useState(false);

  const toggleSidebar = () =>{
      if(isOpen){
        setIsStockOpen(false);
        setIsTraspasosOpen(false)
        setIsOpenProveedor(false)
        setIsClasificacionOpen(false)
        setIsOpenMovimientoArea(false)
      }
    
    setIsOpen(!isOpen)


  };

  const toggleClasificacion = () => setIsClasificacionOpen(!isClasificacionOpen);

  const toggleStock = () => setIsStockOpen(!isStockOpen);

  const toggleTraspasos = () => setIsTraspasosOpen(!isTraspasosOpen);

  const toggleProveedor = () => setIsOpenProveedor(!isOpenProveedor);
  const toggleMovimientoArea= () => setIsOpenMovimientoArea(!isOpenMovimientoArea);


  return (
    <div className="flex">
       <div className="  bg-gray-800 text-white ">
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

        <div>
          <Link to={"/empresas"}>
            <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
              <FaBuilding size={isOpen ? 20 : 16} className="mr-3" />
              {isOpen && <span>Empresas</span>}
            </div>
          </Link>

          <Link to={"/sucursal"}>
            <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
              <FaMapMarkerAlt size={isOpen ? 20 : 16} className="mr-3" />
              {isOpen && <span>Sucursales</span>}
            </div>
          </Link>

          <Link to={"/almacen/sucursal"}>
            <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
              <FaWarehouse size={isOpen ? 20 : 16} className="mr-3" />
              {isOpen && <span>Almacen sucursal</span>}
            </div>
          </Link>

          <Link to={"/areas"}>
            <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
              <FaMap size={isOpen ? 20 : 16} className="mr-3" />
              {isOpen && <span>Áreas</span>}
            </div>
          </Link>

          <Link to={"/almacen/area"}>
            <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
              <FaWarehouse size={isOpen ? 20 : 16} className="mr-3" />
              {isOpen && <span>Almacen área</span>}
            </div>
          </Link>

          <Link to={"/marcas"}>
            <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
              <FaTrademark size={isOpen ? 20 : 16} className="mr-3" />
              {isOpen && <span>Marcas</span>}
            </div>
          </Link>

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

          <Link to={"/productos"}>
            <div className="mb-4 cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
              <FaBox size={isOpen ? 20 : 16} className="mr-3" />
              {isOpen && <span>Productos</span>}
            </div>
          </Link>

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
                      <FaArrowRight className="mr-2" /> Realizar Transferencia
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

          <div className="cursor-pointer hover:bg-gray-700 p-3 rounded-lg flex items-center">
            <FaSignOutAlt size={isOpen ? 20 : 16} className="mr-3" />
            {isOpen && <span>Logout</span>}
          </div>
        </div>
      </div>

       </div>
      <div
        className={`ml-${isOpen ? "8" : "8"} p-6 w-full transition-all duration-300 ease-in-out`}
      >
        {children}
      </div>
    </div>
  );
};
