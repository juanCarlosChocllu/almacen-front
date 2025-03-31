import  { useContext, useEffect, useState } from 'react'
import { marcaI } from '../interfaces/marcaInterface';
import { eliminarMarca, listarMarcas } from '../service/marcaApi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AutenticacionContext } from '../../autenticacion/context/crear.autenticacion.context';
import { ItemsPorPagina } from '../../core/components/ItemsPorPagina';
import { Paginador } from '../../core/components/Paginador';
import { CrearMarca } from '../modal/CrearMarca';
import { EditarMarca } from '../modal/EditarMarca';
import { HttpStatus } from '../../core/enums/httStatusEnum';
import { alertaDeEliminacion } from '../../core/utils/alertaEliminacion';
import { permisosModulo } from '../../core/hooks/permisos';
import { ModulosE } from '../../core/enums/modulos.enum';
import { PermisoE } from '../../core/enums/PermisosEnum';
import { PermisosContext } from '../../autenticacion/context/permisos.context';

export const ListarMarcas = () => {
      const {token}=useContext(AutenticacionContext)
      const [marcas, setMarcas] = useState<marcaI[]>([]);   
      const [limite, setLimite]=useState<number>(20)
      const [pagina, setPagina]=useState<number>(1)
      const [paginas, setPaginas]=useState<number>(1)
      const [idMarca, setIdMarca]= useState<string>()
      const [marca, setMarca]= useState<string>()
      const [isOpenModal, setIsOpenModal]= useState<boolean>()
      const [recargarData, setRecargarData] = useState<boolean>(false)
      const  {permisos} =useContext(PermisosContext)
      const closeModal=()=>setIsOpenModal(false)
      useEffect(() => {
        listarM();
      }, [limite, pagina,recargarData]);
      const listarM = async () => {
        try {
          if(token){
            const response = await listarMarcas(token);
            setMarcas(response.data);
            setPaginas(response.paginas)
          }
        } catch (error) {
          console.log(error);
        }
      };

      const eliminar =async(id:string)=> {
        try {
          if(token){
            const response = await eliminarMarca(id, token)
            if(response.status== HttpStatus.OK){
              setRecargarData(!recargarData)
            }
          }
        } catch (error) {
          
        }
      }
  return (
     <div className="overflow-x-auto shadow-lg rounded-lg ">
   { permisosModulo(permisos,ModulosE.MARCAS, PermisoE.CREAR) &&     <CrearMarca recargar={recargarData} setRecargar={setRecargarData}/> }  
      <ItemsPorPagina page={setLimite}/> 
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Nombre</th>
                <th className="px-6 py-3 text-left">Accion</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {marcas.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4"> {item.nombre}</td>
    
                  <td className="px-4 py-2 flex gap-2">
                  { permisosModulo(permisos,ModulosE.MARCAS, PermisoE.ELIMINAR) &&    <button onClick={()=>alertaDeEliminacion(()=> eliminar(item._id))} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none flex items-center">
                      <FaTrash className="mr-2" />
                    </button> }
                    { permisosModulo(permisos,ModulosE.MARCAS, PermisoE.EDITAR) &&     <button onClick={()=> {
                      setIdMarca(item._id)
                      setIsOpenModal(true)
                      setMarca(item.nombre)
                    }} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none flex items-center">
                      <FaEdit  className="mr-2" />
                    </button> }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginador paginaActual={pagina}  paginaSeleccionada={setPagina} paginas={paginas}/>
          { isOpenModal && idMarca && marca && <EditarMarca recargar={recargarData} setRecargar={setRecargarData} marca={marca} idMarca={idMarca} closeModal={closeModal} isOpen={isOpenModal}    /> }
        </div>
  )
}
