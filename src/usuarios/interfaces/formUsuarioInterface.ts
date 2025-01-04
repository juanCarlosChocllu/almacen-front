export interface FormUsuariosI{
  
    ci:string
    nombres:string
    apellidos:string
    username:string
    celular:string
    rol:string
    password:string
    sucursal?:string | null
    area?:string | null
    sinRelacion?:boolean | null

    }