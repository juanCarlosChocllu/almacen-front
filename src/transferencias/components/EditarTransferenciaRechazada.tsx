import { useContext, useEffect, useState } from "react"
import { transferenciasI } from "../interface/transferenciasInterface"
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context"
import { transferenciasPorCodigo } from "../services/codigoTransferenciasService"
import { MdDelete } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { EditarTrasnferenciaModal } from "../modal/EditarTransferenciaModal"

export const EditarTransferenciaRechazada = ({id}:{id:string}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [recardarDAta, setRecargarData] =useState<boolean>(false)
  const [transferencia, setTransferencia] = useState<string>(); 
  const [codigo, setCodigo] = useState<string>(); 
  const [producto, setProducto] = useState<string>(); 
  const [idSucursal, setIdSucursal] = useState<string>(); 
  const [idAlmacenSucursal, setIdAlmacenSucursal] = useState<string>(); 
  const [cantidad, setCantidad] = useState<number>(0); 
const [data, setData] = useState<transferenciasI[]>([])
    const {token}=useContext(AutenticacionContext)
    useEffect(()=>{
      transferencias()
    },
    [id,recardarDAta])

    
    const transferencias = async()=>{        
        try {
            if(id && token){
                const response = await transferenciasPorCodigo(id, token)
                setData(response)
                
            }
            
        } catch (error) {
                console.log(error);
                
        }
    } 

    const closeModal =()=>{
      setIsModalOpen(false)
    }

    const editar=(transferencia:string, sucursal:string, almacen:string, cantidad:number, codigo:string , producto:string)=>{
        console.log(codigo  );
        
      setTransferencia(transferencia)
      setIdSucursal(sucursal)
      setCantidad(cantidad)
      setIdAlmacenSucursal(almacen)
      setProducto(producto)
      setCodigo(codigo)
      setIsModalOpen(true)
    }
  return (
    <div>
        <h1 className='text-center'>Listado de transferencias areas</h1>
        <table className="min-w-full table-auto border-collapse text-xs">
   
    <thead className="bg-gray-800 text-white">
        <tr className="bg-gray-800 text-white">
          <th className="px-4 py-2 border-b">Código</th>
          <th className="px-4 py-2 border-b">Producto</th>
          <th className="px-4 py-2 border-b">Color</th>
          <th className="px-4 py-2 border-b">Marca</th>
          <th className="px-4 py-2 border-b">Cantidad</th>
          <th className="px-4 py-2 border-b">Tipo</th>
          <th className="px-4 py-2 border-b">Sucursal Destino</th>
          <th className="px-4 py-2 border-b">Almacén Destino</th>
          <th className="px-4 py-2 border-b">fecha</th>
          <th className="px-4 py-2 border-b">Estado</th>
          <th className="px-4 py-2 border-b">Accion</th>
        </tr>
      </thead>
      <tbody>
        {data.map((transferencia, i) => (
          <tr key={i} className="hover:bg-gray-100">
            <td className="px-4 py-2 border-b">{transferencia.codigo}</td>
            <td className="px-4 py-2 border-b">{transferencia.producto}</td>
            <td className="px-4 py-2 border-b">{transferencia.color}</td>
            <td className="px-4 py-2 border-b">{transferencia.marca}</td>
            <td className="px-4 py-2 border-b">{transferencia.cantidad}</td>
            <td className="px-4 py-2 border-b">{transferencia.tipo}</td>
            <td className="px-4 py-2 border-b">{transferencia.sucursal}</td>
            <td className="px-4 py-2 border-b">{transferencia.almacenSucursal}</td>
            <td className="px-4 py-2 border-b">{transferencia.fecha}</td>
            <td className="px-4 py-2 border-b">{transferencia.estado}</td>
            <td className="px-4 py-2 border-b"><button><MdDelete /></button>  <button onClick={()=> editar(transferencia._id, transferencia.idSucursal, transferencia.idAlmacenSucursal, transferencia.cantidad, transferencia.codigo , transferencia.producto)}><FaEdit /></button></td>
         
          </tr>
        ))}
      </tbody>
    </table>
        <div className="text-center">
          <button className="bg-green-600  p-1 rounded-sm text-white mr-10">REENVIAR</button>
          <button className="bg-red-600  p-1 rounded-sm text-white">ACEPTAR</button>
        </div>


        {isModalOpen &&  transferencia && idAlmacenSucursal && idSucursal &&  cantidad >= 0  && codigo && producto &&<EditarTrasnferenciaModal closeModal={closeModal} isModalOpen={isModalOpen} transferencia={transferencia} idAlmacen={idAlmacenSucursal} idSusursal={idSucursal}  cantidad={cantidad} recargarDara={recardarDAta} setRecargarData={setRecargarData}  codigo={codigo} producto={producto}/> }
    </div>
   
  )
}



