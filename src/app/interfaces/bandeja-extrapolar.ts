import { PlanillaExtrapolar } from "./planilla-extrapolar"

export interface BandejaExtrapolar {
  idSolicitud: string
  descSolicitud: string
  anhoCalculo: string
  estadoSolicitud: string
  descEstadoSolicitud: string
  tipoSolicitud: string
  desTipoSolicitud: string
  planilla: PlanillaExtrapolar[]
}
