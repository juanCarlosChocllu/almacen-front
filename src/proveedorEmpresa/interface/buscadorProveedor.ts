export interface BuscadorProveedorI {
    nombre?:string
    nit?:string
    celular?:string
}

export interface SetBuscadorProveedorDataI {
    nit:(data?:string)=> void
    nombre:(data?:string)=> void
    celular:(data?:string)=> void

}