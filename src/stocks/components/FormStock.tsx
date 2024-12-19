import { useEffect, useState } from "react";
import { ProductosModal } from "../../productos/components/modal/ProductosModal";
import { productoI } from "../../productos/interface/productoInterface";
import { useForm } from "react-hook-form";
import { formStockI } from "../interfaces/formStockInterface";
import { dataProductoI, dataProductoStock } from "../interfaces/dataProducto";
import { ProductoSeleccioando } from "./ProductoSeleccioando";
import { gudarStockI } from "../interfaces/stockInterface";
import { guardarStock } from "../service/stockApi";
import { almacenAreaI } from "../../almacenArea/interfaces/almacenAreaInterface";
import { listarAlmacenPorArea } from "../../almacenArea/services/almacenAreaApi";
import { SelectProducto } from "./SelectProducto";

import { proveedorPersonaI } from "../../proveedorPersona/interfaces/proveedorPersonaInterface";
import { SelectProveedorPersona } from "./SelectProveedorPersona";
import { proveedorEmpresaI } from "../../proveedorEmpresa/interface/proveedorEmpresaInterface";
import { SelectProveedorEmpresa } from "./selectProveedorEmpresa";
import { MostrarProveedores } from "./MostrarProveedores";
import { tipoE } from "../enums/tipos.enum";
import { v4 as uuidv4 } from 'uuid';

export const FormStock = () => {
  const { register, handleSubmit, watch } = useForm<formStockI>();
  const [isOpenProductos, setIsOpenProductos] = useState<boolean>(false);
  const [isOpenProveedores, setIsOpenProveedores] = useState<boolean>(false);
  const [dataSeleccionada, setDataSeleccionada] = useState<dataProductoI[]>([]);
  const [almacenArea, setAlmacenArea] = useState<almacenAreaI[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const [productosSeleccioando, setProductoSeleccionado] =
    useState<productoI | null>();
  const [proveedorPersonaSeleccionado, setProveedorPersonaSeleccionado] =
    useState<proveedorPersonaI | null>();

  const [proveedorEmpresaSeleccionado, setProveedorEmpresaSeleccionado] =
    useState<proveedorEmpresaI | null>();

  const openModalProductos = () => setIsOpenProductos(true);
  const closeModalProductos = () => setIsOpenProductos(false);

  const openModalProveedores = () => setIsOpenProveedores(true);
  const closeModalProveedores = () => setIsOpenProveedores(false);

  const cantidawatch = watch("cantidad");
  const precioWatch = watch("precio");

  useEffect(() => {
    const listarAlmacenAreas = async () => {
      try {
        const response = await listarAlmacenPorArea()
        setAlmacenArea(response);
      } catch (error) {}
    };
    listarAlmacenAreas();
  }, []);

  const productoSeleccionados = (producto: productoI) => {
    setProductoSeleccionado(producto);
  };
  const onSubmit = (data: formStockI) => {

    const dataRegistrada: dataProductoI = {
      uuid:uuidv4(),
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
      tipo:data.tipo
    };
    
    const registrados: boolean = dataSeleccionada.some( (item) => item.id === dataRegistrada.id && item.tipo == dataRegistrada.tipo);

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
          tipo: item.tipo || tipoE.REGALO
        
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
      console.log(error);
    }
  };
  return (
    <div className="p-6">
    <button
      onClick={openModalProveedores}
      className="bg-blue-500 text-white py-2 px-4 rounded mb-4 text-sm"
    >
      Proveedores
    </button>
  
    {isOpenProductos && (
      <ProductosModal
        productoSeleccionado={productoSeleccionados}
        isOpen={isOpenProductos}
        closeModal={closeModalProductos}
      />
    )}
    {proveedorPersonaSeleccionado && (
      <>
        <SelectProveedorPersona
          eliminarProveedor={eliminarProveedorPersona}
          proveedor={proveedorPersonaSeleccionado}
        />
      </>
    )}
    {proveedorEmpresaSeleccionado && (
      <>
        <SelectProveedorEmpresa
          eliminarProveedor={eliminarProveedorEmpresa}
          proveedor={proveedorEmpresaSeleccionado}
        />
      </>
    )}
    <button
      onClick={openModalProductos}
      className="bg-blue-500 text-white py-2 px-4 rounded mb-4 text-sm"
    >
      Productos
    </button>
  
    {productosSeleccioando && (
      <>
        <SelectProducto
          producto={productosSeleccioando}
          eliminar={eliminarProductoSeleccionado}
        />
      </>
    )}
    {isOpenProveedores && (
      <MostrarProveedores
        proveedorEmpresaSeleccionado={proveedoresEmpresa}
        proveedorPersonaSeleccionado={proveedoresPersona}
        isOpen={isOpenProveedores}
        closeModal={closeModalProveedores}
      />
    )}
  
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Detalles del Producto</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="subCategoria" className="block text-sm font-medium text-gray-700">
            Almacen
          </label>
          <select
            id="subCategoria"
            className="h-10 border sm:w-3/4 p-2 border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2 px-3 focus:outline-none"
            {...register("almacenArea")}
          >
            <option value="">Seleccione el almacen</option>
            {almacenArea.map((item) => (
              <option key={item._id} value={item._id}>
                {item.nombre}
              </option>
            ))}
          </select>
        </div>
  
        <div>
          <label className="block text-sm text-gray-700">Cod factura</label>
          <input
            type="text"
            placeholder="Codigo de factura"
            className="w-full sm:w-2/4 p-2 border border-gray-300 rounded text-sm"
            {...register("factura")}
          />
        </div>
  
        <div>
          <label className="block text-sm text-gray-700">Cantidad</label>
          <input
            type="number"
            placeholder="Cantidad"
            className="w-full sm:w-2/4 p-2 border border-gray-300 rounded text-sm"
            defaultValue={0}
            {...register("cantidad")}
          />
        </div>
  
        <div>
          <label className="block text-sm text-gray-700">Precio</label>
          <input
            type="number"
            placeholder="Precio"
            className="w-full sm:w-2/4 p-2 border border-gray-300 rounded text-sm"
            step="0.01"
            defaultValue={0}
            {...register("precio")}
          />
        </div>
  
        <div>
          <label className="block text-sm text-gray-700">Total</label>
          <input
            type="number"
            placeholder="Total"
            className="w-full sm:w-2/4 p-2 border border-gray-300 rounded text-sm"
            step="0.01"
            value={cantidawatch && precioWatch ? Number((cantidawatch * precioWatch).toFixed(2)) : 0}
            defaultValue={0}
            {...register("total")}
          />
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
            <label htmlFor="regalo" className="ml-2 text-sm text-gray-700 cursor-pointer">
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
            <label htmlFor="venta" className="ml-2 text-sm text-gray-700 cursor-pointer">
              Venta
            </label>
          </div>
        </div>
  
        <div>
          <label className="block text-sm text-gray-700">Fecha de Compra</label>
          <input
            {...register("fechaCompra")}
            type="date"
            className="w-full sm:w-2/4 p-2 border border-gray-300 rounded text-sm"
            defaultValue="2024-12-06"
          />
        </div>
  
        <div>
          <label className="block text-sm text-gray-700">Fecha de Vencimiento</label>
          <input
            {...register("fechaVencimiento")}
            type="date"
            className="w-full sm:w-2/4 p-2 border border-gray-300 rounded text-sm"
            defaultValue="2025-12-06"
          />
        </div>
  
        <div className="mt-6 flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded w-full sm:w-auto text-sm"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  
    <div>
      {mensaje && <span>{mensaje}</span>}
      <button
        onClick={() => {
          guradaStock();
        }}
        className="bg-yellow-500 text-white py-2 px-4 rounded w-full sm:w-auto text-sm"
      >
        Guardar
      </button>
    </div>
  
    <ProductoSeleccioando data={dataSeleccionada} nuevaData={nuevosdatos} />
  </div>
  
  );
};
