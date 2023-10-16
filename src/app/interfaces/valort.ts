import { DetalleValor } from "./detalle-valor"

export interface Valor {
  idCod: string
  vlCamp: string
  detalle: DetalleValor[]
}
