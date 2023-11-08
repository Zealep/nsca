import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BandejaSolicitud } from 'src/app/interfaces/bandeja-solicitud';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { ParametroService } from 'src/app/services/parametro.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastService } from 'src/app/services/toast.service';
import { GrabarParametroComponent } from '../grabar-parametro/grabar-parametro.component';
import { BandejaSolicitudRevisar } from 'src/app/interfaces/bandeja-solicitud-revisar';
import { Router } from '@angular/router';
import { BandejaParametro } from 'src/app/interfaces/bandeja-parametros';
import { Valor } from 'src/app/interfaces/valort';
import { EditarParametroComponent } from '../editar-parametro/editar-parametro.component';

@Component({
  selector: 'app-valor-parametro',
  templateUrl: './valor-parametro.component.html',
  styleUrls: ['./valor-parametro.component.scss']
})
export class ValorParametroComponent {
  usuario!: string

  @Input() solicitud!: BandejaParametro

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
    const modalRef = this.modal.open(GrabarParametroComponent,
      {
        size: 'lg'
      });
    modalRef.componentInstance.solicitud = this.solicitud
    modalRef.closed.subscribe(x => {
      this.cerrar()
    })
  }

  editar(p: Valor) {
    const modalRef = this.modal.open(EditarParametroComponent,
      {
        size: 'lg'
      });
    modalRef.componentInstance.valor = p
    modalRef.componentInstance.solicitud = this.solicitud
    modalRef.closed.subscribe(x => {
      this.cerrar()
    })
  }


  cerrar() {
    this.activeModal.close()
  }


}

