export interface  PermisosContextI {
 modulo:string
        acciones:string[]
   
}
export interface  TipocontextI  {
    tipo:string | null
}




export interface PermisosContextTipoI  extends TipocontextI {
    permisos:PermisosContextI[]

}