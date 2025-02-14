import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formProveedorPersonaI } from '../../interfaces/formProveedorPersonaInterface';
import { crearProveedorPersonas } from '../../services/proveedorPersonaApi';
import { HttpStatus } from '../../../core/enums/httStatusEnum';

import { errorPropiedadesI } from '../../../core/interfaces/errorPropiedades';

import { AutenticacionContext } from '../../../autenticacion/context/crear.autenticacion.context';
import { errorClassValidator } from '../../../core/utils/errorClassValidator';
import { httAxiosError } from '../../../core/utils/error.util';

export const FormProveedorPersona = () => {
    const { register, handleSubmit}= useForm<formProveedorPersonaI>()
  const [isOpen, setIsOpen] = useState(false);
  const [mensaje, setMensaje] = useState<string>('');
  const [conflictCi, setConflictCi] = useState<string>('');
    const [mensajePropiedades, setMensajePropiedades] = useState<
      errorPropiedadesI[]
    >([]);
        const {token} =useContext(AutenticacionContext)
  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const onSubmit = async(data:formProveedorPersonaI)=>{
    try {
        if(token){
          const response = await crearProveedorPersonas(data, token)
        if(response.status == HttpStatus.CREATED){
            setMensaje(response.message)
            setMensajePropiedades([])
        }
        }
    } catch (error) {      
      const e=httAxiosError(error)
        if(e.response.status == HttpStatus.BAD_REQUEST){
          setMensajePropiedades(errorClassValidator(e.response.data.errors))
        }else if(e.response.status == HttpStatus.CONFLICT){          
          setConflictCi(e.response.data.message)
          setMensajePropiedades([])
        }
        
    }

  }
  return (
    <div>
      <button 
        onClick={openModal} 
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Añadir proveedor
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Formulario de Proveedor Persona</h2>
              <button 
                onClick={closeModal} 
                className="text-xl font-bold text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="mb-4">
                <label htmlFor="ci" className="block text-sm font-medium text-gray-700">CI:</label>
                <input
                  type="text"
                  id="ci"
                  {...register('ci')}
                  
                  placeholder="Ingresa tu CI"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                />
                 {mensajePropiedades.length > 0 &&
                mensajePropiedades.map((item) => {
                  if (item.propiedad === "ci") {
                    return item.errors.map((e) => (
                      <p key={item.propiedad}>{e}</p>
                    ));
                  } else {
                    return null;
                  }
                })}
                {conflictCi && <span>{conflictCi}</span>}
              </div>
              <div className="mb-4">
                <label htmlFor="nit" className="block text-sm font-medium text-gray-700">NIT:</label>
                <input
                  type="text"
                  id="nit"
                  {...register('nit')}
                  
                  placeholder="Ingresa el NIT"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                />
                 {mensajePropiedades.length > 0 &&
                mensajePropiedades.map((item) => {
                  if (item.propiedad === "nit") {
                    return item.errors.map((e) => (
                      <p key={item.propiedad}>{e}</p>
                    ));
                  } else {
                    return null;
                  }
                })}
              </div>
              
              <div className="mb-4">
                <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">Nombres:</label>
                <input
                  type="text"
                  id="nombres"
                  {...register('nombres')}
                  
                  placeholder="Ingresa tus nombres"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                />
                 {mensajePropiedades.length > 0 &&
                mensajePropiedades.map((item) => {
                  if (item.propiedad === "nombres") {
                    return item.errors.map((e) => (
                      <p key={item.propiedad}>{e}</p>
                    ));
                  } else {
                    return null;
                  }
                })}
              </div>
              
              <div className="mb-4">
                <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">Apellidos:</label>
                <input
                  type="text"
                  id="apellidos"
                  {...register('apellidos')}
                  
                  placeholder="Ingresa tus apellidos"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                />
                 {mensajePropiedades.length > 0 &&
                mensajePropiedades.map((item) => {
                  if (item.propiedad === "apellidos") {
                    return item.errors.map((e) => (
                      <p key={item.propiedad}>{e}</p>
                    ));
                  } else {
                    return null;
                  }
                })}
              </div>
              
             

              <div className="mb-4">
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo Electrónico:</label>
                <input
                  type="email"
                  id="correo"
                  {...register('correo')}
                  
                  placeholder="Ingresa tu correo electrónico"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                />
                   {mensajePropiedades.length > 0 &&
                mensajePropiedades.map((item) => {
                  if (item.propiedad === "correo") {
                    return item.errors.map((e) => (
                      <p key={item.propiedad}>{e}</p>
                    ));
                  } else {
                    return null;
                  }
                })}
              </div>

            
              
              <div className="mb-4">
                <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">Ciudad:</label>
                <input
                  type="text"
                  id="ciudad"
                  {...register('ciudad')}
                  
                  placeholder="Ingresa tu ciudad"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                />
                      {mensajePropiedades.length > 0 &&
                mensajePropiedades.map((item) => {
                  if (item.propiedad === "ciudad") {
                    return item.errors.map((e) => (
                      <p key={item.propiedad}>{e}</p>
                    ));
                  } else {
                    return null;
                  }
                })}
              </div>

              <div className="mb-4">
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección:</label>
                <input
                  type="text"
                  id="direccion"
                  {...register('direccion')}
                  
                  placeholder="Ingresa tu dirección"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                />
                       {mensajePropiedades.length > 0 &&
                mensajePropiedades.map((item) => {
                  if (item.propiedad === "direccion") {
                    return item.errors.map((e) => (
                      <p key={item.propiedad}>{e}</p>
                    ));
                  } else {
                    return null;
                  }
                })}
              </div>

              <div className="mb-4">
                <label htmlFor="celular" className="block text-sm font-medium text-gray-700">Número de Celular:</label>
                <input
                  type="text"
                  id="celular"
                  {...register('celular')}
                  
                  placeholder="Ingresa tu número de celular"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                />
                     {mensajePropiedades.length > 0 &&
                mensajePropiedades.map((item) => {
                  if (item.propiedad === "celular") {
                    return item.errors.map((e) => (
                      <p key={item.propiedad}>{e}</p>
                    ));
                  } else {
                    return null;
                  }
                })}
              </div>
                {mensaje && <span>{mensaje}</span>}
              <div className='flex justify-center col-span-2 mt-4'>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
