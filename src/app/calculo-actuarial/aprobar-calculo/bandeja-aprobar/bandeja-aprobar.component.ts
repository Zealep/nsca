import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, catchError } from 'rxjs';
import { BandejaSolicitudRevisar } from 'src/app/interfaces/bandeja-solicitud-revisar';
import { Root } from 'src/app/interfaces/root';
import { GenerarReporteCalculoActuarialComponent } from 'src/app/reportes/generar-reporte-calculo-actuarial/generar-reporte-calculo-actuarial.component';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { SharedService } from 'src/app/services/shared.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastService } from 'src/app/services/toast.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { COD_TIPO_SOLICITUD_1990 } from 'src/app/shared/var.constant';

@Component({
  selector: 'app-bandeja-aprobar',
  templateUrl: './bandeja-aprobar.component.html',
  styleUrls: ['./bandeja-aprobar.component.scss']
})
export class BandejaAprobarComponent {
  title: string = ""
  currentPage: number = 1;
  itemsPerPage: number = 10;

  periodo: string = ''

  bandeja: Root<BandejaSolicitudRevisar> = { paginacion: { totalRegistros: 0, page: 1, per_page: 15 }, items: [] };


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
    this.solicitudService.getBandejaRevisar(COD_TIPO_SOLICITUD_1990)
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

  descargarReportes(solicitud: BandejaSolicitudRevisar) {
    const modalRef = this.modal.open(GenerarReporteCalculoActuarialComponent,
      {
        size: 'lg'
      });
    modalRef.componentInstance.solicitud = solicitud
    modalRef.closed.subscribe(x => {
      this.getSearchBandeja()
    })
  }

  aprobarCalculo(solicitud: BandejaSolicitudRevisar) {
    const modalRef = this.modal.open(ConfirmDialogComponent)
    modalRef.componentInstance.message = `¿Desea aprobar los resultados del cálculo y enviar correo
    automático al Director?`;

    modalRef.closed.subscribe(result => {
      if (result) {

      }
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
