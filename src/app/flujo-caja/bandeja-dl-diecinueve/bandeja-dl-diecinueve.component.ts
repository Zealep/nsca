import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, catchError } from 'rxjs';
import { BandejaSolicitud } from 'src/app/interfaces/bandeja-solicitud';
import { Root } from 'src/app/interfaces/root';
import { GenerarReporteCalculoActuarialComponent } from 'src/app/reportes/generar-reporte-calculo-actuarial/generar-reporte-calculo-actuarial.component';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { SharedService } from 'src/app/services/shared.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastService } from 'src/app/services/toast.service';
import { MessageOkComponent } from 'src/app/shared/components/message-ok/message-ok.component';

@Component({
  selector: 'app-bandeja-dl-diecinueve',
  templateUrl: './bandeja-dl-diecinueve.component.html',
  styleUrls: ['./bandeja-dl-diecinueve.component.scss']
})
export class BandejaDlDiecinueveComponent {

  title: string = ""
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalItems: number = 0;


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
    this.getSearchBandeja()
  }


  ngOnDestroy(): void {
    this.toastService.clear();
  }

  getSearchBandeja() {


    this.spinnerService.show()


    this.solicitudService.getBandejaReporte('01', this.currentPage, this.itemsPerPage)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(x => {
        this.bandeja = x
        this.sortBandeja = this.bandeja
        //this.totalItems = x.paginacion.totalRegistros;
        this.spinnerService.hide()
      })

  }

  proyectar(solicitud: BandejaSolicitud) {
    const modalRef = this.modal.open(MessageOkComponent)
    const message = `La proyección de la solicitud ${solicitud.idSolicitud} se realizó con éxito.`
    modalRef.componentInstance.message = message
    modalRef.closed.subscribe(x => {

    })
  }

  generarReporte(solicitud: BandejaSolicitud) {
    const modalRef = this.modal.open(GenerarReporteCalculoActuarialComponent,
      {
        size: 'lg'
      });
    modalRef.componentInstance.solicitud = solicitud
    modalRef.closed.subscribe(x => {

    })
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getSearchBandeja();
  }



}

