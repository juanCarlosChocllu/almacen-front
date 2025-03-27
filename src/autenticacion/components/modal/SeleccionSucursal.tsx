

export const SeleccionSucursal = ({isModalOpen,closeModal}:{isModalOpen:boolean,closeModal():void }) => {
 

  return (
    <div>
      
      
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold mb-4">Selecciona una Sucursal</h2>
            <p className="mb-4">Elige una sucursal de la lista:</p>
            <ul className="space-y-2 mb-4">
              <li className="cursor-pointer hover:bg-gray-100 p-2 rounded-md">Sucursal 1</li>
              <li className="cursor-pointer hover:bg-gray-100 p-2 rounded-md">Sucursal 2</li>
              <li className="cursor-pointer hover:bg-gray-100 p-2 rounded-md">Sucursal 3</li>
            </ul>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
