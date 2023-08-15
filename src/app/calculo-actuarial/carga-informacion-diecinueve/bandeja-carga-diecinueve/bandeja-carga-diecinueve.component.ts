import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, catchError } from 'rxjs';
import { BandejaSolicitud } from 'src/app/interfaces/bandeja-solicitud';
import { Root } from 'src/app/interfaces/root';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastService } from 'src/app/services/toast.service';
import { CargaInformacionDiecinueveComponent } from '../carga-informacion-diecinueve.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bandeja-carga-diecinueve',
  templateUrl: './bandeja-carga-diecinueve.component.html',
  styleUrls: ['./bandeja-carga-diecinueve.component.css']
})
export class BandejaCargaDiecinueveComponent implements OnInit {

  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalItems: number = 0;

  periodo: string = ''

  bandeja: Root<BandejaSolicitud> = { paginacion: { totalRegistros: 0, page: 1, per_page: 15 }, items: [] };


  constructor(private router: Router,
    private modal: NgbModal,
    private solicitudService: SolicitudService,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService) { }

  ngOnInit() {
  }

  getSearchBandeja() {

    if (this.periodo === '' || this.periodo === undefined) {
      this.toastService.show('Debe seleccionar el periodo', { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
      return;
    }

    this.spinnerService.show()


    this.solicitudService.getBandejaSolicitud('01', this.periodo, this.currentPage, this.itemsPerPage)
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

  verCargaInformacion(codSolicitud: string) {
    const modalRef = this.modal.open(CargaInformacionDiecinueveComponent,
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
