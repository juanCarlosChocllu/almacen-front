import React, { useContext, useEffect, useState } from "react";
import { rolI } from "../../rol/interface/rolInterface";
import {  listarRolPublicas } from "../../rol/services/rolService";
import { useForm } from "react-hook-form";
import { FormUsuariosI } from "../interfaces/formUsuarioInterface";
import {  editarUsuarios, obtenerUsuario } from "../services/usuarioService";

import { HttpStatus } from "../../core/enums/httStatusEnum";
import { errorPropiedadesI } from "../../core/interfaces/errorPropiedades";

import { errorConflictoI } from "../../core/interfaces/errorConflictoInterface";
import { TipoE } from "../enums/tipo.enum";
import { listarAreasPublicas } from "../../areas/service/areasService";
import { areasI } from "../../areas/interfaces/areasInterface";
import { empresaI } from "../../empresa/interfaces/empresaInterface";
import { listarEmpresa, listarEmpresaPublic } from "../../empresa/services/empresaApi";

import { listarSucursalEmpresaBuscador, obtenerSucursalPublicas } from "../../sucursal/services/sucursalService";
import { sucursalI } from "../../sucursal/interface/sucursalInterface";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { MdDelete } from "react-icons/md";
import { httAxiosError } from "../../core/utils/error.util";
import { errorClassValidator } from "../../core/utils/errorClassValidator";
import { PropsEditarUsuario } from "../interfaces/PropsEditarUsuario";
import { TipoUsuarioE } from "../../core/enums/tipoUsuario";
import { obtenerDetallleAreaUsuarioPublico } from "../../detalleArea/services/detalleAreaService";

export const EditarUsuarios = ({ recargar, setRecargar  ,closeModal,id,isOpen}: PropsEditarUsuario) => {
  const { token } = useContext(AutenticacionContext);
  const [roles, setRoles] = useState<rolI[]>([]);
  const [mensajeError, setMensajeError] = useState<errorPropiedadesI[]>([]);
  const [mensaje, setMensaje] = useState<string>();
  const [tipo, setTipo] = useState<string>();
  const [areas, setAreas] = useState<areasI[]>([]);
  const [empresas, setEmpresas] = useState<empresaI[]>([]);

  const [sucursal, setSucursales] = useState<sucursalI[]>([]);
  const [areasSeleccionada, setAreaSeleccionada] = useState<areasI[]>([]);

  const [mensajeErrorConflito, setMensajeErrorConflicto] =
    useState<errorConflictoI>();
  const { register, handleSubmit, reset, watch, setValue } = useForm<FormUsuariosI>();

  const empresaSeleccionado = watch('empresa')

  useEffect(()=>{
    listarRoles()
    usuario()
  },[])
  const listarRoles = async () => {
    try {
      if (token) {
        const response = await listarRolPublicas(token);
        setRoles(response);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    if (mensajeErrorConflito) {
      setMensajeErrorConflicto({ message: "", statusCode: 0 });
    }
  }, [watch("ci"), watch("username")]);

  const onSubmit = async (data: FormUsuariosI) => {
    setMensaje("");
    setMensajeErrorConflicto({ message: "", statusCode: 0 });
    data.area = areasSeleccionada.map((item) => item._id);
    if (tipo === TipoE.SUCURSAL) {
      data.tipo = tipo;
      delete data.area;
    } else if (tipo === TipoE.AREA) {
      data.tipo = tipo;
      delete data.sucursal;
    } else if (tipo === TipoE.NINGUNO) {
      data.tipo = tipo;
      delete data.sucursal;
      delete data.area;
    }

    try {
      if (token) {
        console.log(data);
        
        const response = await editarUsuarios(data, token, id);        
        if (response.status === HttpStatus.OK) {
          reset();
          setRecargar(!recargar);
          closeModal()
     
        }
      }
    } catch (error) {
      console.log(error);
      
      const e = httAxiosError(error);
      if (e.response.status === HttpStatus.BAD_REQUEST) {
        Array.isArray(e.response.data.errors) &&
          setMensajeError(errorClassValidator(e.response.data.errors));
      } else if (e.response.status === HttpStatus.CONFLICT) {
        setMensajeErrorConflicto(e.response.data);
      }
    }
  };


  
useEffect(()=> {
  if(tipo== TipoUsuarioE.SUCURSAL){
    tipoScursal()
  }
},[tipo])

  const tipoScursal = async () => {
    setTipo(TipoE.SUCURSAL);
  
    setAreaSeleccionada([]);
    try {
      if (token) {
        const response = await listarEmpresaPublic(token);
        setEmpresas(response);
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  const tipoArea = async () => {
  
    setTipo(TipoE.AREA);

    try {
      if (token) {
        const response = await listarAreasPublicas(token);
        setAreas(response);
      }
    } catch (error) {}
  };
  const tipoNinguno = () => {
    
    setAreaSeleccionada([]);
    setTipo(TipoE.NINGUNO);
  };

  useEffect(() => {
    if (empresaSeleccionado) {
      sucursales();
    }
  }, [empresaSeleccionado]);

  const sucursales = async () => {
    try {
      if (token && empresaSeleccionado) {
        const response = await listarSucursalEmpresaBuscador(
          empresaSeleccionado,
          token
        );
        setSucursales(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const areasSeleccionadas = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;
    const area = areas.filter((item) => target.value === item._id);
    if (area.length > 0) {
      const areaExistente = areasSeleccionada.some(
        (item) => item._id === area[0]._id
      );
      if (!areaExistente) {
        setAreaSeleccionada((prevState) => [...prevState, ...area]);
      }
    }
  };


  const usuario = async () =>{
    try {
      if(token){
        const response = await obtenerUsuario(token, id) 
        setValue('ci', response.ci)
        setValue('nombres', response.nombres)
        setValue('apellidos', response.apellidos)
        setValue('celular', response.celular)
        setValue('rol', response.rol)        
       console.log('tipoUser', response.tipo);
       
        if(response.tipo == TipoUsuarioE.SUCURSAL) {
          if(response.sucursal){
     
            const sucursal = await obtenerSucursalPublicas(token , response.sucursal)  
            setTipo(TipoUsuarioE.SUCURSAL)     
            setValue('empresa', sucursal.empresa)
            setTimeout(()=>setValue('sucursal', response.sucursal) ,100)
          
          }
          
        }
         else if(response.tipo == TipoUsuarioE.AREA) {
          setTipo(TipoUsuarioE.AREA)    
          const areas = await obtenerDetallleAreaUsuarioPublico(token , id)
            console.log(areas);
            
          
          const areaFormateada:areasI[]= areas.map((i)=>{
            return {_id:i.idArea, nombre:i.area}
          })
          setAreaSeleccionada(areaFormateada)
          
        }else if (response.tipo == TipoUsuarioE.NINGUNO) {
          setTipo(TipoUsuarioE.NINGUNO)
        }
        

      }
    } catch (error) {
      
    }
  }


  return (
    <div>
      
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
            <button onClick={closeModal}>X</button>
            <h1 className="text-xl font-semibold text-center text-gray-800 mb-4">
              Formulario de Usuarios
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-2">
                  <label
                    htmlFor="ci"
                    className="block text-gray-700 font-medium"
                  >
                    CI
                  </label>
                  <input
                    type="text"
                    id="ci"
                    {...register("ci")}
                    className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {mensajeError.length > 0 &&
                    mensajeError.map((item) => {
                      if (item.propiedad === "ci") {
                        return item.errors.map((e) => (
                          <p
                            key={item.propiedad}
                            className="text-red-500 text-xs"
                          >
                            {e}
                          </p>
                        ));
                      } else {
                        return null;
                      }
                    })}

                  {mensajeErrorConflito &&
                    mensajeErrorConflito.propiedad == "ci" && (
                      <p className="text-red-500 text-xs">
                        {mensajeErrorConflito.message}
                      </p>
                    )}
                </div>

                <div>
                  <label
                    htmlFor="nombres"
                    className="block text-gray-700 font-medium"
                  >
                    Nombres
                  </label>
                  <input
                    type="text"
                    id="nombres"
                    {...register("nombres")}
                    className="block w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {mensajeError.length > 0 &&
                    mensajeError.map((item) => {
                      if (item.propiedad === "nombres") {
                        return item.errors.map((e) => (
                          <p
                            key={item.propiedad}
                            className="text-red-500 text-xs"
                          >
                            {e}
                          </p>
                        ));
                      } else {
                        return null;
                      }
                    })}
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="apellidos"
                    className="block text-gray-700 font-medium"
                  >
                    Apellidos
                  </label>
                  <input
                    type="text"
                    id="apellidos"
                    {...register("apellidos")}
                    className="block w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {mensajeError.length > 0 &&
                    mensajeError.map((item) => {
                      if (item.propiedad === "apellidos") {
                        return item.errors.map((e) => (
                          <p
                            key={item.propiedad}
                            className="text-red-500 text-xs"
                          >
                            {e}
                          </p>
                        ));
                      } else {
                        return null;
                      }
                    })}
                </div>

               {/* <div>
                  <label
                    htmlFor="username"
                    className="block text-gray-700 font-medium"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    {...register("username")}
                    className="block w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {mensajeError.length > 0 &&
                    mensajeError.map((item) => {
                      if (item.propiedad === "username") {
                        return item.errors.map((e) => (
                          <p
                            key={item.propiedad}
                            className="text-red-500 text-xs"
                          >
                            {e}
                          </p>
                        ));
                      } else {
                        return null;
                      }
                    })}
                  {mensajeErrorConflito &&
                    mensajeErrorConflito.propiedad == "username" && (
                      <p className="text-red-500 text-xs">
                        {mensajeErrorConflito.message}
                      </p>
                    )}
                </div> */}

               {/* <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-medium"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    className="block w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {mensajeError.length > 0 &&
                    mensajeError.map((item) => {
                      if (item.propiedad === "password") {
                        return item.errors.map((e) => (
                          <p
                            key={item.propiedad}
                            className="text-red-500 text-xs"
                          >
                            {e}
                          </p>
                        ));
                      } else {
                        return null;
                      }
                    })}
                </div> */}

                <div>
                  <label
                    htmlFor="celular"
                    className="block text-gray-700 font-medium"
                  >
                    Celular
                  </label>
                  <input
                    type="text"
                    id="celular"
                    {...register("celular")}
                    className="block w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {mensajeError.length > 0 &&
                    mensajeError.map((item) => {
                      if (item.propiedad === "celular") {
                        return item.errors.map((e) => (
                          <p
                            key={item.propiedad}
                            className="text-red-500 text-xs"
                          >
                            {e}
                          </p>
                        ));
                      } else {
                        return null;
                      }
                    })}
                </div>

                <div className="mb-2">
                  <p className="text-sm font-semibold mb-1">
                    Seleccione el tipo
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        checked={tipo == TipoE.SUCURSAL}
                        type="radio"
                        name="tipo"
                        id="sucursal"
                        onChange={() => tipoScursal()}
                        className="form-radio text-blue-500 mr-2"
                      />
                      <label htmlFor="sucursal" className="text-sm">
                        Sucursal
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                      checked={tipo == TipoE.AREA}
                        type="radio"
                        name="tipo"
                        id="area"
                        onClick={() => tipoArea()}
                        className="form-radio text-blue-500 mr-2"
                      />
                      <label htmlFor="area" className="text-sm">
                        Área
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        checked={tipo == TipoE.NINGUNO}
                        type="radio"
                        name="tipo"
                        id="ninguno"
                        onClick={() => tipoNinguno()}
                        className="form-radio text-blue-500 mr-2"
                      />
                      <label htmlFor="ninguno" className="text-sm">
                        Ninguno
                      </label>
                    </div>
                  </div>
                  {tipo === TipoE.NINGUNO && (
                    <p className="text-xs mt-2">
                      Este usuario no pertenecera a ninguna área o sucursal.
                    </p>
                  )}

                  {tipo === TipoE.AREA && (
                    <select
                      {...register("area")}
                      onChange={areasSeleccionadas}
                      className="w-full p-2 border-2 border-gray-300 rounded-sm focus:outline-none focus:ring-2"
                    >
                      <option>Seleccione su area</option>
                      {areas.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.nombre}
                        </option>
                      ))}
                    </select>
                  )}

                  {tipo === TipoE.SUCURSAL && (
                    <div>
                      <select
                       {...register("empresa")}
                        className="w-full p-2 border-2 border-gray-300 rounded-sm focus:outline-none focus:ring-2"
                      >
                        <option>Seleccione su empresa</option>
                        {empresas.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.nombre}
                          </option>
                        ))}
                      </select>

                      <div className="mt-2">
                        <select
                          {...register("sucursal")}
                          className="w-full p-2 border-2 border-gray-300 rounded-sm focus:outline-none focus:ring-2"
                        >
                          <option>Seleccione su sucursal</option>
                          {sucursal.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <select
                    {...register("rol")}
                    className="w-full p-2 border-2 border-gray-300 rounded-sm focus:outline-none focus:ring-2"
                  >
                    <option>Seleccione su rol</option>
                    {roles.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>

                  {mensajeError.length > 0 &&
                    mensajeError.map((item) => {
                      if (item.propiedad === "rol") {
                        return item.errors.map((e) => (
                          <p
                            key={item.propiedad}
                            className="text-red-500 text-xs"
                          >
                            {e}
                          </p>
                        ));
                      } else {
                        return null;
                      }
                    })}

                  <div>
                    {areasSeleccionada.map((item) => {
                      return (
                        <p>
                          {item.nombre}{" "}
                          <button
                            type="button"
                            onClick={() => {
                              const areas = areasSeleccionada.filter(
                                (i) => i._id != item._id
                              );
                              setAreaSeleccionada(areas);
                            }}
                          >
                            <MdDelete />
                          </button>{" "}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>

              {mensaje && <p>{mensaje}</p>}
              <div>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
