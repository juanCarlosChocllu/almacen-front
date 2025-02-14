import { useParams } from "react-router-dom"
import { TablaTransferencias } from "../components/TablaTransferencias";

export const TransferenciasPageInformacion = () => {
  const {id}= useParams()

  
  return (
    <div> <TablaTransferencias id={id}/></div>
  )
}
