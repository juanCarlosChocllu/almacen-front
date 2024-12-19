import { data } from "react-router-dom"
import { instance } from "../../config/instanceConfig"
import { httpRespuetaI } from "../../interfaces/httpRespuestaInterface"
import { areasI } from "../interfaces/areasInterface"
import { formAreasI } from "../interfaces/formInterface"

export const listarAreas =async():Promise<areasI[]>=>{
    try {
        const response =await instance.get('areas')
        return response.data
    } catch (error) {
        throw error
    }

}


export const crearArea =async(data:formAreasI):Promise<httpRespuetaI>=>{
    try {
        const response =await instance.post('areas',data)
        return response.data
    } catch (error) {
        throw error
    }

}