import React, { useContext } from 'react';
import { SeleccionDetalle } from '../modal/SeleccionDetalle';
import { PermisosContext } from '../../../autenticacion/context/permisos.context';
import { TipoE } from '../../../usuarios/enums/tipo.enum';

export const HomePage = () => {
  const { tipo } = useContext(PermisosContext);

  return (
    <div className="p-6 font-sans">
   
      <h1 className="text-4xl text-center text-green-600 font-semibold mb-4">
        ¡Bienvenido a la página principal!
      </h1>

   
    

 
      {tipo === TipoE.AREA && (
        <div className="mt-8">
          <h2 className="text-2xl text-center text-gray-800 font-medium mb-4">
            Selecciona un área para continuar:
          </h2>
          <SeleccionDetalle />
        </div>
      )}
    </div>
  );
};
