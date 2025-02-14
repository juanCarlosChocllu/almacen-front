import { FaImage } from 'react-icons/fa';

export const MostrarImagenes = ({ url }: { url: string }) => {
  return (
    <div className="flex flex-col items-center">
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        <FaImage />
      </button>
      
    
      <img 
        src={`${import.meta.env.VITE_BACKEND_API}/${url}`} 
        alt="Imagen"
        className="w-[300px] h-[300px] object-contain mt-4"
      />
    </div>
  );
};
