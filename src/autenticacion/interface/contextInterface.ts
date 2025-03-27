export interface autenticacionContextI{
    isAutenticacion:boolean
    token:string | null | undefined
    asignarToken:(token:string)=>void
    logout:()=>void
}