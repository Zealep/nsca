import { Component, Input } from '@angular/core';
import { BandejaSolicitudCalculo } from "../../../interfaces/bandeja-solicitud-calculo";
import { Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SolicitudService } from "../../../services/solicitud.service";
import { SpinnerOverlayService } from "../../../services/overlay.service";
import { ToastService } from "../../../services/toast.service";
import { ConfirmDialogComponent } from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import { catchError, EMPTY } from "rxjs";
import { ResultadoExtrapolarComponent } from "../resultado-extrapolar/resultado-extrapolar.component";
import { BandejaExtrapolar } from 'src/app/interfaces/bandeja-extrapolar';

@Component({
  selector: 'app-ver-extrapolar',
  templateUrl: './ver-extrapolar.component.html',
  styleUrls: ['./ver-extrapolar.component.scss']
})
export class VerExtrapolarComponent {

  usuario!: string

  @Input() solicitud!: BandejaExtrapolar

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

  dialogExtrapolar(tipoPlanilla: string, tipoPlanillaNombre: string) {
    const modalRef = this.modal.open(ResultadoExtrapolarComponent)
    modalRef.componentInstance.solicitud = this.solicitud
    modalRef.componentInstance.tipoPlanilla = tipoPlanilla
    modalRef.componentInstance.tipoPlanillaNombre = tipoPlanillaNombre
    modalRef.closed.subscribe(result => {
      if (result) {
      }
    })

  }

  cerrar() {
    this.activeModal.close()
  }


}
