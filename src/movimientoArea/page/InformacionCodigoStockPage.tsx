
import { useParams } from "react-router-dom"
import { TablaInformacionStockCodigo } from "../components/TablaInformacionStockCodigo"

export const InformacionCodigoStockPage = () => {
    const {id} = useParams()
  return (
   <> {id && <TablaInformacionStockCodigo  id={id} /> }</>
  )
}
