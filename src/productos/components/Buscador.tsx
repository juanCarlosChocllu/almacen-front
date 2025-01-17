import { useContext, useEffect, useState } from "react";
import { categoriasI } from "../../categorias/interfaces/categoriasInterface";
import { listarCategorias } from "../../categorias/service/categoriasApi";
import { listarSubCategorias } from "../../subCategorias/services/subCategoriasApi";
import { subCategoriaI } from "../../subCategorias/interfaces/subCategoriaInterface";
import { BuscadorI } from "../interface/buscardorInterface";
import { useForm } from "react-hook-form";
import { marcaI } from "../../marca/interfaces/marcaInterface";
import { listarMarcas, marcasBuscador } from "../../marca/service/marcaApi";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";

export const Buscador = ({onsudmit}:{onsudmit(data:BuscadorI):void}) => {
  const {token}=useContext(AutenticacionContext)
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
     if(token){
      const response = await listarCategorias(token);
      setCategoria(response);
     }
    } catch (error) {
      console.log(error);
    }
  };

  const listarSubCat = async () => {
    try {
      if (categoriaSeleccionado) {
      if(token){
        const response = await listarSubCategorias(categoriaSeleccionado, token);
        setsubCategorias(response);
      }
      }
    } catch (error) {}
  };
  const listarM = async () => {
    try {
   
       if(token){
        const response = await marcasBuscador(token)
    
        
        setMarcas(response);
       }
      
    } catch (error) {
        console.log(error);
        
    }
  };

  return (
    <div className="mt-3">
    <form onSubmit={handleSubmit(onsudmit)}>
      <div className="flex space-x-4">
        
        <div className="flex-1">
          <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código de producto</label>
          <input
            {...register('codigo')}
            id="codigo"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Ingrese el código de producto"
          />
        </div>
  
        <div className="flex-1">
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            {...register('categoria')}
            id="categoria"
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
          <label htmlFor="subCategoria" className="block text-sm font-medium text-gray-700">Subcategoría</label>
          <select
            {...register('subCategoria')}
            id="subCategoria"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Selecciona una subcategoría</option>
            {sudCategorias.map((categoria, index) => (
              <option key={index} value={categoria._id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
  
        <div className="flex-1">
          <label htmlFor="marca" className="block text-sm font-medium text-gray-700">Marca</label>
          <select
            {...register('marca')}
            id="marca"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          BUSCAR
        </button>
      </div>
  
    </form>
  </div>
  
  );
};
