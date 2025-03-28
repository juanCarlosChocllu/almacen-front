import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { categoriasI } from "../../categorias/interfaces/categoriasInterface";
import { subCategoriaI } from "../../subCategorias/interfaces/subCategoriaInterface";
import { marcaI } from "../../marca/interfaces/marcaInterface";
import { formProductoI } from "../interface/formProductoInterface";
import { errorPropiedadesI } from "../../core/interfaces/errorPropiedades";
import { errorImagenI } from "../../core/interfaces/errorImgenInterface";
import { errorConflictoI } from "../../core/interfaces/errorConflictoInterface";
import { httAxiosError } from "../../core/utils/error.util";
import { httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface";
import { listarCategorias } from "../../categorias/service/categoriasService";
import { marcasPublicas } from "../../marca/service/marcaApi";
import {
  editarProducto,
  productoFindOne,
} from "../service/productosService";
import { HttpStatus } from "../../core/enums/httStatusEnum";
import { errorClassValidator } from "../../core/utils/errorClassValidator";
import { listarSubCategorias } from "../../subCategorias/services/subCategoriasApi";
import { MostrarImagene } from "../../core/components/MostrarImagenes";
import { PropsEditarProducto } from "../interface/propsEditarProducto";

export const EditarProducto = ({
  idProducto,
  closeModal,
  isOpen,
  recargar,
  setRecargar
}:PropsEditarProducto ) => {
  const { token } = useContext(AutenticacionContext);

  const [categorias, setCategorias] = useState<categoriasI[]>([]);
  const [subcategorias, setSubCategorias] = useState<subCategoriaI[]>([]);
  const [marcas, setMarcas] = useState<marcaI[]>([]);
  const [mensaje, setMensaje] = useState<string>("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,

    formState: { errors },
  } = useForm<formProductoI>();
  const [mensajeError, setMensajeError] = useState<errorPropiedadesI[]>([]);
  const [mensajeErrorImagen, setMensajeErrorImagen] = useState<errorImagenI>();

  const [imagenPreview, setImagenPreview] = useState<string>();
  const [urlImagen, setUrlImagen] = useState<string>();

  const [mensajeErrorConflito, setMensajeErrorConflicto] =
    useState<errorConflictoI | null>();
  const categoriaSeleccionada = watch("categoria");
  useEffect(() => {
    if (categoriaSeleccionada) {
      setMensaje("");
    }
  }, [categoriaSeleccionada]);
  useEffect(() => {
    abrirModal();
    producto();
  }, [isOpen]);

  const producto = async () => {
    try {
      if (token) {
        const response = await productoFindOne(idProducto, token);
        console.log(response.talla);

        if (response) {
          setValue("nombre", response.nombre);
          setValue("codigoBarra", response.codigoBarra);
          setValue("categoria", response.categoria);
          if (response.subCategoria) {
            setValue("subCategoria", response.subCategoria);
          }
          setValue("marca", response.marca);
          setValue("color", response.color);
          setValue("genero", response.genero);
          setValue("descripcion", response.descripcion);
          setValue("talla", response.talla);

          setUrlImagen(String(response.imagen));
        }
      }
    } catch (error) {}
  };

  const onSubmit = async (data: formProductoI) => {
    try {
      const formDta: FormData = new FormData();
      formDta.append("categoria", data.categoria);
      data.subCategoria
        ? formDta.append("subCategoria", data.subCategoria)
        : delete data.subCategoria;
      formDta.append("marca", data.marca);
      formDta.append("nombre", data.nombre);
      data.codigoBarra
        ? formDta.append("codigoBarra", data.codigoBarra)
        : delete data.codigoBarra;
      data.color ? formDta.append("color", data.color) : delete data.color;
      data.talla ? formDta.append("talla", data.talla) : delete data.talla;
      data.genero ? formDta.append("genero", data.genero) : delete data.genero;
      data.imagen
        ? formDta.append("file", data.imagen[0])
        : delete data.imagen[0];
      formDta.append("descripcion", data.descripcion);

      if (token) {
        const response: httpRespuetaI = await editarProducto(
          formDta,
          token,
          idProducto
        );
        if (response.status == HttpStatus.OK) {
          setRecargar(!recargar)
          setMensajeError([]);
          setMensajeErrorConflicto(null);
          setMensaje("Producto registrado");
          setImagenPreview("");
          closeModal()
        
        }
      }
    } catch (error) {
      const e = httAxiosError(error);
      if (e.response.data.statusCode === HttpStatus.BAD_REQUEST) {
        setMensajeError(errorClassValidator(e.response.data.errors));
      } else if (
        e.response.data.statusCode == HttpStatus.UNPROCESSABLE_ENTITY
      ) {
        setMensajeErrorImagen(e.response.data);
      } else if (e.response.data.statusCode == HttpStatus.CONFLICT) {
        setMensajeErrorConflicto(e.response.data);
        setMensajeError([]);
      }
    }
  };

  const abrirModal = async () => {
    try {
      if (token) {
        const [categorias, marcas] = await Promise.all([
          listarCategorias(token),
          marcasPublicas(token),
        ]);
        setCategorias(categorias);
        setMarcas(marcas);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const subCategorias = async (categoria: string) => {
    try {
      if (token) {
        const response = await listarSubCategorias(categoria, token);
        setSubCategorias(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const manejarSeleccionImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (archivo) {
      const urlImagen = URL.createObjectURL(archivo);
      setImagenPreview(urlImagen);
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-md shadow-lg w-full md:max-w-lg max-w-full max-h-screen overflow-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Formulario Producto
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label
                  htmlFor="categoria"
                  className="block text-xs font-medium text-gray-700"
                >
                  Categoría
                </label>
                <select
                  id="categoria"
                  className="h-8 border border-gray-300 text-gray-600 text-sm rounded-md block w-full py-1.5 px-2 focus:outline-none focus:ring-indigo-500"
                  {...register("categoria", {
                    validate: (value) => {
                      if (!value) {
                        return "Seleccione una categoría";
                      }
                      return true;
                    },
                  })}
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
                {mensajeError.length > 0 &&
                  mensajeError.map((item) => {
                    if (item.propiedad === "categoria") {
                      return item.errors.map((e) => (
                        <p
                          key={item.propiedad}
                          className="text-red-500 text-xs"
                        >
                          {e}
                        </p>
                      ));
                    } else return null;
                  })}
                {errors.categoria && (
                  <p className="text-red-500 text-xs">
                    {errors.categoria.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subCategoria"
                  className="block text-xs font-medium text-gray-700"
                >
                  Sub Categoría
                </label>
                <select
                  id="subCategoria"
                  className="h-8 border border-gray-300 text-gray-600 text-sm rounded-md block w-full py-1.5 px-2 focus:outline-none focus:ring-indigo-500"
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
                  className="block text-xs font-medium text-gray-700"
                >
                  Marcas
                </label>
                <select
                  id="marca"
                  className="h-8 border border-gray-300 text-gray-600 text-sm rounded-md block w-full py-1.5 px-2 focus:outline-none focus:ring-indigo-500"
                  {...register("marca", {
                    validate: (value) => {
                      if (!value) {
                        return "Seleccione una marca";
                      }
                      return true;
                    },
                  })}
                >
                  <option value="">Seleccione la marca</option>
                  {marcas.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
                {mensajeError.length > 0 &&
                  mensajeError.map((item) => {
                    if (item.propiedad === "marca") {
                      return item.errors.map((e) => (
                        <p
                          key={item.propiedad}
                          className="text-red-500 text-xs"
                        >
                          {e}
                        </p>
                      ));
                    } else return null;
                  })}
                {errors.marca && (
                  <p className="text-red-500 text-xs">{errors.marca.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="nombre"
                  className="block text-xs font-medium text-gray-700"
                >
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  id="nombre"
                  {...register("nombre", {
                    validate: (value) => {
                      if (!value) {
                        return "Ingrese nombre del prodcuto";
                      }
                      return true;
                    },
                  })}
                  className="mt-1 block w-full h-8 p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
                {mensajeError.length > 0 &&
                  mensajeError.map((item) => {
                    if (item.propiedad === "nombre") {
                      return item.errors.map((e) => (
                        <p
                          key={item.propiedad}
                          className="text-red-500 text-xs"
                        >
                          {e}
                        </p>
                      ));
                    } else return null;
                  })}
                {errors.nombre && (
                  <p className="text-red-500 text-xs">
                    {errors.nombre.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="codigo"
                  className="block text-xs font-medium text-gray-700"
                >
                  Código de Barra
                </label>
                <input
                  type="text"
                  id="codigo"
                  {...register("codigoBarra")}
                  className="mt-1 block w-full h-8 p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
                {mensajeError.length > 0 &&
                  mensajeError.map((item) => {
                    if (item.propiedad === "codigoBarra") {
                      return item.errors.map((e) => (
                        <p
                          key={item.propiedad}
                          className="text-red-500 text-xs"
                        >
                          {e}
                        </p>
                      ));
                    } else return null;
                  })}
                {mensajeErrorConflito && (
                  <span className="text-red-500 text-xs">
                    {mensajeErrorConflito.message}
                  </span>
                )}
                {errors.codigoBarra && (
                  <p className="text-red-500 text-xs">
                    {errors.codigoBarra.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="color"
                  className="block text-xs font-medium text-gray-700"
                >
                  Color
                </label>
                <input
                  type="text"
                  id="color"
                  {...register("color")}
                  className="mt-1 block w-full h-8 p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
                {mensajeError.length > 0 &&
                  mensajeError.map((item) => {
                    if (item.propiedad === "color") {
                      return item.errors.map((e) => (
                        <p
                          key={item.propiedad}
                          className="text-red-500 text-xs"
                        >
                          {e}
                        </p>
                      ));
                    } else return null;
                  })}
              </div>

              <div>
                <label
                  htmlFor="talla"
                  className="block text-xs font-medium text-gray-700"
                >
                  Talla
                </label>
                <select
                  id="talla"
                  {...register("talla")}
                  className="mt-1 block w-full h-8 p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  <option value="">Seleccione una talla</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
                {mensajeError.length > 0 &&
                  mensajeError.map((item) => {
                    if (item.propiedad === "talla") {
                      return item.errors.map((e) => (
                        <p
                          key={item.propiedad}
                          className="text-red-500 text-xs"
                        >
                          {e}
                        </p>
                      ));
                    } else return null;
                  })}
              </div>

              <div>
                <label
                  htmlFor="genero"
                  className="block text-xs font-medium text-gray-700"
                >
                  Género
                </label>
                <select
                  id="genero"
                  {...register("genero")}
                  className="mt-1 block w-full h-8 p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  <option value="">Seleccione un género</option>
                  <option value="MASCULINO">MASCULINO</option>
                  <option value="FEMENINO">FEMENINO</option>
                </select>
                {mensajeError.length > 0 &&
                  mensajeError.map((item) => {
                    if (item.propiedad === "genero") {
                      return item.errors.map((e) => (
                        <p
                          key={item.propiedad}
                          className="text-red-500 text-xs"
                        >
                          {e}
                        </p>
                      ));
                    } else return null;
                  })}
              </div>

              <div>
                <label
                  htmlFor="descripcion"
                  className="block text-xs font-medium text-gray-700"
                >
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  {...register("descripcion")}
                  className="mt-1 block w-full h-16 p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                ></textarea>
                {mensajeError.length > 0 &&
                  mensajeError.map((item) => {
                    if (item.propiedad === "descripcion") {
                      return item.errors.map((e) => (
                        <p
                          key={item.propiedad}
                          className="text-red-500 text-xs"
                        >
                          {e}
                        </p>
                      ));
                    } else return null;
                  })}
              </div>

              <div>
                <label
                  htmlFor="imagen"
                  className="block text-xs font-medium text-gray-700"
                >
                  Imagen
                </label>
                <input
                  type="file"
                  id="imagen"
                  {...register("imagen")}
                  className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  onChange={manejarSeleccionImagen}
                />
                {mensajeErrorImagen && (
                  <span className="text-red-500 text-xs">
                    {mensajeErrorImagen.message}
                  </span>
                )}
                {errors.imagen && (
                  <p className="text-red-500 text-xs">
                    {errors.imagen.message}
                  </p>
                )}
              </div>

              {imagenPreview && (
                <div className="mt-4">
                  <img
                    src={imagenPreview}
                    alt="Vista previa"
                    className="max-w-xs max-h-48 object-cover"
                  />
                </div>
              )}
              {!imagenPreview && urlImagen && (
                <MostrarImagene url={urlImagen} />
              )}

              {mensaje && <samp className="text-xs">{mensaje}</samp>}

              <div className="col-span-2 flex space-x-2">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 text-xs"
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
