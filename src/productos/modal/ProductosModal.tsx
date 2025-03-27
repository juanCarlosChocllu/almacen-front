import { useContext, useEffect, useState } from "react";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { productoI } from "../interface/productoInterface";
import { BuscadorI } from "../interface/buscardorInterface";
import { listarProductos } from "../service/productosService";
import { ItemsPorPagina } from "../../core/components/ItemsPorPagina";
import { Buscador } from "../components/Buscador";
import { MostarImagenes } from "../../core/modal/MostarImagenes";
import { BiAddToQueue } from "react-icons/bi";
import { Paginador } from "../../core/components/Paginador";


export const ProductosModal = ({ productoSeleccionado }: {productoSeleccionado(data:productoI):void}) => {
 const {token}= useContext(AutenticacionContext)
  const [productos, setProductos] = useState<productoI[]>([]);
  const [isOpenProductos, setIsOpenProductos] = useState<boolean>(false);
  const [buscadorProducto, setBucadorProducto]= useState<BuscadorI>({
    categoria:null,
    codigo:null,
    marca:null,
    subCategoria:null
  })
  const [limite, setLimite]=useState<number>(20)
  const [paginas, setPaginas]=useState<number>(1)
  const [pagina, setPagina]=useState<number>(1)
  


  useEffect(() => {
    const listarPro = async () => {
      try {
    if(token){      
      const response = await listarProductos(limite,pagina,buscadorProducto.codigo, buscadorProducto.categoria, buscadorProducto.subCategoria,buscadorProducto.marca,token);
      setProductos(response.data);
      setPaginas(response.paginas)
    }
      } catch (error) {
        console.log(error);
      }
    };
    listarPro();
  }, [buscadorProducto , limite, pagina]);
  const onSubmit = (data:BuscadorI)=>{
    setBucadorProducto(data);
    
  }


  

  const paginaSeleccionada =(pagina:number)=>{
      setPagina(pagina)
  }
  const openModalProductos = () => setIsOpenProductos(true);
  const closeModalProductos = () => setIsOpenProductos(false);
  return (
    <>
      
  <div className="flex justify-center">
    <button
      onClick={openModalProductos}
      className="bg-green-600 text-white py-2 px-6 rounded-md text-sm shadow-lg hover:bg-green-700 transition duration-300 ease-in-out"
    >
      Productos
    </button>
  </div>

      {isOpenProductos && (
     
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-7xl w-full">
            <button onClick={closeModalProductos} className="top-2 right-2 text-gray-600">
              ✖
            </button>
            <h2 className="text-2xl font-semibold mb-4">Lista de Productos</h2>
            <div className="overflow-y-auto max-h-96"> 
            <Buscador onsudmit={onSubmit}/>
            <ItemsPorPagina page={setLimite} />
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left text-xs">
                    <th className="px-4 py-2 border border-gray-300 text-sm">Cod</th>
                    <th className="px-4 py-2 border border-gray-300 text-sm">Cod. barra</th>
                    <th className="px-4 py-2 border border-gray-300 text-sm">Producto</th>
                    <th className="px-4 py-2 border border-gray-300 text-sm">Color</th>
                    <th className="px-4 py-2 border border-gray-300 text-sm">Categoria</th>
                    <th className="px-4 py-2 border border-gray-300 text-sm">Descripción</th>
                    <th className="px-4 py-2 border border-gray-300 text-sm">imagen</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {productos.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-100 text-xs"

                    >
                      <td className="px-4 py-2 border border-gray-300 text-sm">{item.codigo}</td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">{item.codigoBarra}</td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">{item.nombre}</td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">{item.color}</td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">{item.categoria}</td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">{item.descripcion}</td>
                      <td className="px-4 py-2 border border-gray-300 text-sm"><button type="button">
                        <MostarImagenes url={item.imagen}/>

                      
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={() => {
                              const producto = {
                                _id: item._id,
                                nombre: item.nombre,
                                categoria: item.categoria,
                                codigoBarra: item.codigoBarra,
                                descripcion: item.descripcion,
                                codigo: item.codigo,
                                genero: item.genero,
                                imagen: item.imagen,
                                marca: item.marca,
                                subCategoria: item.subCategoria,
                                talla: item.talla,
                                color: item.color,
                              };
                             
                              productoSeleccionado(producto);
                              closeModalProductos();
                            }}
                        
                        
                        >
                        <BiAddToQueue />
                      </button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Paginador paginaSeleccionada={paginaSeleccionada}paginaActual={pagina}paginas={paginas}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
