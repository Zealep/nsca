import { PlanillaCalculo } from "./planilla-calculo"

export interface BandejaSolicitudCalculo {
  idSolicitud: number
  descSolicitud: string
  anhoCalculo: string
  estadoSolicitud: string
  descEstadoSolicitud: string
  tipoSolicitud: string
  desTipoSolicitud: string
  planilla: PlanillaCalculo[]
}
