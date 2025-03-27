import { instance } from "../../config/instanceConfig"
import { PermisosI } from "../interfaces/permisoInterface"


export const verificarPermisosPorRol=async(rol:string, token:string):Promise<PermisosI[]>=>{
        try {
            const response = await instance.get(`permisos/${rol}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            return response.data
        } catch (error) {
            throw error
        }
}