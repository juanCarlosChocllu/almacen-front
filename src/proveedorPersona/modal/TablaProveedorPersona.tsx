import { useContext, useEffect, useState } from 'react';
import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context';
import { proveedorPersonas } from '../services/proveedorPersonaApi';
import { proveedorPersonaI } from '../interfaces/proveedorPersonaInterface';
import { BuscadorProveedor } from '../components/BuscadorProveedor';
import { ItemsPorPagina } from '../../core/components/ItemsPorPagina';
import { Paginador } from '../../core/components/Paginador';

export const TablaProveedorPersona = ({ proveedorPersona }: { proveedorPersona: (proveedor: proveedorPersonaI) => void }) => {
  const [proveedores, setProveedores] = useState<proveedorPersonaI[]>([]);
    const {token} =useContext(AutenticacionContext)
    const [ci , setCi] = useState<string>()
  const [apellidos , setApellidos] = useState<string>()
  const [nit , setnit] = useState<string>()
  const [nombre , setNombre] = useState<string>()
  const [celular , setcelular] = useState<string>()

  const [paginas , setPaginas] = useState<number>(1)
  const [pagina , setPagina] = useState<number>(1)
  const [limite , setLimite] = useState<number>(20)
  const listarProveedoresPersona = async () => {
    try {
    if(token){
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
  }, [   limite,
    pagina,
    ci,
    nombre,
    apellidos,
    nit,
    celular]);

  return (
    <div className="p-4 bg-white shadow-md rounded-md w-full max-h-[500px] overflow-y-auto">
  <h2 className="text-xl font-semibold mb-3">Información del Proveedor</h2>
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
      </tr>
    </thead>
    <tbody>
      {proveedores.map((item) => (
        <tr
          key={item._id}
          className="bg-white hover:bg-gray-100 cursor-pointer transition-colors text-sm"
          onClick={() => {
            const seleccionado: proveedorPersonaI = {
              _id: item._id,
              nombres: item.nombres,
              apellidos: item.apellidos,
              nit: item.nit,
              celular: item.celular,
              ci: item.ci,
              ciudad: item.ciudad,
              correo: item.correo,
              direccion: item.direccion,
            };
            proveedorPersona(seleccionado);
          }}
        >
          <td className="px-3 py-1">{item.ci}</td>
          <td className="px-3 py-1">{item.nombres}</td>
          <td className="px-3 py-1">{item.apellidos}</td>
          <td className="px-3 py-1">{item.nit}</td>
          <td className="px-3 py-1">{item.correo}</td>
          <td className="px-3 py-1">{item.ciudad}</td>
          <td className="px-3 py-1">{item.direccion}</td>
          <td className="px-3 py-1">{item.celular}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <Paginador paginaActual={pagina} paginaSeleccionada={setPagina} paginas={paginas} />
</div>

  );
};
