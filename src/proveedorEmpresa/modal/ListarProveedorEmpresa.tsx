import { useContext, useEffect, useState } from "react";

import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { proveedorEmpresaI } from "../interface/proveedorEmpresaInterface";
import {
  eliminarProveedorEmpresa,
  proveedorEmpresas,
} from "../services/proveedorEmpresaApi";
import { Paginador } from "../../core/components/Paginador";
import { ItemsPorPagina } from "../../core/components/ItemsPorPagina";
import { BuscadorProveedor } from "../components/BuscadorProveedor";
import { CrearProveedorEmpresa } from "./CrearProveedorEmpresa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { HttpStatus } from "../../core/enums/httStatusEnum";
import { alertaDeEliminacion } from "../../core/utils/alertaEliminacion";
import { GrCheckboxSelected } from "react-icons/gr";
import { accionModal } from "../../core/hooks/accionModal";
import { EditarProveedorEmpresa } from "./EditarProveedorEmpresa";

export const ListarProveedorEmpresa = ({
  proveedorEmpresa,
}: {
  proveedorEmpresa: (proveedor: proveedorEmpresaI) => void;
}) => {
  const [proveedores, setProveedores] = useState<proveedorEmpresaI[]>([]);
  const [nit, setnit] = useState<string>();
  const [nombre, setNombre] = useState<string>();
  const [celular, setcelular] = useState<string>();
  const [recargar, setRecargar] = useState<boolean>(false);
  const [paginas, setPaginas] = useState<number>(1);
  const [pagina, setPagina] = useState<number>(1);
  const [limite, setLimite] = useState<number>(20);
  const { token } = useContext(AutenticacionContext);
  const [idProveedor , setIdProveedor] = useState<string>()
  const {isOpen, closeModal,setIsOpen} = accionModal()
  const listarProveedoresEmpresa = async () => {
    try {
      if (token) {
        const response = await proveedorEmpresas(
          token,
          limite,
          pagina,
          nit,
          nombre,
          celular
        );
        setProveedores(response.data);
        setPaginas(response.paginas);
      }
    } catch (error) {
      console.error("Error fetching proveedores:", error);
    }
  };

  const eliminar = async (id: string) => {
    try {
      if (token) {
        const response = await eliminarProveedorEmpresa(id, token);
        if (response.status == HttpStatus.OK) {
          setRecargar(!recargar);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listarProveedoresEmpresa();
  }, [nit, nombre, limite, celular, pagina, recargar]);

  return (
    <div
      className="bg-white shadow-md rounded-md"
      style={{ maxHeight: "500px", overflowY: "auto" }}
    >
      <h2 className="text-xl font-semibold mb-3">
        Lista de Proveedores de Empresa
      </h2>
      <CrearProveedorEmpresa recargar={recargar} setRecargar={setRecargar} />
      <BuscadorProveedor celular={setcelular} nit={setnit} nombre={setNombre} />
      <ItemsPorPagina page={setLimite} />
      <table className="min-w-full table-auto text-left border-collapse text-xs">
        <thead className="bg-gray-200 text-gray-700 text-sm">
          <tr>
            <th className="px-3 py-1">Empresa</th>
            <th className="px-3 py-1">Nit</th>
            <th className="px-3 py-1">Correo</th>
            <th className="px-3 py-1">Ciudad</th>
            <th className="px-3 py-1">Dirección</th>
            <th className="px-3 py-1">Celular</th>
            <th className="px-3 py-1">Accion</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((item) => (
            <tr
              key={item._id}
              className="bg-white hover:bg-gray-100 cursor-pointer transition-colors text-sm"
            >
              <td className="px-3 py-1">{item.nombre}</td>
              <td className="px-3 py-1">{item.nit}</td>
              <td className="px-3 py-1">{item.correo}</td>
              <td className="px-3 py-1">{item.ciudad}</td>
              <td className="px-3 py-1">{item.direccion}</td>
              <td className="px-3 py-1">{item.celular}</td>
              <td className="px-3 py-1 text-xl">
                <button
                  className="text-blue-500"
                  onClick={() => {
                    const proveedorSeleccionado: proveedorEmpresaI = {
                      _id: item._id,
                      celular: item.celular,
                      ciudad: item.ciudad,
                      correo: item.correo,
                      direccion: item.direccion,
                      nit: item.nit,
                      nombre: item.nombre,
                    };
                    proveedorEmpresa(proveedorSeleccionado);
                  }}
                >
                  <GrCheckboxSelected />
                </button>
                <button 
                onClick={()=>{
                  setIdProveedor(item._id)
                  setIsOpen(true)
                }}
                className="text-blue-500">
                  <FaEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => alertaDeEliminacion(() => eliminar(item._id))}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginador
        paginaActual={pagina}
        paginaSeleccionada={setPagina}
        paginas={paginas}
      />
      {isOpen && idProveedor && 
      <EditarProveedorEmpresa 
      closeModal={closeModal} 
      id={idProveedor} isOpen={isOpen} recargar={recargar} setRecargar={setRecargar} />}
    </div>
  );
};
