export interface BuscadorStockSucursalI{
    codigo?:string | null,
    almacenSucursal?:string | null,
    marca?:string | null,
    tipo?:string| null,
    sucursal?:string| null,
    empresa?:string| null,
    
}

export interface ParamsStockSucursalI extends BuscadorStockSucursalI {
    limite:number,
    pagina:number
}
