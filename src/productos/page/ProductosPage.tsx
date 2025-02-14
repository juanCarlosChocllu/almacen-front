
import { TablaProductos } from "../components/TablaProductos.tsx"
import { FormularioProducto } from "../modal/FormularioProducto.tsx"

export const ProductosPage = () => {
  return (
   <>
   {<FormularioProducto/>}
    {<TablaProductos/>}
   </>
  )
}
