import { useContext, useEffect, useState } from 'react';
import { proveedorPersonaI } from '../interfaces/proveedorPersonaInterface';
import { elimianarProveedorPersonas, proveedorPersonas } from '../services/proveedorPersonaApi';
import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context';
import { CrearProveedorPersona } from '../modal/CrearProveedorPersona';
import { BuscadorProveedor } from './BuscadorProveedor';
import { Paginador } from '../../core/components/Paginador';
import { ItemsPorPagina } from '../../core/components/ItemsPorPagina';
import { EditarProveedorPersona } from '../modal/EditarProveedorPersona';
import { accionModal } from '../../core/hooks/accionModal';
import { alertaDeEliminacion } from '../../core/utils/alertaEliminacion';
import { FaEdit } from 'react-icons/fa';
import { HttpStatus } from '../../core/enums/httStatusEnum';
import { MdDelete } from 'react-icons/md';
import { permisosModulo } from '../../core/hooks/permisos';
import { PermisoE } from '../../core/enums/PermisosEnum';
import { ModulosE } from '../../core/enums/modulos.enum';
import { PermisosContext } from '../../autenticacion/context/permisos.context';

export const ListarProveedorPersona = () => {
  const [proveedores, setProveedores] = useState<proveedorPersonaI[]>([]);
  const [ci, setCi] = useState<string>()
  const [apellidos, setApellidos] = useState<string>()
  const [nit, setnit] = useState<string>()
  const [nombre, setNombre] = useState<string>()
  const [celular, setcelular] = useState<string>()
  const  {permisos} =useContext(PermisosContext)
  const [paginas, setPaginas] = useState<number>(1)
  const [pagina, setPagina] = useState<number>(1)
  const [limite, setLimite] = useState<number>(20)
  const { token } = useContext(AutenticacionContext)
  const [idProveedor, setIdProveedor] = useState<string>()
  const { isOpen, closeModal, setIsOpen } = accionModal()
  const [recargar, setRecargar] = useState<boolean>(false)
  const listarProveedoresPersona = async () => {

    try {
      if (token) {
        const response = await proveedorPersonas(
          token,
          limite,
          pagina,
          ci,
          nombre,
          apellidos,
          nit,
          celular

        );
        setProveedores(response.data);
        setPaginas(response.paginas)
      }
    } catch (error) {
      console.error("Error fetching proveedores:", error);
    }
  };

  useEffect(() => {
    listarProveedoresPersona();
  }, [recargar, limite,
    pagina,
    ci,
    nombre,
    apellidos,
    nit,
    celular
  ]);
  const eliminar = async (id: string) => {
    try {
      if (token) {
        const response = await elimianarProveedorPersonas(id, token)
        if (response.status == HttpStatus.OK) {
          setRecargar(!recargar)
        }
      }
    } catch (error) {
      console.log(error);

    }

  }
  return (
    <div className="p-4 bg-white shadow-md rounded-md w-full">
      {permisosModulo(permisos,ModulosE.PROVEEDORES, PermisoE.CREAR) && <CrearProveedorPersona recargar={recargar} setRecargar={setRecargar} />}
      <h2 className="text-xl font-semibold mb-3">Información del Proveedor Persona</h2>
      <BuscadorProveedor
        apellidos={setApellidos}
        celular={setcelular}
        ci={setCi}
        nit={setnit}
        nombre={setNombre}
      />
      <ItemsPorPagina page={setLimite} />
      <table className="min-w-full table-auto text-left border-collapse">
        <thead className="bg-gray-200 text-gray-700 text-sm">
          <tr>
            <th className="px-3 py-1">CI</th>
            <th className="px-3 py-1">Nombres</th>
            <th className="px-3 py-1">Apellidos</th>
            <th className="px-3 py-1">NIT</th>
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
              <td className="px-3 py-1">{item.ci}</td>
              <td className="px-3 py-1">{item.nombres}</td>
              <td className="px-3 py-1">{item.apellidos}</td>
              <td className="px-3 py-1">{item.nit}</td>
              <td className="px-3 py-1">{item.correo}</td>
              <td className="px-3 py-1">{item.ciudad}</td>
              <td className="px-3 py-1">{item.direccion}</td>
              <td className="px-3 py-1">{item.celular}</td>
              <td className="px-3 py-1 text-xl">
                {permisosModulo(permisos,ModulosE.PROVEEDORES, PermisoE.EDITAR) && <button onClick={() => {
                  setIdProveedor(item._id)
                  setIsOpen(true)
                }}
                  className='text-blue-500'><FaEdit /> </button>}


                {permisosModulo(permisos,ModulosE.PROVEEDORES, PermisoE.ELIMINAR) && <button onClick={() => alertaDeEliminacion(() => eliminar(item._id))} className='text-red-500'><MdDelete /> </button>}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginador paginaActual={pagina} paginaSeleccionada={setPagina} paginas={paginas} />
      {idProveedor && isOpen && <EditarProveedorPersona closeModal={closeModal} id={idProveedor} isOpen={isOpen} recargar={recargar} setRecargar={setRecargar} />}
    </div>

  );
};
