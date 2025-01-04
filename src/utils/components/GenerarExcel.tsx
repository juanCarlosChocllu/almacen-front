import * as XLSX from 'xlsx'
import {  } from 'react-icons/fa'
import { TbFileTypeXls } from 'react-icons/tb'
export const GenerarExcel = <T,>({data,nombre}:{data:T[], nombre:string }) => {
 
    
    const exportar= ()=>{
     
        const hoja =XLSX.utils.json_to_sheet(data)
        const libro =XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(libro, hoja, 'hoja1')
        XLSX.writeFile(libro,nombre + '.xlsx')
    }
  return (
    <div className='flex justify-end sm:justify-center md:justify-end'>


    <button 
      onClick={() => exportar()} 
      className='bg-green-500 text-white p-2 rounded cursor-pointer'
    >
      <TbFileTypeXls />
    </button>
    </div>
  )
}
