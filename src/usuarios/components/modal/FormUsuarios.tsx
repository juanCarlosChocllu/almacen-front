import React, { useContext, useEffect, useState } from "react";
import { rolI } from "../../../rol/interface/rolInterface";
import { listarRol } from "../../../rol/services/rolApi";
import { useForm } from "react-hook-form";
import { FormUsuariosI } from "../../interfaces/formUsuarioInterface";
import { crearUsuarios } from "../../services/usuariosApi";
import { httAxiosError } from "../../../utils/error/error.util";
import { HttpStatus } from "../../../enums/httStatusEnum";
import { errorPropiedadesI } from "../../../interfaces/errorPropiedades";
import { errorClassValidator } from "../../../utils/error/errorClassValidator";
import { errorConflictoI } from "../../../interfaces/errorConflictoInterface";
import { TipoE } from "../../enums/tipo.enum";
import { listarAreas } from "../../../areas/service/areasApi";
import { areasI } from "../../../areas/interfaces/areasInterface";
import { empresaI } from "../../../empresa/interfaces/empresaInterface";
import { listarEmpresa } from "../../../empresa/services/empresaApi";

import { listarSucursalEmpresa } from "../../../sucursal/services/sucursalApi";
import { sucursalI } from "../../../sucursal/interface/sucursalInterface";
import { AutenticacionContext } from "../../../autenticacion/context/crear.autenticacion.context";
import { MdDelete } from "react-icons/md";

export const FormUsuarios = () => {
    const {token}=useContext(AutenticacionContext)
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [roles, setRoles] = useState<rolI[]>([]);
  const [mensajeError, setMensajeError] = useState<errorPropiedadesI[]>([]);
  const [mensaje, setMensaje] = useState<string>();
  const [tipo, setTipo] = useState<string>();
  const [areas, setAreas]=useState<areasI[]>([])
  const [empresaSeleccionado, setEmpresaSeleccionado]=useState<string>()
  const [empresas, setEmpresas]=useState<empresaI[]>([])
  const [sucursal, setSucursales]=useState<sucursalI[]>([])
  const [areasSeleccionada, setAreaSeleccionada]=useState<areasI[]>([])

  
  const [mensajeErrorConflito, setMensajeErrorConflicto] =
    useState<errorConflictoI>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUsuariosI>();
  const openModal = async () => {
    try {
      if(token){
        const response = await listarRol(token);
        setRoles(response);
      }
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const onSubmit = async (data: FormUsuariosI) => {
    data.area = areasSeleccionada.map((item)=> item._id)    
    if (tipo === TipoE.SUCURSAL) {
      data.tipo = tipo
      delete data.area;
  } else if (tipo === TipoE.AREA) { 
    data.tipo = tipo
      delete data.sucursal;
  } else if (tipo === TipoE.NINGUNO) {
    data.tipo = tipo
      data.sinRelacion = true;
      delete data.sucursal;
      delete data.area;
  }
  
    try {
    if(token){
    
      const response = await crearUsuarios(data,token);
      if (response.status === HttpStatus.CREATED) {
        setMensaje(response.message);
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

  const tipoScursal=async()=>{
    setTipo(TipoE.SUCURSAL)
    setAreaSeleccionada([])
    try {
     if(token){
      const response = await listarEmpresa(token)
      setEmpresas(response)
     }
    } catch (error) {
      
    }

  }



  const tipoArea=async()=>{
    setTipo(TipoE.AREA)
  
    try {
        if(token){
          const response = await listarAreas(token)
          setAreas(response)
        }
    } catch (error) {
      
    }

  }
  const tipoNinguno=()=>{
    setAreaSeleccionada([])
    setTipo(TipoE.NINGUNO)
  }


  useEffect(()=>{
    if(empresaSeleccionado){
      sucursales()
    }
  },[empresaSeleccionado])

  const sucursales= async()=>{
    try {
      if(token){
        const response = await  listarSucursalEmpresa(empresaSeleccionado, token)
      setSucursales(response)
      }
  } catch (error) {
    console.log(error);
    
  }
  } 

  const areasSeleccionadas = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;
    const area = areas.filter((item) =>  target.value === item._id);
    if (area.length > 0) {
      const areaExistente = areasSeleccionada.some((item) => item._id === area[0]._id);
      if (!areaExistente) {
        setAreaSeleccionada((prevState) => [...prevState, ...area]);
      } 
    }
  }
  
  return (
    <div>
      <button
        onClick={openModal}
        className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Añadir usuario
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl">
            <button onClick={closeModal}>X</button>
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Formulario de Usuarios
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-4">
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
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {mensajeError.length > 0 &&
                    mensajeError.map((item) => {
                      if (item.propiedad === "ci") {
                        return item.errors.map((e) => (
                          <p key={item.propiedad} className="text-red-500">
                            {e}
                          </p>
                        ));
                      } else {
                        return null;
                      }
                    })}

                  {mensajeErrorConflito?.propiedad == "ci" && (
                    <p className="text-red-500">
                      {mensajeErrorConflito.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
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
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {mensajeError.length > 0 &&
                    mensajeError.map((item) => {
                      if (item.propiedad === "nombres") {
                        return item.errors.map((e) => (
                          <p key={item.propiedad} className="text-red-500">
                            {e}
                          </p>
                        ));
                      } else {
                        return null;
                      }
                    })}
                </div>

                <div className="mb-4">
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
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {mensajeError.length > 0 &&
                    mensajeError.map((item) => {
                      if (item.propiedad === "apellidos") {
                        return item.errors.map((e) => (
                          <p key={item.propiedad} className="text-red-500">
                            {e}
                          </p>
                        ));
                      } else {
                        return null;
                      }
                    })}
                </div>

                <div className="mb-4">
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
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {mensajeError.length > 0 &&
                    mensajeError.map((item) => {
                      if (item.propiedad === "username") {
                        return item.errors.map((e) => (
                          <p key={item.propiedad} className="text-red-500">
                            {e}
                          </p>
                        ));
                      } else {
                        return null;
                      }
                    })}
                  {mensajeErrorConflito?.propiedad == "username" && (
                    <p className="text-red-500">
                      {mensajeErrorConflito.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
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
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {mensajeError.length > 0 &&
                    mensajeError.map((item) => {
                      if (item.propiedad === "password") {
                        return item.errors.map((e) => (
                          <p key={item.propiedad} className="text-red-500">
                            {e}
                          </p>
                        ));
                      } else {
                        return null;
                      }
                    })}
                </div>

                <div className="mb-4">
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
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {mensajeError.length > 0 &&
                    mensajeError.map((item) => {
                      if (item.propiedad === "celular") {
                        return item.errors.map((e) => (
                          <p key={item.propiedad} className="text-red-500">
                            {e}
                          </p>
                        ));
                      } else {
                        return null;
                      }
                    })}
                </div>

                <div className="mb-4">
                  <p className="text-lg font-semibold mb-2">
                    Seleccione el tipo
                  </p>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="tipo"
                        id="sucursal"
                        onClick={()=>{
                          tipoScursal()
                        }}
                        className="form-radio text-blue-500 mr-2"
                      />
                      <label htmlFor="sucursal" className="text-md">
                        Sucursal
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="tipo"
                        id="area"
                        onClick={()=>{
                          tipoArea()
                        }}
                        className="form-radio text-blue-500 mr-2"
                      />
                      <label htmlFor="area" className="text-md">
                        Área
                      </label>

                
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="tipo"
                        id="area"
                        onClick={()=>{
                          tipoNinguno()
                        }}
                        className="form-radio text-blue-500 mr-2"
                      />
                      <label htmlFor="area" className="text-md">
                        Ninguno
                      </label>
                      
                    </div>
                 
                  </div>
                  {tipo === TipoE.NINGUNO && <p>Este usuario no pertenecera a niguna area o suscursal</p>}
                 <div>
                 {tipo === TipoE.AREA  &&  <select
                    {...register('area')}
                    onChange={areasSeleccionadas}
                    className="w-full p-2 border-2 border-gray-300 rounded-sm  focus:outline-none focus:ring-2"
                  >
                    <option>Seleccione su area</option>


                    {areas.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select> }


                
                 </div>
              
                 {tipo === TipoE.SUCURSAL  &&    <div> <select
      	            onChange={(e)=>{
                      const target = e.target as HTMLSelectElement
             
                        setEmpresaSeleccionado(target.value)
                      
                    }}
                    className="w-full p-2 border-2 border-gray-300 rounded-sm  focus:outline-none focus:ring-2"
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
                    className="w-full p-2 border-2 border-gray-300 rounded-sm  focus:outline-none focus:ring-2"
                  >
                    <option>Seleccione su sucursal</option>
                    {sucursal.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                  </div>
                 </div>}
                </div>

                <div className="w-full">
                  <select
                    {...register("rol")}
                    className="w-full p-2 border-2 border-gray-300 rounded-sm  focus:outline-none focus:ring-2"
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
                          <p key={item.propiedad} className="text-red-500">
                            {e}
                          </p>
                        ));
                      } else {
                        return null;
                      }
                    })}

                    
                    <div>
                    {  areasSeleccionada.map((item)=>{
                          return <p>{item.nombre} <button type="button"  onClick={()=>{
                            const areas = areasSeleccionada.filter((i ) => i._id != item._id)
                              setAreaSeleccionada(areas)
                          }} ><MdDelete /></button> </p> 
                        }) }
                    </div>
                </div>
                
              </div>
              
              {mensaje && <p>{mensaje}</p>}
              <div className="mt-6">
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
