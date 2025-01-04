export const BuscadorStockSucursal = () => {
    return (
      <div className="p-4">
        <form className="flex space-x-4 items-center">
          <div className="flex flex-col">
            <label htmlFor="codigo">Código</label>
            <input type="text" name="codigo" id="codigo" className="border p-2" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="almacen">Almacén</label>
            <select name="almacen" id="almacen" className="border p-2">
              <option value="">Seleccione el Almacén</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="marca">Marca</label>
            <select name="marca" id="marca" className="border p-2">
              <option value="">Seleccione la Marca</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="venta">Venta</label>
            <select name="venta" id="venta" className="border p-2">
              <option value="">Seleccione la Venta</option>
            </select>
          </div>
          <div className="flex flex-col">
            <button type="submit" className="bg-blue-500 text-white p-2">Buscar</button>
          </div>
        </form>
      </div>
    );
  };
  