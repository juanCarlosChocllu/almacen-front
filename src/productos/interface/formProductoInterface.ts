export interface formProductoI{
    _id?:string
    nombre:string,
    descripcion:string
    categoria:string
    genero?:string 
    talla?:string 
    color?:string 
    subCategoria?:string 
    codigoBarra:string
    cantidadInicialVenta:number
    cantidadInicialRegalo:number
    imagen:File[]
    marca:string

}
