import { instance } from "../../config/instanceConfig";
import { LoginI } from "../interface/loginInterface";
import { LoginRespuestaApi } from "../interface/loginRespuestaApi";


export const login= async(data:LoginI):Promise<LoginRespuestaApi>=>{
    try {
        const response = await instance.post('autenticacion', data)
        return response.data
    } catch (error) {
        throw error
    }


}
