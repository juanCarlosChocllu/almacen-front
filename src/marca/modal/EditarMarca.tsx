import {  useContext, useEffect, useState } from "react";

import {editarMarca } from "../service/marcaApi";
import { errorPropiedadesI } from "../../core/interfaces/errorPropiedades";
import { formMarcaI } from "../interfaces/formMarcaInterface";
import { useForm } from "react-hook-form";

import { HttpStatus } from "../../core/enums/httStatusEnum";

import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { httAxiosError } from "../../core/utils/error.util";
import { errorClassValidator } from "../../core/utils/errorClassValidator";


export const EditarMarca = ({isOpen, closeModal, idMarca,marca, recargar, setRecargar}:{setRecargar:(recargar:boolean)=>void,recargar:boolean,isOpen:boolean, closeModal:()=>void, idMarca:string, marca:string}) => {
const {token}=useContext(AutenticacionContext)
  const { register, handleSubmit , setValue} = useForm<formMarcaI>();
  const [mensaje, setMensaje] = useState<string>();
  const [mensajePropiedades, setMensajePropiedades] = useState<errorPropiedadesI[]>([]);
    useEffect(()=>{
        if(isOpen){
            setValue('nombre', marca)
        }
    },[idMarca])

  const onSudmit = async(data:formMarcaI)=>{     
        try {
            if(token){
                const response = await editarMarca(data, token, idMarca)   
                console.log(response);
                     
            if(response.status === HttpStatus.OK){
                setRecargar(!recargar)
                closeModal()
            }   
            }    
        } catch (error) {
            const e =  httAxiosError(error)
            if(e.response.status == HttpStatus.CONFLICT){
                setMensaje(e.response.data.message)
            }else if (e.response.status == HttpStatus.BAD_REQUEST){
                setMensajePropiedades(errorClassValidator(e.response.data.errors))
            }

            
        }
  }
  return (
    <div className="p-4">
  

    {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Crear Nueva Marca</h2>
                <form onSubmit={handleSubmit(onSudmit)}>
                    <div className="mb-4">
                        <label
                            htmlFor="nombre"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nombre de la Marca
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            {...register("nombre")}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    {mensajePropiedades.length > 0 &&
                        mensajePropiedades.map((item) => {
                            if (item.propiedad === "nombre") {
                                return item.errors.map((e) => (
                                    <p key={item.propiedad}>{e}</p>
                                ));
                            } else {
                                return null;
                            }
                        })}

                   
                    {mensaje && <p>{mensaje}</p>}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
