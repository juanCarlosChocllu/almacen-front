import { httpAxiosErrorI } from "../../interfaces/httpErrorInterface"

export  const httAxiosError=(error:unknown)=>{
    const err = error as httpAxiosErrorI
return err
}