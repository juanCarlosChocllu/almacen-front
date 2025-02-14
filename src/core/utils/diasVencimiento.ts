export function diasRestantes(fechaVencimiento:string){
    const fechaActual = new  Date()
    if(!fechaVencimiento) {
        return 0
    }
    const fechaV = new Date(fechaVencimiento)
    const diferencia = fechaV.getTime() - fechaActual.getTime();
    const diasRestantes = Math.ceil(diferencia / (1000 * 3600 * 24));
    
    return diasRestantes
}