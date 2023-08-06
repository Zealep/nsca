import { Planilla } from "./planilla"
import { Movimiento } from "./movimiento"

export interface SolicPlaniMov {
  codSolicitud: string
  descSolicitud: string
  anhoCalculo: string
  fechRecepcion: string
  tipoSolicitud: string
  desTipoSolicitud: string
  nombSolicitante: string
  cargSolicitante: string
  mailSolicitante: string
  observacion: string
  indPensionistas: string
  indActivos: string
  indContAdm: string
  indContJud: string
  planilla: Planilla[]
  movimiento: Movimiento[]
}
