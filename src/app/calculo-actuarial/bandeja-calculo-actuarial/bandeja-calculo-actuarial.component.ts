import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
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
import { VerDetalleSolicitudComponent } from '../ver-detalle-solicitud/ver-detalle-solicitud.component';
import { AnularPlanillasComponent } from '../anular-planillas/anular-planillas.component';
import { AnularSolicitudComponent } from '../anular-solicitud/anular-solicitud.component';
import {
  SortableHeaderDirective,
  SortEvent,
  compare,
} from '../sortable-header.directive';


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
    items: []
  }

  @ViewChildren(SortableHeaderDirective)
  headers!: QueryList<SortableHeaderDirective>;


  bandeja: Root<BandejaSolicitud> = { paginacion: { totalRegistros: 0, page: 1, per_page: 15 }, items: [] };
  sortBandeja: Root<BandejaSolicitud> = { paginacion: { totalRegistros: 0, page: 1, per_page: 15 }, items: [] };

  constructor(private router: Router,
    private modal: NgbModal,
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

    /*
        if (this.periodo !== '') {
          const mes = this.periodo.substring(4, 6)
          console.log('mes', mes);
          if (+mes > 12) {
            this.toastService.show('El mes no puede ser superior a 12', { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
            return;
          }
        }


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
        this.sortBandeja = this.bandeja
        this.totalItems = x.paginacion.totalRegistros;
        this.spinnerService.hide()
      })

  }

  registrarSolicitud() {
    const modalRef = this.modal.open(RegistrarSolicitudComponent);

    modalRef.closed.subscribe(x => {
      if (x === 'refresh') {
        console.log('llamar denuevo');
      }

    })
  }

  verDetalle(codSolicitud: string) {
    const modalRef = this.modal.open(VerDetalleSolicitudComponent);
    modalRef.componentInstance.codSolicitud = codSolicitud
    modalRef.closed.subscribe(x => {

    })
  }

  anularPlanillas(codSolicitud: string) {
    const modalRef = this.modal.open(AnularPlanillasComponent);
    modalRef.componentInstance.codSolicitud = codSolicitud
    modalRef.closed.subscribe(x => {

    })
  }


  anularSolicitud(codSolicitud: string) {
    const modalRef = this.modal.open(AnularSolicitudComponent);
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

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.sortBandeja = this.bandeja;
    } else {
      this.sortBandeja.items = [...this.bandeja.items].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }


}
