
import { instance } from "../../config/instanceConfig"
import { MovimientoAreaI } from "../interface/movimientoAreaInterface"


export const listarIngresos= async():Promise<MovimientoAreaI[]>=>{
    try {
        const response = await  instance.get('movimiento/area/ingresos')
        return response.data
    } catch (error) {
        throw error
    }
}



export const listarSalidas= async():Promise<MovimientoAreaI[]>=>{
    try {
        const response = await  instance.get('movimiento/area/salidas')
        return response.data
    } catch (error) {
        throw error
    }
}