import { useState } from "react";
import { useForm } from "react-hook-form";
import { listarCategorias } from "../../../categorias/service/categoriasApi";
import { categoriasI } from "../../../categorias/interfaces/categoriasInterface";
import { httpRespuetaI } from "../../../interfaces/httpRespuestaInterface";
import { crearProducto } from "../../service/productosApi";
import { listarSubCategorias } from "../../../subCategorias/services/subCategoriasApi";
import { subCategoriaI } from "../../../subCategorias/interfaces/subCategoriaInterface";
import { formProductoI } from "../../interface/formProductoInterface";
import { listarMarcas } from "../../../marca/service/marcaApi";
import { marcaI } from "../../../marca/interfaces/marcaInterface";

export const FormularioProducto = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<categoriasI[]>([]);
  const [subcategorias, setSubCategorias] = useState<subCategoriaI[]>([]);
  const [marcas, setMarcas] = useState<marcaI[]>([]);
  const [mensaje, setMensaje] = useState<string>("");
  const { register, handleSubmit, watch } = useForm<formProductoI>();
  const categoriaSeleccionada = watch("categoria");
  const onSubmit = async (data: formProductoI) => {
    console.log(data.imagen);

    try {
      const formDta: FormData = new FormData();
      formDta.append("categoria", data.categoria);
      data.subCategoria
        ? formDta.append("subCategoria", data.subCategoria)
        : delete data.subCategoria;
      formDta.append("marca", data.marca);
      formDta.append("nombre", data.nombre);
      formDta.append("codigoBarra", data.codigoBarra);
      data.color ? formDta.append("color", data.color) : delete data.color;
      data.talla ? formDta.append("talla", data.talla) : delete data.talla;
      formDta.append(
        "cantidadInicialVenta",
        data.cantidadInicialVenta.toString()
      );
      formDta.append(
        "cantidadInicialRegalo",
        data.cantidadInicialRegalo.toString()
      );
      formDta.append("file", data.imagen[0]);
      formDta.append("descripcion", data.descripcion);
      console.log(formDta);

      const response: httpRespuetaI = await crearProducto(formDta);
      if (response.status == 201) {
        setMensaje("Producto registrado");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const abrirModal = async (estado: boolean) => {
    try {
      const [categorias, marcas] = await Promise.all([
        listarCategorias(),
        listarMarcas(),
      ]);
      setCategorias(categorias);
      setMarcas(marcas);
      setIsModalOpen(estado);
    } catch (error) {
      console.log(error);
    }
  };

  const subCategorias = async (categoria: string) => {
    try {
      const response = await listarSubCategorias(categoria);
      setSubCategorias(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        onClick={() => abrirModal(true)}
        className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Abrir Formulario
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full md:max-w-4xl max-w-full max-h-screen overflow-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Formulario Producto
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label
                  htmlFor="categoria"
                  className="block text-sm font-medium text-gray-700"
                >
                  Categoría
                </label>
                <select
                  id="categoria"
                  className="h-10 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2 px-3 focus:outline-none focus:ring-indigo-500"
                  {...register("categoria")}
                  onClick={() => {
                    if (categoriaSeleccionada) {
                      subCategorias(categoriaSeleccionada);
                    }
                  }}
                >
                  <option value="">Seleccione la categoría</option>
                  {categorias.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="subCategoria"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sub Categoría
                </label>
                <select
                  id="subCategoria"
                  className="h-10 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2 px-3 focus:outline-none focus:ring-indigo-500"
                  {...register("subCategoria")}
                >
                  <option value="">Seleccione la subcategoría</option>
                  {subcategorias.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="marca"
                  className="block text-sm font-medium text-gray-700"
                >
                  Marcas
                </label>
                <select
                  id="marca"
                  className="h-10 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2 px-3 focus:outline-none focus:ring-indigo-500"
                  {...register("marca")}
                >
                  <option value="">Seleccione la marca</option>
                  {marcas.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  id="nombre"
                  {...register("nombre")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="codigo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código de Barra
                </label>
                <input
                  type="text"
                  id="codigo"
                  {...register("codigoBarra")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700"
                >
                  Color
                </label>
                <input
                  type="text"
                  id="color"
                  {...register("color")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="talla"
                  className="block text-sm font-medium text-gray-700"
                >
                  Talla
                </label>
                <select
                  id="talla"
                  {...register("talla")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Seleccione una talla</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="descripcion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  {...register("descripcion")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="cantidad"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad Inicial Venta
                </label>
                <input
                  type="number"
                  defaultValue={0}
                  id="cantidad"
                  {...register("cantidadInicialVenta")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="cantidadRegalo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad Inicial Regalo
                </label>
                <input
                  type="number"
                  defaultValue={0}
                  id="cantidadRegalo"
                  {...register("cantidadInicialRegalo")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="imagen"
                  className="block text-sm font-medium text-gray-700"
                >
                  Imagen
                </label>
                <input
                  type="file"
                  id="imagen"
                  {...register("imagen", {required:true}) }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {mensaje && <samp>{mensaje}</samp>}

              <div className="col-span-2 flex space-x-4">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
