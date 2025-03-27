import { BuscadorI } from "./buscador";

export interface ParamsI  extends BuscadorI {
    limite:number,
    pagina:number
}