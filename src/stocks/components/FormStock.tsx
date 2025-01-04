import { useContext, useEffect, useState } from "react";
import { ProductosModal } from "../../productos/components/modal/ProductosModal";
import { productoI } from "../../productos/interface/productoInterface";
import { useForm } from "react-hook-form";
import { formStockI } from "../interfaces/formStockInterface";
import { dataProductoI, dataProductoStock } from "../interfaces/dataProducto";
import { ProductoSeleccioando } from "./ProductoSeleccioando";
import { gudarStockI } from "../interfaces/stockInterface";
import { guardarStock, vericarStockProducto } from "../service/stockApi";
import { almacenAreaI } from "../../almacenArea/interfaces/almacenAreaInterface";
import { listarAlmacenPorArea } from "../../almacenArea/services/almacenAreaApi";
import { SelectProducto } from "./SelectProducto";

import { proveedorPersonaI } from "../../proveedorPersona/interfaces/proveedorPersonaInterface";
import { SelectProveedorPersona } from "./SelectProveedorPersona";
import { proveedorEmpresaI } from "../../proveedorEmpresa/interface/proveedorEmpresaInterface";
import { SelectProveedorEmpresa } from "./selectProveedorEmpresa";
import { MostrarProveedores } from "./MostrarProveedores";
import { tipoE } from "../enums/tipos.enum";
import { v4 as uuidv4 } from "uuid";

import { httAxiosError } from "../../utils/error/error.util";
import { errorPropiedadesI } from "../../interfaces/errorPropiedades";
import { errorPersonalizadoI } from "../../interfaces/errorPersonalizado";
import { errorClassValidator } from "../../utils/error/errorClassValidator";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";

export const FormStock = () => {
  const {token}= useContext(AutenticacionContext)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formStockI>();

  const [isOpenProveedores, setIsOpenProveedores] = useState<boolean>(false);
  const [dataSeleccionada, setDataSeleccionada] = useState<dataProductoI[]>([]);
  const [almacenArea, setAlmacenArea] = useState<almacenAreaI[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [almacenAreaStock,setAlmacenAreaStock]= useState<string>()
  const [mensajeError, setMensajeError] = useState<errorPersonalizadoI[]>([]);
  const [mensajeErrorClassValidator, setMensajeErrorClassValidator] = useState<
    errorPropiedadesI[]
  >([]);

  const [productosSeleccioando, setProductoSeleccionado] =
    useState<productoI | null>();
  const [proveedorPersonaSeleccionado, setProveedorPersonaSeleccionado] =
    useState<proveedorPersonaI | null>();

  const [proveedorEmpresaSeleccionado, setProveedorEmpresaSeleccionado] =
    useState<proveedorEmpresaI | null>();



  const openModalProveedores = () => setIsOpenProveedores(true);
  const closeModalProveedores = () => setIsOpenProveedores(false);

  const cantidawatch = watch("cantidad");
  const precioWatch = watch("precio");

  useEffect(() => {
    const listarAlmacenAreas = async () => {
      try {
       if(token){
        const response = await listarAlmacenPorArea(token);
        setAlmacenArea(response);
       }
      } catch (error) {}
    };
    listarAlmacenAreas();
  }, []);

  const productoSeleccionados = async(producto: productoI) => {
    try {
     if(producto){
      setProductoSeleccionado(producto);
      const stock=  await  vericarStockProducto(producto._id)
      setAlmacenAreaStock(stock.almacenArea)
   
     }
    } catch (error) {
      console.log(error);
      
    }

  };
  const onSubmit = (data: formStockI) => {
    if(!proveedorPersonaSeleccionado && !proveedorEmpresaSeleccionado){
      return setMensaje('Seleccione un proveedor')
    }
    
    if(!productosSeleccioando){
      return setMensaje('Seleccione un producto')
    }
    const dataRegistrada: dataProductoI = {
      uuid: uuidv4(),
      id: productosSeleccioando?._id,
      nombre: productosSeleccioando?.nombre,
      cantidad: data.cantidad,
      precio: data.precio,
      total: Number((data.cantidad * data.precio).toFixed(2)),
      fechaCompra: data.fechaCompra,
      fechaVencimiento: data.fechaVencimiento,
      almacenArea: data.almacenArea,
      factura: data.factura,
      codigo: productosSeleccioando?.codigo,
      tipo: data.tipo,
    };

    const registrados: boolean = dataSeleccionada.some(
      (item) =>
        item.id === dataRegistrada.id && item.tipo == dataRegistrada.tipo
    );

    if (!registrados) {
      setDataSeleccionada([...dataSeleccionada, dataRegistrada]);
    }

    
  };
  const nuevosdatos = (data: dataProductoI[]) => {
    setDataSeleccionada(data);
  };

  const eliminarProveedorPersona = () => {
    setProveedorPersonaSeleccionado(null);
  };

  const eliminarProveedorEmpresa = () => {
    setProveedorEmpresaSeleccionado(null);
  };

  const proveedoresEmpresa = (proveedor: proveedorEmpresaI) => {
    setProveedorEmpresaSeleccionado(proveedor);
  };

  const proveedoresPersona = (proveedor: proveedorPersonaI) => {
    setProveedorPersonaSeleccionado(proveedor);
  };
  const eliminarProductoSeleccionado = () => {
    setProductoSeleccionado(null);
  };

  const guradaStock = async () => {

    
    const dataStock: dataProductoStock[] = dataSeleccionada.map(
      (item): dataProductoStock => {
        return {
          cantidad: Number(item.cantidad),
          fechaCompra: item.fechaCompra,
          fechaVencimiento: item.fechaCompra,
          precio: Number(item.precio),
          producto: item.id,
          total: Number(item.total),
          almacenArea: item.almacenArea,
          factura: item.factura,
          tipo: item.tipo || tipoE.REGALO,
        };
      }
    );
    const data: gudarStockI = {
      data: dataStock,
      proveedorEmpresa: proveedorEmpresaSeleccionado?._id,
      proveedorPersona: proveedorPersonaSeleccionado?._id,
    };

    try {
      const response = await guardarStock(data);
      if (response.status === 201) {
        setMensaje("Stocks registrados");
        setDataSeleccionada([]);
      }
    } catch (error) {
      const e = httAxiosError(error);
      Array.isArray(e.response.data.errors) &&
        setMensajeError(e.response.data.errors);
      setMensajeErrorClassValidator(
        errorClassValidator(e.response.data.errors)
      );
    }
  };
  

  return (
    <div className="p-6">
       <div className="text-center">   <h2 className="text-2xl font-semibold text-gray-800">ASIGNAR STOCK A LOS PRODUCTOS</h2>
       </div>
<div className="p-4 space-y-6">
    	
  <div className="flex justify-center">
    
    <button
      onClick={openModalProveedores}
      className="bg-blue-600 text-white py-2 px-6 rounded-md text-sm shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
    >
      Proveedores
    </button>
  </div>


  {mensajeErrorClassValidator.length > 0 &&
    mensajeErrorClassValidator.map((item) => {
      if (
        item.propiedad === "proveedorPersona" ||
        item.propiedad === "proveedorEmpresa"
      ) {
        return item.errors.map((e, index) => (
          <p key={index} className="text-red-500 text-sm">
            {e}
          </p>
        ));
      } else {
        return null;
      }
    })}


  
    <ProductosModal  productoSeleccionado={productoSeleccionados}/>
 


  {proveedorPersonaSeleccionado && (
    <SelectProveedorPersona
      eliminarProveedor={eliminarProveedorPersona}
      proveedor={proveedorPersonaSeleccionado}
    />
  )}

  {proveedorEmpresaSeleccionado && (
    <SelectProveedorEmpresa
      eliminarProveedor={eliminarProveedorEmpresa}
      proveedor={proveedorEmpresaSeleccionado}
    />
  )}



  {productosSeleccioando && (
    <SelectProducto
      producto={productosSeleccioando}
      eliminar={eliminarProductoSeleccionado}
    />
  )}


  {mensajeError.length > 0 &&
    mensajeError.map((item, index) => {
      if (item.propiedad === "producto") {
        return (
          <p key={index} className="text-red-500 text-sm">
            {item.message}
          </p>
        );
      } else {
        return null;
      }
    })}


  {isOpenProveedores && (
    <MostrarProveedores
      proveedorEmpresaSeleccionado={proveedoresEmpresa}
      proveedorPersonaSeleccionado={proveedoresPersona}
      isOpen={isOpenProveedores}
      closeModal={closeModalProveedores}
    />
  )}
</div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Detalles del Producto</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
                  
          <div>
            <label
              htmlFor="almacenArea"
              className="block text-sm font-medium text-gray-700"
            >
              Almacen
            </label>
            <select
              id="almacenArea"
              
              className="h-10 border sm:w-3/4 p-2 border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2 px-3 focus:outline-none"
              {...register("almacenArea", {
                required: { value: true, message: "Seleccione un Alamacen" },
              })}
            >
           
              <option value="">Seleccione el almacen</option>
              {almacenArea.map((item) => {
                 
                   return  <option key={item._id} value={item._id}>
                    {item.nombre}
                  </option>
              })}
            </select>
            {mensajeError.length > 0 &&
              mensajeError.map((item) => {
                if (item.propiedad === "almacenArea") {
                  return <p className="text-red-500">{item.message}</p>;
                } else {
                  return null;
                }
              })}
            {errors.almacenArea && <p>{errors.almacenArea.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-700">Cod factura</label>
            <input
              type="text"
              placeholder="Codigo de factura"
              className="w-full sm:w-2/4 p-2 border border-gray-300 rounded text-sm"
              {...register("factura", { required: false })}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Cantidad</label>
            <input
              type="number"
              placeholder="Cantidad"
              className="w-full sm:w-2/4 p-2 border border-gray-300 rounded text-sm"
              defaultValue={1}
              {...register("cantidad", {
                required: { value: true, message: "Ingrese la cantidad" },
                validate: {
                  negativo: (value: number) => {
                    if (value < 0) {
                      return "Ingrese numeros positivos";
                    } else {
                      return true;
                    }
                  },
                },
              })}
            />
            {mensajeError.length > 0 &&
              mensajeError.map((item) => {
                if (item.propiedad === "cantidad") {
                  return <p className="text-red-500">{item.message}</p>;
                } else {
                  return null;
                }
              })}
            {errors.cantidad && <span>{errors.cantidad.message}</span>}
          </div>

          <div>
            <label className="block text-sm text-gray-700">Precio</label>
            <input
              type="number"
              placeholder="Precio"
              className="w-full sm:w-2/4 p-2 border border-gray-300 rounded text-sm"
              step="0.01"
              defaultValue={0}
              {...register("precio", {
                required: { value: true, message: "Ingrese el precio" },
                validate: {
                  validar: (value: number) => {
                    if (value < 0) {
                      return "Ingrese numeros positivos";
                    } else {
                      return true;
                    }
                  },
                },
              })}
            />
            {mensajeError.length > 0 &&
              mensajeError.map((item) => {
                if (item.propiedad === "precio") {
                  return <p className="text-red-500">{item.message}</p>;
                } else {
                  return null;
                }
              })}
            {errors.precio && <span>{errors.precio.message}</span>}
          </div>

          <div>
            <label className="block text-sm text-gray-700">Total</label>
            <input
              type="number"
              placeholder="Total"
              className="w-full sm:w-2/4 p-2 border border-gray-300 rounded text-sm"
              step="0.01"
              value={
                cantidawatch && precioWatch
                  ? Number((cantidawatch * precioWatch).toFixed(2))
                  : 0
              }
              defaultValue={0}
              {...register("total", {
                required: { value: true, message: "Inrese el precio" },
                validate: (value: number) => {
                  if (value < 0) {
                    return "Ingrese numeros positivos";
                  } else {
                    return true;
                  }
                },
              })}
            />

            {mensajeError.length > 0 &&
              mensajeError.map((item) => {
                if (item.propiedad === "total") {
                  return <p className="text-red-500">{item.message}</p>;
                } else {
                  return null;
                }
              })}
            {errors.total && <span>{errors.total.message}</span>}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="regalo"
                value="REGALO"
                defaultChecked
                className="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500"
                {...register("tipo")}
              />
              <label
                htmlFor="regalo"
                className="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                Regalo
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="venta"
                value="VENTA"
                className="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500"
                {...register("tipo")}
              />
              <label
                htmlFor="venta"
                className="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                Venta
              </label>
            </div>

            {mensajeError.length > 0 &&
              mensajeError.map((item) => {
                if (item.propiedad === "tipo") {
                  return <p className="text-red-500">{item.message}</p>;
                } else {
                  return null;
                }
              })}
          </div>

          <div>
            <label className="block text-sm text-gray-700">
              Fecha de Compra
            </label>
            <input
              {...register("fechaCompra")}
              type="date"
              className="w-full sm:w-2/4 p-2 border border-gray-300 rounded text-sm"
              defaultValue="2024-12-06"
            />

            {mensajeError.length > 0 &&
              mensajeError.map((item) => {
                if (item.propiedad === "fechaCompra") {
                  return <p className="text-red-500">{item.message}</p>;
                } else {
                  return null;
                }
              })}
          </div>

          <div>
            <label className="block text-sm text-gray-700">
              Fecha de Vencimiento
            </label>
            <input
              {...register("fechaVencimiento")}
              type="date"
              className="w-full sm:w-2/4 p-2 border border-gray-300 rounded text-sm"
              defaultValue="2025-12-06"
            />
            {mensajeError.length > 0 &&
              mensajeError.map((item) => {
                if (item.propiedad === "fechaVencimiento") {
                  return <p className="text-red-500">{item.message}</p>;
                } else {
                  return null;
                }
              })}
          </div>


          <div className="mt-6 flex space-x-4  justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded w-full sm:w-auto text-sm"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>

     

      <ProductoSeleccioando data={dataSeleccionada} nuevaData={nuevosdatos} />
       <div className="mt-6 flex space-x-4  justify-center">

            {dataSeleccionada.length > 0 &&   <button
          onClick={() => {
            guradaStock();
          }}
          className="bg-yellow-500 text-white py-2 px-4 rounded w-full sm:w-auto text-sm"
        >
          Guardar
        </button>}
        {mensaje && <span>{mensaje}</span>}
      </div>
    </div>
  );
};
