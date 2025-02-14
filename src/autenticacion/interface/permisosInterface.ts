export interface  PermisosContextI {
 modulo:string
        acciones:string[]
   
}
export interface  TipocontextI  {
    tipo:string | null
    sucursal:string | null 
}




export interface PermisosContextTipoI  extends TipocontextI {
    permisos:PermisosContextI[]

}