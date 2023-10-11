import {PlanillaRevisar} from "./planilla-revisar";

export interface BandejaSolicitudRevisar {
  idSolicitud: number
  descSolicitud: string
  anhoCalculo: string
  estadoSolicitud: string
  descEstadoSolicitud: string
  tipoSolicitud: string
  desTipoSolicitud: string
  planilla: PlanillaRevisar[]
}
