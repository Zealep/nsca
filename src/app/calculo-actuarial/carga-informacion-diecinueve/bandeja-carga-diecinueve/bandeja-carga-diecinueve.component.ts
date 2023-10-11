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
import { BandejaSolicitudCarga } from 'src/app/interfaces/bandeja-solicitud-carga';
import { COD_TIPO_SOLICITUD_1990 } from 'src/app/shared/var.constant';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-bandeja-carga-diecinueve',
  templateUrl: './bandeja-carga-diecinueve.component.html',
  styleUrls: ['./bandeja-carga-diecinueve.component.css']
})
export class BandejaCargaDiecinueveComponent implements OnInit {

  title: string = ""
  currentPage: number = 1;
  itemsPerPage: number = 10;

  periodo: string = ''

  bandeja: Root<BandejaSolicitudCarga> = { paginacion: { totalRegistros: 0, page: 1, per_page: 15 }, items: [] };


  constructor(private router: Router,
    private modal: NgbModal,
    private solicitudService: SolicitudService,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService,
    private sharedService: SharedService) {
    this.sharedService.getTitle.subscribe(res => res != "" ? this.title = res : this.title = sessionStorage.getItem('title')!
    )
  }

  ngOnInit() {
    this.getSearchBandeja()
  }

  getSearchBandeja() {

    this.spinnerService.show()
    this.solicitudService.getBandejaCarga(COD_TIPO_SOLICITUD_1990)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(x => {
        this.bandeja = x
        this.spinnerService.hide()
      })

  }

  verCargaInformacion(solicitud: BandejaSolicitudCarga) {
    const modalRef = this.modal.open(CargaInformacionDiecinueveComponent,
      {
        size: 'lg'
      });
    modalRef.componentInstance.solicitud = solicitud
    modalRef.closed.subscribe(x => {
      this.getSearchBandeja()
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
