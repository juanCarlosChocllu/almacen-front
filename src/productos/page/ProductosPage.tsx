
import { FormularioProducto } from "../components/modal/FormularioProducto.tsx"
import { TablaProductos } from "../components/TablaProductos.tsx"

export const ProductosPage = () => {
  return (
   <>
   {<FormularioProducto/>}
    {<TablaProductos/>}
   </>
  )
}
