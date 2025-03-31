export interface FormUsuariosI{
  
    ci:string
    nombres:string
    apellidos:string
    username:string
    celular:string
    rol:string
    password:string
    empresa?:string | null
    sucursal?:string | null
    area?:string[] | null
    sinRelacion?:boolean | null
    tipo:string

    

    }