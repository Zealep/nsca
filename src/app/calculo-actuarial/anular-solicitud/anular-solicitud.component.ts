import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog-model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { SolicPlaniMov } from 'src/app/interfaces/solicitud-plani-mov';
import { catchError, EMPTY } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-anular-solicitud',
  templateUrl: './anular-solicitud.component.html',
  styleUrls: ['./anular-solicitud.component.scss']
})
export class AnularSolicitudComponent {

  codSolicitud!: string

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
    private solicitudService: SolicitudService,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.codSolicitud = this.route.snapshot.paramMap.get('codSolicitud')!;
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
    this.router.navigate(['/calculo-actuarial/solicitud-bandeja'])
  }

  anular() {

    const modalRef = this.modal.open(ConfirmDialogComponent);
    modalRef.componentInstance.message = `¿Está seguro que desea anular la solicitud N° ${this.solicitud.codSolicitud}?`; // Puedes cambiar el valor del ID según lo que necesites

    modalRef.closed.subscribe(result => {
      if (result) {
        this.requestEliminar();
      }
    })

  }

  requestEliminar() {
    this.solicitudService.anularSolicitud(this.solicitud.codSolicitud)
      .pipe(catchError(error => {
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe((res: any) => {
        if (res.indEliminacion === '1')
          this.router.navigate(['/calculo-actuarial/solicitud-bandeja'])
        this.toastService.show('Se elimino la solicitud correctamente', { classname: 'bg-success text-white', delay: 3000, icon: 'check' })
      });

  }



}
