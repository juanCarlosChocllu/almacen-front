export interface registrarTranferenciaI{
    uuid:string
    codigo:string | undefined,
    producto:string | undefined,
    cantidad:number,
    tipo:string | undefined,
    empresa:string,
    nombreEmpresa:string
    sucursal:string,
    nombreSucursal:string
    almacen:string
    nombreAlmacen:string
    nombreAlmacenArea:string| undefined
    //nombreArea:string| undefined
    idStock:string | undefined

    almacenArea:string
}