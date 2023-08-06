import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrarSolicitudComponent } from '../registrar-solicitud/registrar-solicitud.component';
import { BandejaSolicitud } from 'src/app/interfaces/bandeja-solicitud';
import { Root } from 'src/app/interfaces/root';
import { SolicitudService } from '../../services/solicitud.service';
import { SpinnerOverlayService } from '../../services/overlay.service';
import { catchError, EMPTY } from 'rxjs';
import { ParametroList } from 'src/app/interfaces/param';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-bandeja-calculo-actuarial',
  templateUrl: './bandeja-calculo-actuarial.component.html',
  styleUrls: ['./bandeja-calculo-actuarial.component.css']
})
export class BandejaCalculoActuarialComponent implements OnInit, OnDestroy {

  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalItems: number = 0;

  tipoSolicitud: string = ''
  periodo: string = ''

  listaParametros: ParametroList = {
    codParametro: '',
    lstParam: []
  }

  bandeja: Root<BandejaSolicitud> = { paginacion: { totalRegistros: 0, page: 1, per_page: 15 }, items: [] };

  constructor(private router: Router,
    private registrarModal: NgbModal,
    private solicitudService: SolicitudService,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getTipoSolicitud()
  }

  getTipoSolicitud() {

    this.solicitudService.getTiposDeSolicitud()
      .pipe(catchError(error => {
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(x => {
        this.listaParametros = x[0]
      })
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }

  getSearchBandeja() {

    if (this.tipoSolicitud === '' || this.tipoSolicitud === undefined) {
      this.toastService.show('Debe seleccionar el tipo de solicitud', { classname: 'bg-danger text-white', delay: 3000 })
      return;
    }

    /*
    if (this.periodo === '' || this.periodo === undefined) {
      this.toastService.show('Debe ingresar el año del periodo', { classname: 'bg-danger text-white', delay: 3000 })
      return;
    }
    */

    this.spinnerService.show()


    this.solicitudService.getBandejaSolicitud(this.tipoSolicitud, this.periodo, this.currentPage, this.itemsPerPage)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(x => {
        this.bandeja = x
        this.totalItems = x.paginacion.totalRegistros;
        this.spinnerService.hide()
      })

  }

  registrarSolicitud() {
    const modalRef = this.registrarModal.open(RegistrarSolicitudComponent);

    modalRef.closed.subscribe(x => {
      if (x === 'refresh') {
        console.log('llamar denuevo');
      }

    })
  }

  verDetalle(codSolicitud: string) {
    this.router.navigate(['/calculo-actuarial/ver-detalle-solicitud', codSolicitud]);

  }

  anularPlanillas(codSolicitud: string) {
    this.router.navigate(['/calculo-actuarial/anular-planillas', codSolicitud])
  }


  anularSolicitud(codSolicitud: string) {
    this.router.navigate(['/calculo-actuarial/anular-solicitud', codSolicitud])
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getSearchBandeja();
  }


}
