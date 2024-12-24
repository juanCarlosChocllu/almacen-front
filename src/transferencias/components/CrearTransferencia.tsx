import { useEffect, useState } from "react";
import { ListraStock } from "../../stocks/components/modal/ListraStock";
import { listarEmpresa } from "../../empresa/services/empresaApi";
import { empresaI } from "../../empresa/interfaces/empresaInterface";
import { useForm } from "react-hook-form";
import { formTransferenciaI } from "../interface/formTranferenciaInterface";
import { sucursalI } from "../../sucursal/interface/sucursalInterface";
import { listarSucursalEmpresa } from "../../sucursal/services/sucursalApi";
import { almacenSucursalI } from "../../almacenSucursal/interfaces/almacenSucursalInterface";
import { listraAlmacenPorSucursal } from "../../almacenSucursal/services/almacenSucursalApi";
import { StockI } from "../../stocks/interfaces/stockInterface";
import { TranferenciaRegistrada } from "./TranferenciaRegistrada";
import { registrarTranferenciaI } from "../interface/registrarTransferenciaInterface";
import { v4 as uuidv4 } from "uuid";
import {
  dataTransferenciaI,
  realizarTransferenciaI,
} from "../interface/realizarTransferenciaInterface";
import { realizarTransferencias } from "../services/transferenciaApi";
import { StockSeleccionado } from "./StockSeleccionado";
import { HttpStatus } from "../../enums/httStatusEnum";
import { httAxiosError } from "../../utils/error/error.util";
import { verificarCantidadStockTransferencia } from "../../stockTransferencia/services/stockTransferenciaApi";
import { StockTransferenciaVInterfaceI } from "../../stockTransferencia/interfaces/stockTransferenciaInterface";

import { errorPersonalizadoI } from "../../interfaces/errorPersonalizado";
import { Loader } from "../../utils/components/Loader";

export const CrearTransferencia = () => {
  const [empresas, setEmpresas] = useState<empresaI[]>([]);
  const [sucursales, setSucursales] = useState<sucursalI[]>([]);
  const [almacenSucursal, setAlmacenSucursal] = useState<almacenSucursalI[]>(
    []
  );
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<formTransferenciaI>();
  const [stockSeleccionado, setStockSeleccionado] = useState<StockI | null>();
  const [dataRegistrada, setDataRegistrada] = useState<
    registrarTranferenciaI[]
  >([]);
  const [cantidadStockTransferencia, setCantidadStockTransferencia] =
    useState<StockTransferenciaVInterfaceI>();
  const [cantidad, setCantidad] = useState<number>(0);
  const [mensajeError, setMensajeError] = useState<errorPersonalizadoI[]>([]);
  const [mensaje, setMensaje] = useState<string>();
  const [loading , setLoading]= useState<boolean>(false)
  const empresa = watch("empresa");
  const sucursal = watch("sucursal");
  const almacenSucursalSeleccionado = watch("almacenSucursal");

  useEffect(() => {
    listarEmpresas();
    if (empresa) {
      listarSucursales();
    }
    if (sucursal) {
      listarSucursaAlmacen();
    }
  }, [empresa, sucursal]);

  const listarEmpresas = async () => {
    try {
      const response = await listarEmpresa();
      setEmpresas(response);
    } catch (error) {
      console.log(error);
    }
  };

  const selectStock = (stock: StockI) => {
    setStockSeleccionado(stock);
    setCantidad(stock.cantidad);
  };

  const listarSucursales = async () => {
    try {
      const response = await listarSucursalEmpresa(empresa);
      setSucursales(response);
    } catch (error) {
      console.log(error);
    }
  };

  const listarSucursaAlmacen = async () => {
    try {
      const response = await listraAlmacenPorSucursal(sucursal);
      setAlmacenSucursal(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: formTransferenciaI) => {
    const empresa = empresas.filter((item) => item._id === data.empresa)[0];
    const sucursal = sucursales.filter((item) => item._id === data.sucursal)[0];
    const almacen = almacenSucursal.filter(
      (item) => item._id === data.almacenSucursal
    )[0];
    if (stockSeleccionado) {
    const registrarData: registrarTranferenciaI = {
      uuid: uuidv4(),
      almacen: data.almacenSucursal,
      cantidad: Number(data.cantidad),
      codigo: stockSeleccionado?.codigo,
      empresa: data.empresa,
      nombreAlmacen: almacen.nombre,
      nombreEmpresa: empresa.nombre,
      nombreSucursal: sucursal.nombre,
      producto: stockSeleccionado?.nombre,
      sucursal: data.sucursal,
      tipo: stockSeleccionado?.tipo,
      idStock: stockSeleccionado?.idStock,
      nombreAlmacenArea: stockSeleccionado?.almacen,
      almacenArea: stockSeleccionado?.almacenArea,
    };

    setDataRegistrada([...dataRegistrada, registrarData]);
    } else {
     setMensaje("Debe Seleccionar un producto");
    }
  };

  const dataEliminada = (data: registrarTranferenciaI[]) => {
    setDataRegistrada(data);
  };
  const realizarTransferencia = async () => {
    const data: realizarTransferenciaI[] = dataRegistrada.map((item) => {
      return {
        almacenSucursal: item.almacen,
        cantidad: item.cantidad,
        tipo: item.tipo,
        stock: item.idStock,
        almacenArea: item.almacenArea,
      };
    });

    try {
      const newDta: dataTransferenciaI = {
        data: data,
      };

      const response = await realizarTransferencias(newDta);
      if (response.status == HttpStatus.OK) {
        setMensaje(response.message);
    
        setDataRegistrada([])

      }
    } catch (error) {

      const err = httAxiosError(error);
      if (err.response.data.statusCode === HttpStatus.BAD_REQUEST) {
        console.log(err.response.data.errors);
        Array.isArray(err.response.data.errors) &&
          setMensajeError(err.response.data.errors);
        Array.isArray(err.response.data.message) &&
          setMensajeError(err.response.data.message);
      }
    }
  };

  const eliminarStockSeleccionado = () => {
    setStockSeleccionado(null);
  };

  const verificarStockTransferencia = async () => {
    try {
      if (
        stockSeleccionado?.idStock &&
        almacenSucursalSeleccionado &&
        stockSeleccionado.tipo
      ) {
        setLoading(true)
        const response = await verificarCantidadStockTransferencia(
          stockSeleccionado.idStock,
          almacenSucursalSeleccionado,
          stockSeleccionado.tipo
        );
        setCantidadStockTransferencia(response);
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  };

  const verificar = () => {
    verificarStockTransferencia();
  };
  return (
    <>
      {<ListraStock stock={selectStock} />}
      {stockSeleccionado && (
        <StockSeleccionado
          item={stockSeleccionado}
          eliminar={eliminarStockSeleccionado}
        />
      )}
      {mensajeError.length > 0
        ? mensajeError.map((item) => {
            if (item.propiedad === "stock") {
              return <span key={item.propiedad}> {item.message}</span>;
            }
            return null;
          })
        : null}

      {mensajeError.length > 0
        ? mensajeError.map((item) => {
            if (item.propiedad === "tipo") {
              return <span key={item.propiedad}> {item.message}</span>;
            }
            return null;
          })
        : null}
      <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg max-w-4xl mx-auto mt-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Crear Transferencia
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label
                htmlFor="empresa"
                className="block text-sm font-medium mb-2"
              >
                Seleccionar Empresa
              </label>
              <select
                id="empresa"
                {...register("empresa", {
                  required: { value: true, message: "Seleccione una empresa" },
                })}
                className="w-full p-2 bg-white border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccione una empresa</option>
                {empresas.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
              {errors.empresa && <span>{errors.empresa.message}</span>}
            </div>

            <div className="mb-4">
              <label
                htmlFor="sucursal"
                className="block text-sm font-medium mb-2"
              >
                Seleccionar Sucursal
              </label>
              <select
                id="sucursal"
                {...register("sucursal", {
                  required: { value: true, message: "Seleccione una sucursal" },
                })}
                className="w-full p-2 bg-white border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccione una sucursal</option>
                {sucursales.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
              {errors.sucursal && <span>{errors.sucursal.message}</span>}
            </div>

            <div className="mb-4">
              <label
                htmlFor="almacen"
                className="block text-sm font-medium mb-2"
              >
                Seleccionar Almacén
              </label>
              <select
                onClick={verificar}
                {...register("almacenSucursal", {
                  required: { value: true, message: "Seleccione una almacen" },
                })}
                id="almacen"
                className="w-full p-2 bg-white border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccione un almacén</option>
                {almacenSucursal.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
              {errors.almacenSucursal && (
                <span>{errors.almacenSucursal.message}</span>
              )}
            </div>

            <div className="mb-4">
              <div className="p-4 bg-gray-100">
                {cantidad != 0 && (
                  <span className="text-gray-800 text-xs font-semibold mr-4">
                    Cant. Stock.: <span className="text-blue-500">{cantidad}</span>
                  </span>
                )}
                {loading ? <Loader/>:  cantidadStockTransferencia && (
                  <span className="text-gray-800 text-xs">
                    Cant. Stock Destino:
                    <span className="text-green-500">
                      {cantidadStockTransferencia.cantidad}
                    </span>
                    - Tipo:
                    <span className="text-teal-500">
                      {cantidadStockTransferencia.tipo}
                    </span>
                  </span>
                )}
              </div>

              <label
                htmlFor="cantidad"
                className="block text-sm font-medium mb-2"
              >
                Cantidad
              </label>
              <input
                type="number"
                required
                defaultValue={1}
                id="cantidad"
                {...register("cantidad", {
                  required: true,
                  min: {
                    value: 1,
                    message: "La cantidad debe ser al menos 1",
                  },
                })}
                className="w-full p-2 bg-white border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.cantidad && <span>{errors.cantidad.message}</span>}
              {mensajeError.length > 0
                ? mensajeError.map((item) => {
                    if (item.propiedad === "cantidad") {
                      return <span key={item.propiedad}>{item.message} <br/> </span>;
                    }
                    return null;
                  })
                : null}
            </div>
            {mensajeError.length > 0
        ? mensajeError.map((item) => {
            if (item.propiedad === "transferencias") {
              return <span key={item.propiedad}> {item.message}</span>;
            }
            return null;
          })
        : null}
          </div>


          <button
            type="submit"
            className=" p-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 transform hover:scale-105"
          >
            Registrar Transferencia
          </button>
        </form>

        <button
          onClick={() => {
            realizarTransferencia();
          }}
          type="button"
          className="mt-4 p-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition duration-300 transform hover:scale-105"
        >
          Guardar
        </button>
        {mensaje && <span>{mensaje}</span>}
      </div>

      {dataRegistrada && (
        <TranferenciaRegistrada
          data={dataRegistrada}
          eliminarData={dataEliminada}
        />
      )}
    </>
  );
};
