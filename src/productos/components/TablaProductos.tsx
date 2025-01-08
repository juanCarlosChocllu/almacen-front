import { useContext, useEffect, useState } from "react";
import { listarProductos } from "../service/productosApi";
import { productoI } from "../interface/productoInterface";
import { Buscador } from "./Buscador";
import { BuscadorI } from "../interface/buscardorInterface";
import { Paginador } from "../../utils/components/Paginador";
import { Paginas } from "../../utils/components/Paginas";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { GenerarExcel } from "../../utils/components/GenerarExcel";
import {MostarImagenes} from '../../utils/components/modal/MostarImagenes'
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";

export const TablaProductos = () => {
  const [productos, setProductos] = useState<productoI[]>([]);
  const [paginas, setPaginas] = useState<number>(0);
  const [limite, setLimite] = useState<number>(10);
  const [paginaSeleccionada, setPaginaSeleccioanda] = useState<number>(1);
  const [codigo, setCodigo] = useState<string | null>(null);
  const [categoria, setCategoria] = useState<string | null>(null);
  const [marca, setMarca] = useState<string | null>(null);
  const [subCategoria, setSubCategoria] = useState<string | null>(null);
  const {token}= useContext(AutenticacionContext)
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
  }, [subCategoria, codigo, categoria, marca, paginaSeleccionada, limite]);

  const cantidadIntems = (cantidad: string) => {
    setLimite(Number(cantidad));
  };

  const pagina = (pagina: number) => {
    setPaginaSeleccioanda(pagina);
  };
  const handleBuscador = (data: BuscadorI) => {
    setCategoria(data.categoria);
    setSubCategoria(data.subCategoria);
    setCodigo(data.codigo);
    setMarca(data.marca);
  };

  return (
    <div className="p-6">
      {<Buscador onsudmit={handleBuscador} />}
      <GenerarExcel<productoI> data={productos} nombre={'Productos'}/>
      <Paginas page={cantidadIntems} />
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
                <button><MdDelete /></button>
                <button><FaEdit /></button>
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
    </div>
  );
};
