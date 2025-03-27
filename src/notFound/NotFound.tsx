export const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl text-gray-700 mt-4">Página no encontrada</p>
        <p className="text-sm text-gray-500 mt-2">Lo sentimos, la página que estás buscando no existe.</p>
        
        <div className="mt-6">
          <a 
            href="/" 
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
};
