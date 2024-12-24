import { HttpStatus } from "../enums/httStatusEnum";

export interface errorPersonalizadoI {
    status: HttpStatus, message: string, propiedad: string
}