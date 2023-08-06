import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicPlaniMov } from 'src/app/interfaces/solicitud-plani-mov';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import * as XLSX from 'xlsx';
import { catchError, EMPTY } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-ver-detalle-movimientos',
  templateUrl: './ver-detalle-movimientos.component.html',
  styleUrls: ['./ver-detalle-movimientos.component.scss']
})
export class VerDetalleMovimientosComponent {
  p: number = 1;

  codSolicitud!: string

  solicitud: SolicPlaniMov =
    {
      codSolicitud: '',
      descSolicitud: '',
      anhoCalculo: '',
      fechRecepcion: '',
      tipoSolicitud: '',
      desTipoSolicitud: '',
      nombSolicitante: '',
      cargSolicitante: '',
      mailSolicitante: '',
      observacion: '',
      indPensionistas: '',
      indActivos: '',
      indContAdm: '',
      indContJud: '',
      planilla: [],
      movimiento: []
    }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private spinnerService: SpinnerOverlayService,
    private solicitudService: SolicitudService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.codSolicitud = this.route.snapshot.paramMap.get('codSolicitud')!;
    this.getSolicitudPlanillaMovimiento()
  }

  getSolicitudPlanillaMovimiento() {
    this.spinnerService.show()
    this.solicitudService.getSolicitudPlanillaMovimiento(this.codSolicitud)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(x => {
        this.spinnerService.hide()
        this.solicitud = x
      })
  }

  cerrar() {
    this.router.navigate(['/calculo-actuarial/solicitud-bandeja'])

  }

  descargar() {

    if (this.solicitud.movimiento.length == 0) {
      this.toastService.show('No hay datos en los movimientos', { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
      return
    }

    const name = 'Movimientos.xlsx';

    const cabecera = ['ID Movimiento', 'Proceso ejecutado', 'Estado nuevo', 'Usuario', 'Fecha']

    const movimientos = this.solicitud.movimiento.map(x => {
      return {
        'ID Movimiento': x.idMovimiento,
        'Proceso ejecutado': x.desProc,
        'Estado nuevo': x.desEstSolDes,
        'Usuario': x.idUsuCrea,
        'Fecha': x.fecCrea
      }
    })


    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(movimientos, { header: cabecera });

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Listado de movimientos');

    XLSX.writeFile(book, name);

    this.toastService.show('Se descargo correctamente el archivo de movimientos', { classname: 'bg-success text-white', delay: 3000, icon: 'check' })

  }

  verParametros() {
    this.router.navigate(['/calculo-actuarial/ver-detalle-parametros', this.codSolicitud])
  }
}
