import { useParams } from "react-router-dom"
import {EditarTransferenciaRechazada} from "../components/EditarTransferenciaRechazada"

export const EditarTransferenciaRechazadaPage = () => {
    const {id}= useParams()
  return (
    <>{id && <EditarTransferenciaRechazada id={id}/>}</>
  )
}

