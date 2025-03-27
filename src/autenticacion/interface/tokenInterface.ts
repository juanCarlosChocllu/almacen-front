import { PermisosContextI } from "./permisosInterface";

export interface TokenI {
  exp: number;
  iat: number;
  id: string;
  permiso: PermisosContextI[];
  rol: string;
  tipo:string;
  sucursal:string
}
