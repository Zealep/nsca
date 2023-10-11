import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, catchError } from 'rxjs';
import { BandejaSolicitud } from 'src/app/interfaces/bandeja-solicitud';
import { ParametroList } from 'src/app/interfaces/param';
import { Root } from 'src/app/interfaces/root';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { ParametroService } from 'src/app/services/parametro.service';
import { SharedService } from 'src/app/services/shared.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastService } from 'src/app/services/toast.service';
import { ValorParametroComponent } from '../valor-parametro/valor-parametro.component';
import { BandejaSolicitudRevisar } from 'src/app/interfaces/bandeja-solicitud-revisar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bandeja-parametro-calculo',
  templateUrl: './bandeja-parametro-calculo.component.html',
  styleUrls: ['./bandeja-parametro-calculo.component.scss']
})
export class BandejaParametroCalculoComponent {
  title: string = ""
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalItems: number = 0;

  tipoSolicitud: string = ''
  parametro: string = ''
  descripcion: string = ''

  listaParametros: ParametroList = {
    items: []
  }

  bandeja: Root<BandejaSolicitudRevisar> = { paginacion: { totalRegistros: 0, page: 1, per_page: 15 }, items: [] };
  sortBandeja: Root<BandejaSolicitudRevisar> = { paginacion: { totalRegistros: 0, page: 1, per_page: 15 }, items: [] };

  constructor(private router: Router,
    private modal: NgbModal,
    private solicitudService: SolicitudService,
    private parametroService: ParametroService,
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


    this.parametroService.getBandejaParametro(this.tipoSolicitud, this.parametro, this.descripcion, this.currentPage, this.itemsPerPage)
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

  verValores(a: any) {
    const modalRef = this.modal.open(ValorParametroComponent,
      {
        size: 'lg'
      });
    modalRef.componentInstance.solicitud = a
    modalRef.closed.subscribe(x => {

    })
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getSearchBandeja();
  }

}
