import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, catchError } from 'rxjs';
import { ParametroSolicitud } from 'src/app/interfaces/parametro-solicitud';
import { SolicPlaniMov } from 'src/app/interfaces/solicitud-plani-mov';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastService } from 'src/app/services/toast.service';
import * as XLSX from 'xlsx';
import { Root } from './../../interfaces/root';

@Component({
  selector: 'app-ver-detalle-parametros',
  templateUrl: './ver-detalle-parametros.component.html',
  styleUrls: ['./ver-detalle-parametros.component.css']
})
export class VerDetalleParametrosComponent implements OnInit {

  usuario!: string
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalItems: number = 0;


  @Input() codSolicitud!: string
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
    private activeModal: NgbActiveModal,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.usuario = sessionStorage.getItem('usuario')!
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
    if (this.selectedOption === "") {
      return;
    }

    this.spinnerService.show()
    this.solicitudService.getParametrosSolicitud(this.codSolicitud, this.selectedOption, this.currentPage, this.itemsPerPage)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        this.parametros = { paginacion: { totalRegistros: 0, page: 1, per_page: 15 }, items: [] }
        return EMPTY
      }))
      .subscribe(x => {
        this.spinnerService.hide()
        this.parametros = x
        this.totalItems = x.paginacion.totalRegistros;
        this.currentPage = 1;
      })
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getParametrosSolicitud();
  }


  cerrar() {
    this.activeModal.close()

  }

  descargar() {

    if (this.selectedOption === "") {
      this.toastService.show('Selecciona una planilla para descargar', { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
      return;
    }

    if (this.totalItems == 0) {
      this.toastService.show('No hay datos en los parametros', { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
      return
    }
    const name = 'Parametros.xlsx';

    let dataExport: Root<ParametroSolicitud> = { paginacion: { totalRegistros: 0, page: 1, per_page: 10 }, items: [] };


    this.spinnerService.show()
    this.solicitudService.getParametrosSolicitud(this.codSolicitud, this.selectedOption, 1, this.totalItems)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(x => {

        this.spinnerService.hide()
        dataExport = x

        const params = dataExport.items.map(x => {
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
      })

  }


}
