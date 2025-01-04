import { useEffect, useState } from "react";
import { categoriasI } from "../../categorias/interfaces/categoriasInterface";
import { listarCategorias } from "../../categorias/service/categoriasApi";
import { listarSubCategorias } from "../../subCategorias/services/subCategoriasApi";
import { subCategoriaI } from "../../subCategorias/interfaces/subCategoriaInterface";
import { BuscadorI } from "../interface/buscardorInterface";
import { useForm } from "react-hook-form";
import { marcaI } from "../../marca/interfaces/marcaInterface";
import { listarMarcas } from "../../marca/service/marcaApi";

export const Buscador = ({onsudmit}:{onsudmit(data:BuscadorI):void}) => {
  const [categoriaSeleccionado, setCategoriaSeleccionado] = useState<string>();
  const [categorias, setCategoria] = useState<categoriasI[]>([]);
  const [sudCategorias, setsubCategorias] = useState<subCategoriaI[]>([]);
  const [marcas, setMarcas] = useState<marcaI[]>([]);

  const {register, handleSubmit}=useForm<BuscadorI>()
  useEffect(() => {
    listarCategoria();
    listarM()
    if (categoriaSeleccionado) {
      listarSubCat();
    }
    setsubCategorias([])
  }, [categoriaSeleccionado]);

  const listarCategoria = async () => {
    try {
      const response = await listarCategorias();
      setCategoria(response);
    } catch (error) {
      console.log(error);
    }
  };

  const listarSubCat = async () => {
    try {
      if (categoriaSeleccionado) {
        const response = await listarSubCategorias(categoriaSeleccionado);
        setsubCategorias(response);
      }
    } catch (error) {}
  };
  const listarM = async () => {
    try {
   
        const response = await listarMarcas()
    
        
        setMarcas(response);
      
    } catch (error) {
        console.log(error);
        
    }
  };

  return (
    <div className="mt-3">
     <form onSubmit={handleSubmit(onsudmit)}>
     <div className="flex space-x-4">
        <div className="flex-1">
          <input
            {...register('codigo')}
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Ingrese el código de producto"
          />
        </div>

        <div className="flex-1">
          <select
           {...register('categoria')}
            onChange={(e) => {
              const target = e.target as HTMLSelectElement;
              setCategoriaSeleccionado(target.value);
            }}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria._id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <select     {...register('subCategoria')} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
            <option value="">Selecciona una subcategoría</option>
            {sudCategorias.map((categoria, index) => (
              <option key={index} value={categoria._id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <select     {...register('marca')} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
            <option value="">Selecciona una marca</option>
            {marcas.map((categoria, index) => (
              <option key={index} value={categoria._id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-2 flex justify-center">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          BUSCAR
        </button>
      </div>

     </form>
    </div>
  );
};
