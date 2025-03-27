import { useContext, useEffect, useState } from 'react';
import { proveedorEmpresaI } from '../interface/proveedorEmpresaInterface';
import { proveedorEmpresas } from '../services/proveedorEmpresaApi';
import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context';
import { FormProveedorEmpresa } from '../modal/FormProveedorEmpresa';
import { Paginador } from '../../core/components/Paginador';
import { ItemsPorPagina } from '../../core/components/ItemsPorPagina';
import {BuscadorProveedor} from './BuscadorProveedor';


export const ListarProveedorEmpresa = () => {
  const {token}=useContext(AutenticacionContext)
  const [recargarData, setRecargarData]=useState<boolean>( false)
  const [nit , setnit] = useState<string>()
  const [nombre , setNombre] = useState<string>()
  const [celular , setcelular] = useState<string>()

  const [paginas , setPaginas] = useState<number>(1)
  const [pagina , setPagina] = useState<number>(1)
  const [limite , setLimite] = useState<number>(6)
  const [proveedores, setProveedores] = useState<proveedorEmpresaI[]>([]);


  
   
  const listarProveedoresEmpresa = async () => {
    try {
      if(token){
        const response = await proveedorEmpresas(token,limite, pagina, nit, nombre,celular);
        setProveedores(response.data);
        setPaginas(response.paginas)
  
        
      }
    } catch (error) {
      console.error("Error fetching proveedores:", error);
    }
  };

  useEffect(() => {
    listarProveedoresEmpresa();
  }, [recargarData , nit , nombre , limite, celular, pagina]);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
            <FormProveedorEmpresa recargarData={recargarData} setRecargarData={setRecargarData}/>
      <h2 className="text-xl font-semibold mb-3">Lista de Proveedores de Empresa</h2>
     <BuscadorProveedor celular={setcelular} nit={setnit} nombre={setNombre}/> 
     <ItemsPorPagina page={setLimite}/> 
      <table className="min-w-full table-auto text-left border-collapse">
        <thead className="bg-gray-200 text-gray-700 text-sm">
          <tr>
            <th className="px-3 py-1">Empresa</th>
            <th className="px-3 py-1">Nit</th>
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
           
            >
              <td className="px-3 py-1">{item.nombre}</td>
              <td className="px-3 py-1">{item.nit}</td>
              <td className="px-3 py-1">{item.correo}</td>
              <td className="px-3 py-1">{item.ciudad}</td>
              <td className="px-3 py-1">{item.direccion}</td>
              <td className="px-3 py-1">{item.celular}</td>
            </tr>
          ))}
        </tbody>
      </table>
     <Paginador paginaActual={pagina} paginaSeleccionada={setPagina} paginas={paginas}/> 
    </div>
  );
};
