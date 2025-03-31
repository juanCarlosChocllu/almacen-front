import { useContext, useEffect, useState } from "react";
import { ListraStock } from "../../stocks/modal/ListraStock";
import {  listarEmpresaPublic } from "../../empresa/services/empresaApi";
import { empresaI } from "../../empresa/interfaces/empresaInterface";
import { useForm } from "react-hook-form";
import { formTransferenciaI } from "../interface/formTranferenciaInterface";
import { sucursalI } from "../../sucursal/interface/sucursalInterface";
import { listarSucursalEmpresaBuscador } from "../../sucursal/services/sucursalService";
import { almacenSucursalI } from "../../almacenSucursal/interfaces/almacenSucursalInterface";
import { listraAlmacenPorSucursalBuscador } from "../../almacenSucursal/services/almacenSucursalService";
import { StockI } from "../../stocks/interfaces/stockInterface";
import { TranferenciaRegistrada } from "./TranferenciaRegistrada";
import { registrarTranferenciaI } from "../interface/registrarTransferenciaInterface";
import { v4 as uuidv4 } from "uuid";
import {
  dataTransferenciaI,
  realizarTransferenciaI,
} from "../interface/realizarTransferenciaInterface";
import { realizarTransferencias } from "../services/transferenciaService";
import { StockSeleccionado } from "./StockSeleccionado";
import { HttpStatus } from "../../core/enums/httStatusEnum";

import { verificarCantidadStockSucursal } from "../../stockSucursal/services/stockSucursalApi";
import { StockSucursalVerificarI } from "../../stockSucursal/interfaces/stockSucursalInterface";

import { errorPersonalizadoI } from "../../core/interfaces/errorPersonalizado";

import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { httAxiosError } from "../../core/utils/error.util";
import { Loader } from "../../core/components/Loader";
import { diasRestantes } from "../../core/utils/diasVencimiento";
import { alertaDeconfirmacion } from "../../core/utils/alertaDeConfirmacion";
import { alertaStockRegistrado } from "../utils/alertaStockRegistrado";

export const CrearTransferencia = () => {
  const {token}= useContext(AutenticacionContext)
  const [empresas, setEmpresas] = useState<empresaI[]>([]);
  const [sucursales, setSucursales] = useState<sucursalI[]>([]);
  const [disableEmpresa, setDisableEmpresa] = useState<boolean>(false);
  const [disableSucursal, setDisableSucursal] = useState<boolean>(false);
  const [almacenSucursal, setAlmacenSucursal] = useState<almacenSucursalI[]>(
    []
  );
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<formTransferenciaI>();
  const [stockSeleccionado, setStockSeleccionado] = useState<StockI | null>();
  const [dataRegistrada, setDataRegistrada] = useState<
    registrarTranferenciaI[]
  >([]);
  const [cantidadStockTransferencia, setCantidadStockTransferencia] =
    useState<StockSucursalVerificarI>();
  const [cantidad, setCantidad] = useState<number>(0);
  const [tipo, setTipo] = useState<string>('');
  const [fechaVencimiento, setFechaVencimiento] = useState<string>()
  const [mensajeError, setMensajeError] = useState<errorPersonalizadoI[]>([]);
  const [mensaje, setMensaje] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
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
   
  }, [empresa, sucursal ]);

  useEffect(() => {
    setValue('almacenSucursal','')
    
  }, [stockSeleccionado]);

  const listarEmpresas = async () => {
    try {
   if(token){
    const response = await listarEmpresaPublic(token);
    setEmpresas(response);
   }
    } catch (error) {
      console.log(error);
    }
  };

  const selectStock = (stock: StockI) => {
    setStockSeleccionado(stock);
    setCantidad(stock.cantidad);
    setTipo(stock.tipo),
    setFechaVencimiento(stock.fechaVencimiento)
  };

  const listarSucursales = async () => {
    try {
      if(token){
        const response = await listarSucursalEmpresaBuscador(empresa,token);
        setSucursales(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const listarSucursaAlmacen = async () => {
    try {
      if(token){
        const response = await listraAlmacenPorSucursalBuscador(sucursal, token);
        setAlmacenSucursal(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: formTransferenciaI) => {
    
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
        codigoProducto:stockSeleccionado?.codigoProducto
      };
      const existeStock = dataRegistrada.filter((stock) => stock.codigo == registrarData.codigo  && stock.almacen == registrarData.almacen)
      if(existeStock.length > 0) {
        const alerta =  await alertaStockRegistrado()
        if(alerta.isConfirmed) {
          for (let index = 0; index < existeStock.length; index++) {
            existeStock[index].cantidad += registrarData.cantidad  
          }
        }        
      }else {
        setDataRegistrada([...dataRegistrada, registrarData]);
      }
      
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
        codigoProducto:item.codigoProducto,
        sucursal:item.sucursal,
        nombreProducto:item.producto
      };
    });

    
    try {
      const newDta: dataTransferenciaI = {
        data: data,
        sucursal:sucursal
      };

       
       if(token  ){
        const response = await realizarTransferencias(newDta, token);
      if (response.status == HttpStatus.OK) {
        setMensaje(response.message);
        setDataRegistrada([]);
        setDisableEmpresa(false)
        setDisableSucursal(false)
      }
       }
    } catch (error) {
      const err = httAxiosError(error);
      console.log(err);
      
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
        stockSeleccionado.tipo && token
      ) {
        setLoading(true);
        const response = await verificarCantidadStockSucursal(
          stockSeleccionado.idStock,
          almacenSucursalSeleccionado,
          stockSeleccionado.tipo,
          token
        );
        
        setCantidadStockTransferencia(response);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
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

                disabled={disableEmpresa}
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
                disabled={disableSucursal}
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
                    <div className="flex flex-col space-y-2">
                    <span className="text-gray-800 text-xs font-semibold">
                      Cant. Stock Origen:
                      <span className="text-blue-500"> {cantidad}</span>
                    </span>
                    <span className="text-gray-800 text-xs font-semibold">
                      Tipo:
                      <span className="text-blue-500"> {tipo}</span>
                    </span>
                    <span className="text-gray-800 text-xs font-semibold">
                      Fecha de vencimiento:
                      <span className="text-blue-500"> {fechaVencimiento}</span>
                    </span>
                    <span className="text-gray-800 text-xs font-semibold">
                      Dias restante:
                      {fechaVencimiento &&   <span className="text-blue-500"> {diasRestantes(fechaVencimiento)}</span>}
                    </span>
                  </div>
                  
                )}
                {loading ? (
                  <Loader />
                ) : (
                  cantidadStockTransferencia && (
                    <div className="mt-4">
                    <span className="text-gray-800 text-xs font-semibold">
                      Cant. Stock Destino:
                      <span className="text-green-500">
                        {cantidadStockTransferencia.cantidad}
                      </span>
                    </span>
                    <span className="text-gray-800 text-xs font-semibold ml-2">
                      - Tipo:
                      <span className="text-teal-500">
                        {cantidadStockTransferencia.tipo}
                      </span>
                    </span>
                  </div>
                  )
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
                      return (
                        <span key={item.propiedad} className="text-red-500 text-xs">
                        Mensaje: {item.message} Código Producto: {item.codigoProducto} <br />
                      </span>
                      );
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

       
        {mensaje && <span>{mensaje}</span>}
      </div>

      {dataRegistrada.length > 0 && <>
        <TranferenciaRegistrada
          data={dataRegistrada}
          eliminarData={dataEliminada}
       
          setDisableEmpresa={setDisableEmpresa}
          setDisableSucursal={setDisableSucursal}
        
        />

       <div className="text-center">
       <button
        onClick={() => {
          alertaDeconfirmacion(realizarTransferencia)
        }}
        type="button"
        disabled={dataRegistrada.length > 0 ?false :true}
        className="mt-4 p-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition duration-300 transform hover:scale-105"
      >
        Guardar
      </button>
       </div>
      </>}
    </>
  );
};
