import { useEffect, useState } from "react";


import { ModalPropsI } from "../../../core/interfaces/modalProps.Interface";
import { marcaI } from "../../interfaces/marcaInterface";
import { listarMarcas } from "../../service/marcaApi";
import { errorPropiedadesI } from "../../../core/interfaces/errorPropiedades";


export const ModalMarca = ({isOpen ,closeModal}:ModalPropsI) => {
  const [marca, setMarca] = useState<marcaI[]>([]);   

  useEffect(() => {
    const listarM = async () => {
      try {
        const response = await listarMarcas();
        console.log(response);
        setMarca(response);
      } catch (error) {
        console.log(error);
      }
    };
    listarM();
  }, []);
  return (
    <>
    {isOpen &&   <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
          <button
            onClick={closeModal}
            className="top-2 right-2 text-gray-600"
          >
            ✖
          </button>
          <h2 className="text-2xl font-semibold mb-4">Lista de Marcas</h2>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">

                <th className="px-4 py-2 border border-gray-300">Marca</th>
           
              </tr>
            </thead>
            <tbody>
              {marca.map((item) => (
                <tr
                 key={item._id} className="hover:bg-gray-100"
                    onClick={()=>{
                        console.log(item._id);
                        
                    }}
                 >
            
                  <td className="px-4 py-2 border border-gray-300">{item.nombre}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}
    </>
  );
};
