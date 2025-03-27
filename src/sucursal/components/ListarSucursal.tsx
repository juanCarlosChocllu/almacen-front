import { FaTrash, FaEdit } from "react-icons/fa";
import { sucursalI } from "../interface/sucursalInterface";
import { useContext, useEffect, useState } from "react";
import { eliminarSucursal, listarSucursal } from "../services/sucursalApi";
import { AutenticacionContext } from "../../autenticacion/context/crear.autenticacion.context";
import { CrearSucursal } from "../modal/CrearSucursal";
import { HttpStatus } from "../../core/enums/httStatusEnum";
import { alertaDeEliminacion } from "../../core/utils/alertaEliminacion";
import { EditarSucursal } from "../modal/EditarSucursal";
export const ListarSucursal = () => {
  const [sucursales, setSucursales] = useState<sucursalI[]>([]);
  const [recargarData, setRecargarData]= useState<boolean>(false)
  const [isOpen, setIsOpen]= useState<boolean>(false)
  const [sucursal, setSucursal]= useState<string>()
  const [empresa, setEmpresa]= useState<string>()
  const [idSucursal, setIdSucursal]= useState<string>()
  const closeModal = ()=> setIsOpen(false)
  const { token } = useContext(AutenticacionContext);
  useEffect(() => {
    listarScursales();
  }, [recargarData]);

  const listarScursales = async () => {
    try {
      if (token) {
        const response = await listarSucursal(token);
     
        
        setSucursales(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const eliminar = async(id:string)=>{
    try {
     if(token && id) {
      const response = await eliminarSucursal(id, token)
      if(response.status == HttpStatus.OK) {
        setRecargarData(!recargarData)
      }
     }
    } catch (error) {
      console.log(error);
      
      
    }
  }  

  
  return (
    <div className="p-4">'
  <CrearSucursal recargarData={recargarData} setRecargarData={setRecargarData}/>
      <h2 className="text-xl font-bold mb-4">Sucursales</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left  ">Nombre</th>
              <th className="px-4 py-2 text-left ">Empresa</th>
              <th className="px-4 py-2 text-left ">Acción</th>
            </tr>
          </thead>
          <tbody>
            {sucursales.map((sucursal) => (
              <tr key={sucursal._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 ">{sucursal.nombre}</td>
                <td className="px-4 py-2 ">{sucursal.nombreEmpresa}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={()=> alertaDeEliminacion(()=> eliminar(sucursal._id))}  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none flex items-center">
                    <FaTrash className="mr-2" />
                  </button>
                  <button onClick={()=>{
                      setEmpresa(sucursal.empresa)
                      setSucursal(sucursal.nombre)
                      setIdSucursal(sucursal._id)
                      setIsOpen(true)
                  }} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none flex items-center">
                    <FaEdit className="mr-2" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {empresa && sucursal && sucursal && isOpen &&  idSucursal && <EditarSucursal empresa={empresa} idSucursal={idSucursal} sucursal={sucursal} isOpen={isOpen}  recargar={recargarData} setRecargar={setRecargarData}  closeModal={closeModal}/> }
    </div>
  );
};
