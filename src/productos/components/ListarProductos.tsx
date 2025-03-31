import { useContext, useEffect, useState } from "react";
import { eliminarProducto, listarProductos } from "../service/productosService";
import { productoI } from "../interface/productoInterface";
import { Buscador } from "./Buscador";
import { BuscadorI } from "../interface/buscardorInterface";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { GenerarExcel } from "../../core/components/GenerarExcel";
import { ItemsPorPagina } from "../../core/components/ItemsPorPagina";
import { MostarImagenes } from "../../core/modal/MostarImagenes";
import { Paginador } from "../../core/components/Paginador";
import { CrearProducto } from "../modal/CrearProducto";
import { EditarProducto } from "../modal/EditarProducto";
import { HttpStatus } from "../../core/enums/httStatusEnum";
import { alertaDeEliminacion } from "../../core/utils/alertaEliminacion";
import { accionModal } from "../../core/hooks/accionModal";
import { permisosModulo } from "../../core/hooks/permisos";
import { ModulosE } from "../../core/enums/modulos.enum";
import { PermisoE } from "../../core/enums/PermisosEnum";
import { PermisosContext } from "../../autenticacion/context/permisos.context";

export const ListarProductos = () => {
  const [recargarData, setRecargarData]= useState<boolean>(false)
  const [productos, setProductos] = useState<productoI[]>([]);
  const [paginas, setPaginas] = useState<number>(0);
  const [limite, setLimite] = useState<number>(20);
  const [paginaSeleccionada, setPaginaSeleccioanda] = useState<number>(1);
  const [codigo, setCodigo] = useState<string | null>(null);
  const [categoria, setCategoria] = useState<string | null>(null);
  const [marca, setMarca] = useState<string | null>(null);
  const [subCategoria, setSubCategoria] = useState<string | null>(null);
  const [idProducto, setIdProdcuto]= useState<string>()
  const {token}= useContext(AutenticacionContext)
  const { closeModal,setIsOpen, isOpen}= accionModal()
  const  {permisos} =useContext(PermisosContext)
  useEffect(() => {
    const listarPro = async () => {
      try {
        if(token){
          const response = await listarProductos(
            limite,
            paginaSeleccionada,
            codigo,
            categoria,
            subCategoria,
            marca,
            token
          );
          setProductos(response.data);
          setPaginas(response.paginas);
        }
      } catch (error) {
        console.log(error);
      }
    };

    listarPro();
  }, [subCategoria, codigo, categoria, marca, paginaSeleccionada, limite, recargarData]);

 

  const pagina = (pagina: number) => {
    setPaginaSeleccioanda(pagina);
  };
  const handleBuscador = (data: BuscadorI) => {
    setCategoria(data.categoria);
    setSubCategoria(data.subCategoria);
    setCodigo(data.codigo);
    setMarca(data.marca);
  };

  const editarProducto = (id:string) => {    
    setIdProdcuto(id)
    setIsOpen(true)
  };

  const eliminar = async(id:string)=> {
    try {
      if(token && id) {
        const response = await eliminarProducto(id, token)
        if(response.status == HttpStatus.OK) {
          setRecargarData(!recargarData)
        }
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="p-6">
    { permisosModulo(permisos,ModulosE.PRODUCTOS, PermisoE.CREAR) &&   <CrearProducto recargar={recargarData} setRecargar={setRecargarData} /> }
      {<Buscador onsudmit={handleBuscador} />}
      <GenerarExcel<productoI> data={productos} nombre={'Productos'}/>
      <ItemsPorPagina page={setLimite} />
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2  text-sm">Codigo</th>
            <th className="px-4 py-2   text-sm">
              Cod. barra
            </th>
            <th className="px-4 py-2  text-sm">
              Producto
            </th>
            <th className="px-4 py-2   text-sm">Color</th>
            <th className="px-4 py-2   text-sm">Marca</th>
            <th className="px-4 py-2  text-sm">
              Categoria
            </th>
            <th className="px-4 py-2  text-sm">
              Descripción
            </th>
            <th className="px-4 py-2  text-sm">
              imagen
            </th>
            <th className="px-4 py-2  text-sm">Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((item) => (
            <tr className="hover:bg-gray-100" key={item._id}>
              <td className="px-4 py-2   text-sm">
                {item.codigo}
              </td>
              <td className="px-4 py-2  text-sm">
                {item.codigoBarra}
              </td>
              <td className="px-4 py-2   text-sm">
                {item.nombre}
              </td>
              <td className="px-4 py-2   text-sm">
                {item.color}
              </td>
              <td className="px-4 py-2   text-sm">
                {item.marca}
              </td>
              <td className="px-4 py-2   text-sm">
                {item.categoria}
              </td>
              <td className="px-4 py-2   text-sm">
                {item.descripcion}
              </td>
              <td className="px-4 py-2   text-sm">
            <MostarImagenes url={item.imagen}/>
              </td>
              <td className="px-4 py-2   text-sm">
              { permisosModulo(permisos,ModulosE.PRODUCTOS, PermisoE.ELIMINAR) &&   <button className="text-red-500 text-2xl" onClick={()=> alertaDeEliminacion(()=>eliminar(item._id))} ><MdDelete  /></button>}
              { permisosModulo(permisos,ModulosE.PRODUCTOS, PermisoE.EDITAR) &&   <button  className="text-blue-500 text-2xl"  onClick={()=>editarProducto(item._id)}><FaEdit /></button> }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginador
        paginas={paginas}
        paginaSeleccionada={pagina}
        paginaActual={paginaSeleccionada}
      />
      {isOpen && idProducto && <EditarProducto setRecargar={setRecargarData} recargar={recargarData} idProducto={idProducto} closeModal={closeModal} isOpen={isOpen}/>}
    </div>
  );
};
