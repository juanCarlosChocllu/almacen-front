
export function permisosModulo(permisos:any[],modulo:string, permiso:string) {
 
     const permisosModulo = permisos.filter((item)=> item.modulo == modulo)
     return permisosModulo.some((item)=> item.acciones.includes(permiso))
}