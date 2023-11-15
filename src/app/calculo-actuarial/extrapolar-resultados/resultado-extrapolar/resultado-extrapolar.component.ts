import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SolicitudService } from "../../../services/solicitud.service";
import { SpinnerOverlayService } from "../../../services/overlay.service";
import { ToastService } from "../../../services/toast.service";
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { BandejaExtrapolar } from 'src/app/interfaces/bandeja-extrapolar';
import { EMPTY, catchError } from 'rxjs';
import { ResultadoExtrapolar } from 'src/app/interfaces/resultado-extrapolar';

@Component({
  selector: 'app-resultado-extrapolar',
  templateUrl: './resultado-extrapolar.component.html',
  styleUrls: ['./resultado-extrapolar.component.scss']
})
export class ResultadoExtrapolarComponent {

  usuario!: string
  @Input() solicitud!: BandejaExtrapolar
  @Input() tipoPlanilla!: string
  @Input() tipoPlanillaNombre!: string
  resultadoExtrapolar!: ResultadoExtrapolar

  constructor(private router: Router,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private solicitudService: SolicitudService,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService) {


  }

  ngOnInit() {
    this.usuario = sessionStorage.getItem('usuario')!
    this.obtenerResultados()
  }

  obtenerResultados() {
    this.spinnerService.show()

    this.solicitudService.getCalculoExtrapolacion(this.tipoPlanilla, this.solicitud.idSolicitud)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe((res: any) => {
        this.spinnerService.hide()
        this.resultadoExtrapolar = res.resultado
      });
  }

  aceptar() {
    const modalRef = this.modal.open(ConfirmDialogComponent)
    modalRef.componentInstance.message = `¿Desea aceptar los resultados de la extrapolación?`;

    modalRef.closed.subscribe(result => {
      if (result) {
        this.spinnerService.show()
        this.solicitudService.calcularExtrapolacion(this.tipoPlanilla, this.solicitud.idSolicitud, this.usuario, '127.0.0.1')
          .pipe(catchError(error => {
            this.spinnerService.hide()
            this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
            return EMPTY
          }))
          .subscribe((res: any) => {
            this.spinnerService.hide()
          });
      }
    })
  }
  cerrar() {
    this.activeModal.close()
  }

}
