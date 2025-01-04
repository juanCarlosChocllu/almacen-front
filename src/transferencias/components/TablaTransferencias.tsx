import { useContext, useEffect, useState } from "react";
import { transferenciasI } from "../interface/transferenciasInterface";
import { listarTransferencias } from "../services/transferenciaApi";
import { Paginas } from "../../utils/components/Paginas";
import { Paginador } from "../../utils/components/Paginador";
import { BuscadorTransferencia } from "./BuscadorTransferencia";
import { BuscadorTransFerenciaI } from "../interface/buscadorTransferencia";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";


export const TablaTransferencias = () => {
   const {token}=useContext(AutenticacionContext)
    const [transferencias, setTransferencias] = useState<transferenciasI[]>([])
    const [paginas, setpaginas] = useState<number>(0)
    const [limite, setcanitdaditem] = useState<number>(10)
    const [selectPagina, setSelectPagina] = useState<number>(1)
    const [buscadorTransferencia, setBuscadorTransferencia] =useState<BuscadorTransFerenciaI>({
      almacenSucursal:null,
      codigo:null,
      fechaFin:null,
      fechaInicio:null,
      marca:null,
      sucursal:null,
      tipo:null
    })
    
    useEffect(()=>{
        transferenciasList()
    },[paginas, limite, selectPagina, buscadorTransferencia])


    const transferenciasList=async()=>{
        try {
          if(token){
            const response = await listarTransferencias(selectPagina, limite, buscadorTransferencia, token)            
            setTransferencias(response.data)
            setpaginas(response.paginas)
          }

           
        } catch (error) {
   
            
        }
    }
  const cantidadItem=(cantidad:string)=>{
    setcanitdaditem(Number(cantidad))
  }
  const paginaSeleccionada=(pagina:number)=>{
    setSelectPagina(pagina)

  }
 const  onsubmit = (data:BuscadorTransFerenciaI)=>{
  setBuscadorTransferencia(data)
  
 }
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tabla de Transferencias</h2>
    <BuscadorTransferencia onsudmit={onsubmit}/>
    {<Paginas page={cantidadItem}/>}
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

        </tr>
      </thead>
      <tbody>
        {transferencias.map((transferencia) => (
          <tr key={transferencia._id} className="hover:bg-gray-100">
            <td className="px-4 py-2 border-b">{transferencia.codigo}</td>
            <td className="px-4 py-2 border-b">{transferencia.producto}</td>
            <td className="px-4 py-2 border-b">{transferencia.color}</td>
            <td className="px-4 py-2 border-b">{transferencia.marca}</td>
            <td className="px-4 py-2 border-b">{transferencia.cantidad}</td>
            <td className="px-4 py-2 border-b">{transferencia.tipo}</td>
            <td className="px-4 py-2 border-b">{transferencia.sucursal}</td>
            <td className="px-4 py-2 border-b">{transferencia.almacenSucursal}</td>
            <td className="px-4 py-2 border-b">{transferencia.fecha}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {<Paginador paginas={paginas} paginaSeleccionada={paginaSeleccionada} paginaActual={selectPagina}/>}
  </div>

  );
};
