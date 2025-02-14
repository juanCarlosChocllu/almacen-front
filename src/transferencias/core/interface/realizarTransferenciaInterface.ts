export interface realizarTransferenciaI {
    cantidad: number;
    stock: string | undefined;
    almacenSucursal: string;
    tipo: string | undefined;
    almacenArea: string | undefined;
    sucursal:string
    codigoProducto:string,
    nombreProducto:string| undefined
    
  }
  


  export interface dataTransferenciaI{
    data:realizarTransferenciaI[]
  }