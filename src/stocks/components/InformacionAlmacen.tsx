import { diasRestantes } from "../../core/utils/diasVencimiento";
import { StockVerificarI } from "../interfaces/stockInterface";

export const InformacionAlmacen = ({ stock }: { stock: StockVerificarI[]; }) => {
  return (
    <div className="bg-white p-4 rounded-lg w-96 mx-auto my-4">
      <h2 className="text-lg font-bold mb-3 text-center">Listado de Stock Existente</h2>
      <div className="mb-3 text-sm text-center">Este producto ya tiene almacen y stock</div>
      <div>
        <table className="min-w-full table-auto border-collapse text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-2 py-1 border text-sm">Almacén</th>
              <th className="px-2 py-1 border text-sm">Tipo</th>
              <th className="px-2 py-1 border text-sm">Cantidad</th>
              <th className="px-2 py-1 border text-sm">Fecha de Vencimiento</th>
              <th className="px-2 py-1 border text-sm">Dias restantes</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-2 py-1 text-sm">{item.almacen}</td>
                <td className="px-2 py-1 text-sm">{item.tipo}</td>
                <td className="px-2 py-1 text-sm">{item.cantidad}</td>
                <td className="px-2 py-1 text-sm">{item.fechaVencimiento}</td>
                <td className="px-2 py-1 text-sm">{diasRestantes(item.fechaVencimiento)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
