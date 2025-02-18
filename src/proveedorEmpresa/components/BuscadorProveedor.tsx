
import {SetBuscadorProveedorDataI,  } from "../interface/buscadorProveedor";


export const BuscadorProveedor = ({celular,nit,nombre}:SetBuscadorProveedorDataI) => {

  return (
    <div>
      <form className="space-y-4">
        <div className="flex space-x-4">
          

          <div className="w-1/3">
            <label htmlFor="nombre" className="block text-gray-700 font-semibold">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              placeholder="Ingrese el nombre"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e)=> {
                const target = e.target as HTMLInputElement
                nombre(target.value)    
            }}
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="ci" className="block text-gray-700 font-semibold">
              Nit
            </label>
            <input
                onChange={(e)=> {
                    const target = e.target as HTMLInputElement
                    nit(target.value)    
                }}
              type="text"
              id="ci"
              placeholder="Ingrese el CI"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          
            />
          </div>

          <div className="w-1/3">
            <label htmlFor="celular" className="block text-gray-700 font-semibold">
              Celular
            </label>
            <input
              type="text"
              id="celular"
              placeholder="Ingrese el celular"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e)=> {
                const target = e.target as HTMLInputElement
                celular(target.value)    
            }}
            />
          </div>
        </div>
        
      </form>
    </div>
  );
};
