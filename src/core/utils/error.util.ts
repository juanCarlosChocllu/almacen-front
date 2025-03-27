import { httpAxiosErrorI } from "../../core/interfaces/httpErrorInterface"

export  const httAxiosError=(error:unknown)=>{
    const err = error as httpAxiosErrorI
return err
}