import{ useState } from 'react';
import { FaImage } from 'react-icons/fa';

export const MostarImagenes = ({url}:{url:string}) => {
  const [isOpen, setIsOpen] = useState(false); 

  const abrirModal = () => {
    setIsOpen(true);
  };

  const cerrarModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
    <button 
      onClick={abrirModal} 
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      <FaImage />
    </button>
    
    {isOpen && (
      <div 
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
        onClick={cerrarModal}
      >
        <div 
          className="relative bg-white p-6 rounded-lg max-w-[90%] max-h-[80%] flex flex-col justify-center items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={cerrarModal} 
            className="absolute top-4 right-4 bg-transparent text-xl text-black hover:text-gray-600"
          >
            Cerrar
          </button>
          <img 
            src={`${import.meta.env.VITE_BACKEND_API}/${url}`} 
            alt="Imagen Modal" 
            className="w-[300px] h-[300px] object-contain" 
          />
        </div>
      </div>
    )}
  </div>
  
  );
};
