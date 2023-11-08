import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, catchError } from 'rxjs';
import { BandejaSolicitud } from 'src/app/interfaces/bandeja-solicitud';
import { BandejaSolicitudCarga } from 'src/app/interfaces/bandeja-solicitud-carga';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-generar-reporte-calculo-actuarial',
  templateUrl: './generar-reporte-calculo-actuarial.component.html',
  styleUrls: ['./generar-reporte-calculo-actuarial.component.scss']
})
export class GenerarReporteCalculoActuarialComponent {
  usuario!: string
  @Input() solicitud!: BandejaSolicitud

  checkGastosAdmi: boolean = false;

  checkReportes = {
    resumenPensionista: false,
    anexoPensionista: false,
    resumenAsegurado: false,
    anexoAsegurado: false,
    resumenConsolidado: false,
    informeConsolidado: false
  }

  moneda!: string


  constructor(private router: Router,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private solicitudService: SolicitudService,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService,
    private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.usuario = sessionStorage.getItem('usuario')!
  }

  cerrar() {
    this.activeModal.close()
  }

  generarReporte() {

    let gastAdmi = this.checkGastosAdmi ? "1" : "0"

    let tipos: string[] = []

    if (this.checkReportes.resumenPensionista)
      tipos.push('1')

    if (this.checkReportes.anexoPensionista)
      tipos.push('2')

    if (this.checkReportes.resumenAsegurado)
      tipos.push('3')

    if (this.checkReportes.anexoAsegurado)
      tipos.push('4')

    if (this.checkReportes.resumenConsolidado)
      tipos.push('5')

    if (this.checkReportes.informeConsolidado)
      tipos.push('6')

    this.spinnerService.show()

    this.solicitudService.descargarReporte(this.solicitud.idSolicitud, gastAdmi, this.moneda, tipos.join(','))
      .pipe(catchError(error => {
        console.log('error', error);
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(res => {

        const blob = new Blob([res], { type: 'application/zip' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'SCAInfoCalcActu.zip'; // Establece el nombre del archivo
        link.click();
        this.spinnerService.hide()
      })

  }

}
