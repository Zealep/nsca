import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { ParametroService } from 'src/app/services/parametro.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastService } from 'src/app/services/toast.service';
import { BandejaParametro } from '../../interfaces/bandeja-parametros';
import { Valor } from 'src/app/interfaces/valort';

@Component({
  selector: 'app-grabar-parametro',
  templateUrl: './grabar-parametro.component.html',
  styleUrls: ['./grabar-parametro.component.scss']
})
export class GrabarParametroComponent {

  @Input() solicitud!: BandejaParametro
  @Input() valor!: Valor
  usuario!: string


  constructor(private router: Router,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private solicitudService: SolicitudService,
    private parametroService: ParametroService,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService) {

  }

  ngOnInit() {
    this.usuario = sessionStorage.getItem('usuario')!
  }

  grabar() {

  }

  cerrar() {
    this.activeModal.close()
  }

}
