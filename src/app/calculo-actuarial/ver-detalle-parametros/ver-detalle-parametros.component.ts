import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { ParametroSolicitud } from 'src/app/interfaces/parametro-solicitud';
import { Root } from 'src/app/interfaces/root';
import { SolicPlaniMov } from 'src/app/interfaces/solicitud-plani-mov';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastService } from 'src/app/services/toast.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ver-detalle-parametros',
  templateUrl: './ver-detalle-parametros.component.html',
  styleUrls: ['./ver-detalle-parametros.component.css']
})
export class VerDetalleParametrosComponent implements OnInit {

  p: number = 1;
  codSolicitud!: string
  selectedOption: string = '';

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

  parametros: Root<ParametroSolicitud> = { paginacion: { totalRegistros: 0, page: 1, per_page: 10 }, items: [] };


  constructor(private router: Router,
    private solicitudService: SolicitudService,
    private route: ActivatedRoute,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.codSolicitud = this.route.snapshot.paramMap.get('codSolicitud')!;
    this.getSolicitudPlanillaMovimiento()
  }

  getSolicitudPlanillaMovimiento() {

    this.solicitudService.getSolicitudPlanillaMovimiento(this.codSolicitud)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(x => {
        this.solicitud = x
      })
  }

  getParametrosSolicitud() {
    this.spinnerService.show()
    this.solicitudService.getParametrosSolicitud(this.codSolicitud, this.selectedOption, '1', '15')
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        this.parametros = { paginacion: { totalRegistros: 0, page: 1, per_page: 10 }, items: [] }
        return EMPTY
      }))
      .subscribe(x => {
        this.spinnerService.hide()
        this.parametros = x
      })
  }

  cerrar() {
    this.router.navigate(['/calculo-actuarial/solicitud-bandeja'])

  }

  descargar() {

    if (this.parametros.items.length == 0) {
      this.toastService.show('No hay datos en los parametros', { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
      return
    }
    const name = 'Parametros.xlsx';

    const params = this.parametros.items.map(x => {
      return {
        'Planilla': x.desTipPla,
        'Regimen': x.desTipoSolicitud,
        'Parametro': x.desParametro,
        'ID': x.idCodigo,
        'Valor': x.valorCampo,
      }
    })


    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(params);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Listado de parametros');
    XLSX.writeFile(book, name);
    this.toastService.show('Se descargo correctamente el archivo de parametros', { classname: 'bg-success text-white', delay: 3000, icon: 'check' })

  }

  verMovimientos() {
    this.router.navigate(['/calculo-actuarial/ver-detalle-movimientos', this.codSolicitud])
  }

}
