
import { useParams } from 'react-router-dom'
import { RecibirTransferenciaSucursal } from '../components/RecibirTransferenciaSucursal'

export const listarTransferenciaSucursalPage = () => {
    const {id}= useParams()

  return (
<>  {id  &&  <RecibirTransferenciaSucursal  id={id} /> }</>
  )
}

