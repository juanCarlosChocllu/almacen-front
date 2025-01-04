import { useForm } from "react-hook-form";
import { LoginI } from "../interface/loginInterface";
import { login } from "../services/autenticacionApi";
import { HttpStatus } from "../../enums/httStatusEnum";
import { useContext, useState } from "react";
import { AutenticacionContext } from "../context/crear.autenticacion.context";
import { httAxiosError } from "../../utils/error/error.util";

export const Login = () => {
    const  { register, handleSubmit, formState:{errors}}= useForm<LoginI>()
    const [mensaje, setMensaje]= useState<string>()
     const {asignarToken} =useContext(AutenticacionContext)
    const onSubmit= async(data:LoginI)=>{
        try {
          const response = await login(data)
          if(response.status === HttpStatus.OK){
             asignarToken(response.token)
             window.location.href='/bienvenido'
          }
          
        } catch (error) {
          const e = httAxiosError(error)
          
          if(e.response.data.statusCode == HttpStatus.UNAUTHORIZED){
            setMensaje(e.response.data.message)
          }
          
        }
        
    }
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Iniciar sesión
          </h2>
         <form  onSubmit={handleSubmit(onSubmit)}   >
         <div className="space-y-4">
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-gray-700">Usuario</label>
              <input
                type="text"
                id="text"
                {...register('username', {validate:(value)=>{
                  if(!value){
                    return 'Ingrese su usuario'
                  }
                  return true
                }})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Ingrese su usuario"
              />
                    {errors.username && <p> {errors.username.message} </p>}
            </div>
  
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                id="password"
                {...register('password',{validate:(value)=>{
                  if(!value){
                    return 'Ingrese su contrasena'
                  }
                  return true
                }})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Ingrese su contraseña"
              />
              {errors.password && <p> {errors.password.message} </p>}
            </div>
                {mensaje && <p>{mensaje}</p>}
            <div>
              <button
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Iniciar sesión
              </button>
            </div>
  
            <div className="text-center mt-4">
              <button
              type="submit"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>

         </form>
        </div>
      </div>
    );
  };
  