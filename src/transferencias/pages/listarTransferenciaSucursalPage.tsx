
import { useParams } from 'react-router-dom'
import { ListarTransferenciaPorCodigoSucursal } from '../components/ListarTransferenciaPorCodigoSucursal'

export const listarTransferenciaSucursalPage = () => {
    const {id}= useParams()

  return (
<>   <ListarTransferenciaPorCodigoSucursal id={id}  /></>
  )
}

