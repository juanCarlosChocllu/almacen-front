import { HttpStatus } from "../enums/httStatusEnum";

export  interface httpRespuetaI{
    status:HttpStatus,
    message?:string
    data?:string

}


export interface httpResponsePagiandor<T>{
    data:T[],
    paginas:number
  }