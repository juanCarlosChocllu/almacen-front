import { errorPropiedadesI } from "../../interfaces/errorPropiedades";

export const errorClassValidator=(error:string):errorPropiedadesI[]=>{
    const data:errorPropiedadesI[]=[]
        if(Array.isArray(error)){
            for (const err  of error) {
                const e=  err as errorPropiedadesI
                let error:errorPropiedadesI ={
                    error:e.error,
                    propiedad:e.propiedad
                }
                data.push(error)
            }
        }
     return data
        
}