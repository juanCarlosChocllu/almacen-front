import { useParams } from "react-router-dom"
import { ListarTransferenciasPorCodigoArea } from "../components/ListarTransferenciasPorCodigoArea"



export const TransferenciasPageInformacion = () => {
  const {id}= useParams()

  
  return (
    <div> <ListarTransferenciasPorCodigoArea id={id}/></div>
  )
}
