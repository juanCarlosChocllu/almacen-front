export interface BuscadorProveedorI {
    nombre?:string
    apellidos?:string
    nit?:string
    ci?:string
    celular?:string
}

export interface SetBuscadorProveedorDataI {
    nit:(data?:string)=> void
    nombre:(data?:string)=> void
    celular:(data?:string)=> void
    apellidos:(data?:string)=> void
    ci:(data?:string)=> void


}