
import { instance } from "../../config/instanceConfig"
import { httpRespuetaI } from "../../core/interfaces/httpRespuestaInterface"
import { areasI } from "../interfaces/areasInterface"
import { formAreasI } from "../interfaces/formInterface"

export const listarAreas =async(token:string):Promise<areasI[]>=>{
 
    
    try {
        const response =await instance.get('areas',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}


export const listarAreasPublicas =async(token:string):Promise<areasI[]>=>{

      
      try {
          const response =await instance.get('areas/publico',{
              headers:{
                  Authorization:`Bearer ${token}`
              }
          })
          return response.data
      } catch (error) {
          throw error
      }
  
  }

export const crearArea =async(data:formAreasI, token:string):Promise<httpRespuetaI>=>{
    try {
        const response =await instance.post('areas',data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}

export const eliminarArea =async(id:string, token:string):Promise<httpRespuetaI>=>{
    try {
        const response =await instance.delete(`areas/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}


export const  editarArea =async(data:formAreasI, token:string, id:string):Promise<httpRespuetaI>=>{
    try {
        const response =await instance.patch(`areas/${id}`,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }

}