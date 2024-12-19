

export  interface dataProductoI {
    uuid?:string
    id:string| undefined
    nombre:string | undefined
    cantidad:number
    precio:number
    total:number
    fechaCompra:string
    fechaVencimiento:string
    almacenArea:string ,
    factura:string
    codigo:string | undefined

    tipo:string | undefined
}

export interface dataProductoStock {

cantidad:number

precio:number

total:number

fechaCompra:string


fechaVencimiento:string


producto:string | undefined

almacenArea:string 

factura:string

tipo:string





}