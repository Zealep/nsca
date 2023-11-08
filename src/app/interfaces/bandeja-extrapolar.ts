import { PlanillaExtrapolar } from "./planilla-extrapolar"

export interface BandejaExtrapolar {
  idSolicitud: number
  descSolicitud: string
  anhoCalculo: string
  estadoSolicitud: string
  descEstadoSolicitud: string
  tipoSolicitud: string
  desTipoSolicitud: string
  planilla: PlanillaExtrapolar[]
}
