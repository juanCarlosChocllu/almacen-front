import io from 'socket.io-client'
import { QueryI } from '../context/interface/notificaicon'

export const handleConnection=(sucursal:string | null)=>{

    
    const query :QueryI={}
    if(sucursal){
     
        query.sucursal = sucursal
        
    }
    
 const socket = io(import.meta.env.VITE_BACKEND_API,{
    query
 })
 return socket

}