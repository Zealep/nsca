import { PlanillaCarga } from "./planilla-carga"

export interface BandejaSolicitudCarga {
  idSolicitud: number
  descSolicitud: string
  anhoCalculo: string
  estadoSolicitud: string
  descEstadoSolicitud: string
  tipoSolicitud: string
  desTipoSolicitud: string
  planilla: PlanillaCarga[]
}
