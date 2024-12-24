import React, { useEffect, useState } from 'react';
import { listarIngresos } from '../services/movimientoAreaApi';
import { MovimientoAreaI } from '../interface/movimientoAreaInterface';




export const TablaIngresos: React.FC = () => {
    const [ingresosDta, setIngresos]= useState<MovimientoAreaI[]>([])
    useEffect(()=>{
        ingresos()
},[])

const ingresos =async()=>{
    try {
        const response = await listarIngresos()
       setIngresos(response)
    } catch (error) {
        console.log(error);
        
    }
}

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg ">
       <div className="text-center text-2xl font-semibold text-gray-800 mt-6 mb-4">
  Tabla de Ingresos
</div>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-800 text-white text-xs">
          <tr>
   
            <th className="px-6 py-3 text-left">Almacen Area</th>
            <th className="px-6 py-3 text-left">Producto</th>
            <th className="px-6 py-3 text-left">Usuario</th>
            <th className="px-6 py-3 text-left">Tipo de Registro</th>
            <th className="px-6 py-3 text-left">Cantidad</th>
            <th className="px-6 py-3 text-left">Precio</th>
            <th className="px-6 py-3 text-left">Total</th>
            <th className="px-6 py-3 text-left">Factura</th>
            <th className="px-6 py-3 text-left">Tipo</th>
            <th className="px-6 py-3 text-left">Fecha de Compra</th>
            <th className="px-6 py-3 text-left">Fecha de Vencimiento</th>
            <th className="px-6 py-3 text-left">Proveedor</th>
            <th className="px-6 py-3 text-left">Fecha</th>
    
          </tr>
        </thead>
        <tbody className="text-gray-800 text-xs">
          {ingresosDta.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              
              <td className="px-6 py-4">{item.almacenArea}</td>
              <td className="px-6 py-4">{item.producto}</td>
              <td className="px-6 py-4">{item.usuario}</td>
              <td className="px-6 py-4">{item.tipoDeRegistro}</td>
              <td className="px-6 py-4">{item.cantidad}</td>
              <td className="px-6 py-4">{item.precio}</td>
              <td className="px-6 py-4">{item.total}</td>
              <td className="px-6 py-4">{item.factura}</td>
              <td className="px-6 py-4">{item.tipo}</td>
              <td className="px-6 py-4">{item.fechaCompra}</td>
              <td className="px-6 py-4">{item.fechaVencimiento}</td>
              <td className="px-6 py-4">{item.proveedor}</td>
              <td className="px-6 py-4">{item.fecha}</td>
         
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
