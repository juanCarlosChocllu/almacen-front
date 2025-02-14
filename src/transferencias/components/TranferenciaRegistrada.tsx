import { FaTrash } from "react-icons/fa";
import { registrarTranferenciaI } from "../core/interface/registrarTransferenciaInterface";

export const TranferenciaRegistrada = ({
  data,
  eliminarData,
}: {
  data: registrarTranferenciaI[];
  eliminarData: (data: registrarTranferenciaI[]) => void;
}) => {  
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">
        Transferencia Registrada
      </h2>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Cód.</th>
            <th className="px-4 py-2 border-b">Nom. Emp.</th>
            <th className="px-4 py-2 border-b">Nom. Suc.</th>
            <th className="px-4 py-2 border-b">Alm. Origen</th>
            <th className="px-4 py-2 border-b">Alm. Dest.</th>
            <th className="px-4 py-2 border-b">Producto</th>
            <th className="px-4 py-2 border-b">Cantidad</th>
            <th className="px-4 py-2 border-b">Tipo</th>
            <th className="px-4 py-2 border-b">Acción</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b text-sm">{item.codigoProducto}</td>
              <td className="px-4 py-2 border-b text-sm">{item.nombreEmpresa}</td>
              <td className="px-4 py-2 border-b text-sm">{item.nombreSucursal}</td>
              <td className="px-4 py-2 border-b text-sm">{item.nombreAlmacenArea}</td>
              <td className="px-4 py-2 border-b text-sm">{item.nombreAlmacen}</td>
              <td className="px-4 py-2 border-b text-sm">{item.producto}</td>
              <td className="px-4 py-2 border-b text-sm">{item.cantidad}</td>
              <td className="px-4 py-2 border-b text-sm">{item.tipo}</td>

              <td>
                <button
                  className="text-center"
                  onClick={() => {
                    const eliminar = data.filter((i) => i.uuid != item.uuid);
                    eliminarData(eliminar);
                  }}
                >
                  <FaTrash className="text-red-500 hover:text-red-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
