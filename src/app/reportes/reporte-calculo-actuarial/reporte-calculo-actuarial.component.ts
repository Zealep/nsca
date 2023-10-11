import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BandejaSolicitudCarga } from 'src/app/interfaces/bandeja-solicitud-carga';
import { Root } from 'src/app/interfaces/root';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastService } from 'src/app/services/toast.service';
import { COD_TIPO_SOLICITUD_1990 } from 'src/app/shared/var.constant';
import { catchError, EMPTY } from 'rxjs';
import { BandejaSolicitud } from 'src/app/interfaces/bandeja-solicitud';
import { ParametroList } from 'src/app/interfaces/param';
import { GenerarReporteCalculoActuarialComponent } from '../generar-reporte-calculo-actuarial/generar-reporte-calculo-actuarial.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-reporte-calculo-actuarial',
  templateUrl: './reporte-calculo-actuarial.component.html',
  styleUrls: ['./reporte-calculo-actuarial.component.scss']
})
export class ReporteCalculoActuarialComponent {

  title: string = ""
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalItems: number = 0;

  tipoSolicitud: string = ''
  periodo: string = ''

  listaParametros: ParametroList = {
    items: []
  }

  bandeja: Root<BandejaSolicitud> = { paginacion: { totalRegistros: 0, page: 1, per_page: 15 }, items: [] };
  sortBandeja: Root<BandejaSolicitud> = { paginacion: { totalRegistros: 0, page: 1, per_page: 15 }, items: [] };

  constructor(private router: Router,
    private modal: NgbModal,
    private solicitudService: SolicitudService,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService,
    private sharedService: SharedService
  ) {
    this.sharedService.getTitle.subscribe(res => res != "" ? this.title = res : this.title = sessionStorage.getItem('title')!
    )
  }

  ngOnInit() {
    this.getTipoSolicitud()
  }

  getTipoSolicitud() {

    this.spinnerService.show()
    this.solicitudService.getTiposDeSolicitud()
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(x => {
        this.spinnerService.hide()
        this.listaParametros = x
      })
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }

  getSearchBandeja() {

    if (this.tipoSolicitud === '' || this.tipoSolicitud === undefined) {
      this.toastService.show('Debe seleccionar el tipo de solicitud', { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
      return;
    }

    this.spinnerService.show()


    this.solicitudService.getBandejaSolicitud(this.tipoSolicitud, this.periodo, this.currentPage, this.itemsPerPage)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(x => {
        this.bandeja = x
        this.sortBandeja = this.bandeja
        this.totalItems = x.paginacion.totalRegistros;
        this.spinnerService.hide()
      })

  }

  generarReporte(codSolicitud: string) {
    const modalRef = this.modal.open(GenerarReporteCalculoActuarialComponent,
      {
        size: 'lg'
      });
    modalRef.componentInstance.codSolicitud = codSolicitud
    modalRef.closed.subscribe(x => {

    })
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getSearchBandeja();
  }


  soloNumeros(e: KeyboardEvent): boolean {
    const input = e.key;
    const regExp = /^[0-9]+$/;
    return regExp.test(input);
  }


}
