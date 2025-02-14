import { useContext, useEffect, useState } from 'react';
import { actualizarDetalleArea, listarDetalleAreaPorUsuario } from '../../../detalleArea/services/detalleAreaApi';
import { AutenticacionContext } from '../../../autenticacion/context/crear.autenticacion.context';
import { DetalleAreaI } from '../../../core/interfaces/detalleArea';
import { useForm } from 'react-hook-form';
import { SeleccionAreaI } from '../../../detalleArea/interfaces/selececcionArea';
import { ActualizarDetalleI } from '../../../detalleArea/interfaces/actulizarArea';
import { PermisosContext } from '../../../autenticacion/context/permisos.context';
import { HttpStatus } from '../../../core/enums/httStatusEnum';

export const SeleccionDetalle = () => {
  const {tipo}=useContext(PermisosContext)
  const [isOpen, setIsOpen] = useState(true); 
  const {token}= useContext(AutenticacionContext)
  const [areas, setAreas]=useState<DetalleAreaI[]>([])
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const {register, handleSubmit , formState:{errors}} =useForm<SeleccionAreaI>()
  

  useEffect(()=>{
    if(isOpen){
      detalleArea()

    }
  

  },
  [])

  
  const detalleArea =async()=>{
    try {
       if(token){
        const response= await listarDetalleAreaPorUsuario(token)       
        setAreas(response)
       }
    } catch (error) {
      console.log(error);
      
    }
  }
  const onsubmit =async (data:SeleccionAreaI)=>{

    const newData :ActualizarDetalleI={
         detalleArea :data._id
    }
     try {
        if(token){
          const response = await actualizarDetalleArea(newData, token)
            if(response.status == HttpStatus.OK) {
              window.location.reload()
            }
          
        }
     } catch (error) {
        console.log(error);
        
     }
    
  }
  return (
    <div>
    <button
      onClick={openModal}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition duration-300"
    >
      Seleccionar Área
    </button>
  
    {isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 opacity-100">
        <div className="bg-white p-8 rounded-xl shadow-xl w-96 max-w-sm">
          <form onSubmit={handleSubmit(onsubmit)}>
            <h2 className="text-3xl font-semibold text-center text-gray-800">Seleccionar Área</h2>
            <p className="mt-4 text-gray-600 text-center">Por favor, selecciona el área que deseas.</p>
  
            <select 
              {...register('_id', {validate:(value)=>{
                if(!value){
                  return 'Seleccione una area'
                }
                return true
              }})}
              name="_id"
              id="area-select"
              className="mt-6 w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value=''>Seleccione el área</option>
              {areas.map((item) => (
                <option key={item._id} value={item._id}>{item.area}</option>
              ))}
            </select>
  
            {errors._id && <p className="text-red-500 text-center mt-2">{errors._id.message}</p>}
  
            <div className="flex justify-center space-x-4 mt-6">
            <button 
                type="submit"
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Seleccionar
              </button>
              <button 
                type="button"  
                onClick={closeModal} 
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
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
