import { PermisosI } from "../../interfaces/permisoInterface";

export const Permisos = ({
  permisos,
  isModalOpen,
  setIsModalOpen,
}: {
  permisos: PermisosI[];
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}) => {
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-w-4xl space-y-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-center text-blue-600">
              Detalles del Permiso
            </h2>
            <p className="text-center text-gray-700">
              Aquí puedes administrar los permisos.
            </p>

            {/* Muestra los permisos en 3 columnas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {permisos.map((item, index) => (
                <div
                  key={index}
                  className="space-y-4 p-4 border rounded-lg shadow-sm"
                >
                  <div className="space-y-2">
                    <p className="font-medium text-gray-800">Módulo:</p>
                    <p className="text-blue-500">{item.modulo}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium text-gray-800">Acciones:</p>
                    <ul className="list-disc pl-6 text-gray-700">
                      {item.acciones.map((accion, i) => (
                        <li key={i}>{accion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
