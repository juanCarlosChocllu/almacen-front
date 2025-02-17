

export const AlertaConfirmacion = ({
  mensaje,
  isOpen,
  setConfirmacion,
}: {
  mensaje: string;
  isOpen: boolean;
  setConfirmacion: (data: boolean) => void;
}) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-xl font-semibold text-center mb-4">Confirmación</h3>
          <p className="text-center mb-4">{mensaje}</p>
          <div className="flex justify-around">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={() => setConfirmacion(false)} 
            >
              Cancelar
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              onClick={() => setConfirmacion(true)} 
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    )
  );
};
