import { Paginacion } from "./paginacion";

export interface Root<T> {
  paginacion: Paginacion;
  items: T[];
}
