import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, catchError } from 'rxjs';
import { SolicPlaniMov } from 'src/app/interfaces/solicitud-plani-mov';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastService } from 'src/app/services/toast.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-anular-planillas',
  templateUrl: './anular-planillas.component.html',
  styleUrls: ['./anular-planillas.component.scss']
})
export class AnularPlanillasComponent {

  usuario!: string
  @Input() codSolicitud!: string

  solicitud: SolicPlaniMov =
    {
      codSolicitud: '',
      descSolicitud: '',
      anhoCalculo: '',
      fechRecepcion: '',
      tipoSolicitud: '',
      desTipoSolicitud: '',
      nombSolicitante: '',
      cargSolicitante: '',
      mailSolicitante: '',
      observacion: '',
      indPensionistas: '',
      indActivos: '',
      indContAdm: '',
      indContJud: '',
      planilla: [],
      movimiento: []
    }


  constructor(private router: Router,
    private modal: NgbModal,
    private route: ActivatedRoute,
    private activeModal: NgbActiveModal,
    private solicitudService: SolicitudService,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.usuario = sessionStorage.getItem('usuario')!
    this.getSolicitudPlanillaMovimiento()
  }

  getSolicitudPlanillaMovimiento() {
    this.spinnerService.show()
    this.solicitudService.getSolicitudPlanillaMovimiento(this.codSolicitud)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(x => {
        this.spinnerService.hide()
        this.solicitud = x
      })
  }

  cerrar() {
    this.activeModal.close()

  }

  eliminar(idPlanilla: string, nombre: string) {
    const modalRef = this.modal.open(ConfirmDialogComponent)
    modalRef.componentInstance.message = `¿Está seguro que desea anular la planilla ${nombre}?`;

    modalRef.closed.subscribe(result => {
      if (result) {
        this.requestEliminar(idPlanilla);
      }
    })
  }

  requestEliminar(codPlanilla: string) {

    this.spinnerService.show()

    this.solicitudService.anularPlanilla(this.solicitud.codSolicitud, codPlanilla)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe((res: any) => {
        this.spinnerService.hide()
        if (res.indEliminacion === '1')
          this.toastService.show('Se elimino la planilla correctamente', { classname: 'bg-success text-white', delay: 3000, icon: 'check' })
        this.getSolicitudPlanillaMovimiento()
      });
  }

}
