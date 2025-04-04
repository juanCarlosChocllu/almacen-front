import { useState } from "react";

import { proveedorEmpresaI } from "../../proveedorEmpresa/interface/proveedorEmpresaInterface";
import { proveedorPersonaI } from "../../proveedorPersona/interfaces/proveedorPersonaInterface";
import { ListarProveedorPersona } from "../../proveedorPersona/modal/ListarProveedorPersona";
import { ListarProveedorEmpresa } from "../../proveedorEmpresa/modal/ListarProveedorEmpresa";

export const MostrarProveedores = ({
  isOpen,
  closeModal,
  proveedorEmpresaSeleccionado,
  proveedorPersonaSeleccionado,
}: {
  isOpen: boolean;
  closeModal: () => void;
  proveedorPersonaSeleccionado: (proveedor: proveedorPersonaI) => void;
  proveedorEmpresaSeleccionado: (proveedor: proveedorEmpresaI) => void;
}) => {
  const [proveedorEmpresa, setproveedorEmpresa] = useState<Boolean>(false);
  const [proveedorPersona, setproveedorPersona] = useState<Boolean>(true);


  const mostrarProveedorPersona = () => {
    setproveedorPersona(true);
    setproveedorEmpresa(false);
  };

  const mostrarProveedorEmpresa = () => {
    setproveedorEmpresa(true);
    setproveedorPersona(false);
  };

  const proveedoresEmpresa = (proveedor: proveedorEmpresaI) => {
    proveedorEmpresaSeleccionado(proveedor);
    closeModal();
  };

  const proveedoresPersona = (proveedor: proveedorPersonaI) => {
    proveedorPersonaSeleccionado(proveedor);

    closeModal();
  };


  return (
    <>
      {isOpen && (
        
        <div className="fixed inset-0  bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white p-1 rounded-md shadow-lg max-w-7xl w-700 ">
            <button
              onClick={closeModal}
              className="top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>

            <div className="flex flex-row justify-center gap-4">
              <button
                onClick={() => {
                  mostrarProveedorPersona();
                }}
                className="w-36 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Proveedor Persona
              </button>
          
              <button

                onClick={() => mostrarProveedorEmpresa()}
                className="w-36 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition duration-300"
              >
                Proveedor Empresa
              </button>
            </div>
            {proveedorEmpresa && (
              <ListarProveedorEmpresa proveedorEmpresa={proveedoresEmpresa} />
            )}
            {proveedorPersona && (
              <ListarProveedorPersona proveedorPersona={proveedoresPersona} />
            )}
          </div>
        </div>
      )}
    </>
  );
};
