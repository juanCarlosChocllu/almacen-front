import { useContext, useEffect, useState } from "react"
import { almacenAreaI } from "../interfaces/almacenAreaInterface"
import { elimarAlmacenArea, listarAlmacenArea } from "../services/almacenAreaService"
import { FaEdit, FaTrash } from "react-icons/fa"
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context"
import { CrearAlmacenArea } from "../modal/CrearAlmacenArea"
import { HttpStatus } from "../../core/enums/httStatusEnum"
import { alertaDeEliminacion } from "../../core/utils/alertaEliminacion"
import { EditarAlmacenAreaModal } from "../modal/EditarAlmacenAreaModal"

export const ListarAlmacenArea = () => {
  const [recargarData, setRecargarData] = useState<boolean>(false)
  const { token } = useContext(AutenticacionContext)
  const [almacenArea, setAlmacenArea] = useState<almacenAreaI[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [idAlmacen, setIdAlmacen] = useState<string>()
  const [area, setArea] = useState<string>()
  const [almacen, setAlmacen] = useState<string>()
  const closeModal = () => setIsOpen(false)
  useEffect(() => {
    listaDeAlmacenArea()
  }, [recargarData])

  const listaDeAlmacenArea = async () => {
    try {
      if (token) {
        const response = await listarAlmacenArea(token)
        setAlmacenArea(response)
      }
    } catch (error) {

    }

  }

  const eliminar = async (id: string) => {
    try {
      if (token) {
        const response = await elimarAlmacenArea(token, id)
        if (response.status == HttpStatus.OK) {
          setRecargarData(!recargarData)
        }
      }
    } catch (error) {

    }
  }
console.log(idAlmacen , idAlmacen, area ,almacen);

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">

      <CrearAlmacenArea recargarData={recargarData} setRecargarData={setRecargarData} />


      <table className="min-w-full table-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Nombre</th>
            <th className="px-6 py-3 text-left">Area</th>
            <th className="px-6 py-3 text-left">Accion</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {almacenArea.map((item) => (
            <tr key={item._id} className="hover:bg-gray-100">
              <td className="px-6 py-4"> {item.nombre}</td>
              <td className="px-6 py-4">{item.nombreArea}</td>
              <td className="px-4 py-2 flex gap-2">
                <button onClick={() => alertaDeEliminacion(() => eliminar(item._id))} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none flex items-center">
                  <FaTrash className="mr-2" />
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none flex items-center">
                  <FaEdit onClick={() => {
                    setIdAlmacen(item._id)
                    setAlmacen(item.nombre)
                    setArea(item.area)
                    setIsOpen(true)
                  }} className="mr-2" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {almacen && idAlmacen && area && almacen && <EditarAlmacenAreaModal
        closeModal={closeModal}
        idArea={area}
        isOpen={isOpen}
        nombreAlmacen={almacen}
        recargar={recargarData}
        setRecargar={setRecargarData}
        idAlmacen={idAlmacen}

      />}
    </div>
  )
}
