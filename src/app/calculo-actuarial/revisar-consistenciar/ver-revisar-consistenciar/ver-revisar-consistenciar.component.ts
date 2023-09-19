import {Component, Input} from '@angular/core';
import {BandejaSolicitudCalculo} from "../../../interfaces/bandeja-solicitud-calculo";
import {Router} from "@angular/router";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SolicitudService} from "../../../services/solicitud.service";
import {SpinnerOverlayService} from "../../../services/overlay.service";
import {ToastService} from "../../../services/toast.service";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {catchError, EMPTY} from "rxjs";
import {
  GenerarReporteCalculoActuarialComponent
} from "../../../reportes/generar-reporte-calculo-actuarial/generar-reporte-calculo-actuarial.component";

@Component({
  selector: 'app-ver-revisar-consistenciar',
  templateUrl: './ver-revisar-consistenciar.component.html',
  styleUrls: ['./ver-revisar-consistenciar.component.scss']
})
export class VerRevisarConsistenciarComponent {
  usuario!: string

  @Input() solicitud!: BandejaSolicitudCalculo

  constructor(private router: Router,
              private activeModal: NgbActiveModal,
              private modal: NgbModal,
              private solicitudService: SolicitudService,
              private spinnerService: SpinnerOverlayService,
              private toastService: ToastService) {

  }

  ngOnInit() {
    this.usuario = sessionStorage.getItem('usuario')!
  }

  dialogCerrar(codTipoPlanilla:string, descTipoPlanilla: string) {
    const modalRef = this.modal.open(ConfirmDialogComponent)
    modalRef.componentInstance.message = `¿Está seguro que desea cerrar la planilla de ${descTipoPlanilla} de la solicitud N° ${this.solicitud.idSolicitud}?`;

    modalRef.closed.subscribe(result => {
      if (result) {
        this.procesarCierre(codTipoPlanilla);
      }
    })

  }
  descargar(codPlanilla: string){
    console.log('descargar')
  }
  procesarCierre(codPlanilla: string) {
    const usuario = sessionStorage.getItem('usuario')!
    const ip = '127.0.0.1'
    console.log('proceso de cierre')
  }

  cerrar() {
    this.activeModal.close()
  }


}
