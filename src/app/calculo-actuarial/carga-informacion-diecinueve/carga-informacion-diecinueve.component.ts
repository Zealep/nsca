import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, catchError } from 'rxjs';
import { BandejaSolicitudCarga } from 'src/app/interfaces/bandeja-solicitud-carga';
import { SolicPlaniMov } from 'src/app/interfaces/solicitud-plani-mov';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastService } from 'src/app/services/toast.service';
import { COD_PLANILLA_ASEGURADOS } from 'src/app/shared/var.constant';

@Component({
  selector: 'app-carga-informacion-diecinueve',
  templateUrl: './carga-informacion-diecinueve.component.html',
  styleUrls: ['./carga-informacion-diecinueve.component.scss']
})
export class CargaInformacionDiecinueveComponent implements OnInit {

  usuario!: string
  mostrarCarga: boolean = false
  planillaSelected!: string | null
  nombreCarga: string = 'Contingencias 19990'

  @Input() solicitud!: BandejaSolicitudCarga


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

  @ViewChild("fileDropRef", { static: false }) fileDropEl!: ElementRef;
  files: any[] = [];

  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler($event: any) {
    const files = $event.target.files;
    this.prepareFilesList(files);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      this.files.push(item);
    }
    this.cargarPlanilla()
    this.fileDropEl.nativeElement.value = "";
  }


  formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  cargarPlanilla() {

    if (this.files.length > 0 && this.planillaSelected != null) {
      let formData = new FormData()
      formData.append('archivo', this.files[0])
      this.ejecutarCarga(this.planillaSelected, formData)
    }

  }

  ejecutarCarga(codPlanilla: string, formData: FormData) {

    const usuario = sessionStorage.getItem('usuario')!
    const ip = '127.0.0.1'

    this.spinnerService.show()
    this.solicitudService.cargarPlanilla(codPlanilla, this.solicitud.idSolicitud, usuario, ip, formData)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        this.fileDropEl.nativeElement.value = "";
        return EMPTY
      }))
      .subscribe(res => {
        this.updateTableLoad(res)
        this.spinnerService.hide()
        this.mostrarCarga = false
        this.toastService.show(`Se cargo la planilla de ${res.desTipPla} correctamente`, { classname: 'bg-success text-white', delay: 3000, icon: 'check' })
      })
  }


  updateTableLoad(res: any) {

    const codPlanilla = res.codTipPla
    const indexFound = this.solicitud.planilla.findIndex(planilla => planilla.codTipPla === codPlanilla)
    if (indexFound !== -1) {
      const planillaEncontrada = { ... this.solicitud.planilla[indexFound] }
      planillaEncontrada.codEst = res.codEst
      planillaEncontrada.desEst = res.desEst
      planillaEncontrada.numPerPla = res.numPerPla
      planillaEncontrada.indHabPlan = res.indHabPlan
      planillaEncontrada.indExisIncon = res.indExisIncon

      this.solicitud.planilla[indexFound] = planillaEncontrada
    }
  }

  cerrar() {
    this.activeModal.close()
  }
  test() {
    this.spinnerService.show()
    setTimeout(() => {
      this.spinnerService.hide()
    }, 5000)
  }

  mostrarCargaArchivo(codPlanilla: string, desPlanilla: string) {
    if (codPlanilla === COD_PLANILLA_ASEGURADOS) {
      this.planillaSelected = codPlanilla
      this.mostrarCarga = false
      let formData = new FormData()
      formData.append('archivo', '')
      this.ejecutarCarga(this.planillaSelected, formData)
    } else {
      this.mostrarCarga = true
      this.nombreCarga = desPlanilla
      this.planillaSelected = codPlanilla
    }
  }

  descargarInconsistencias(codPlanilla: string) {
    let name = 'Informe_InconsistenciasPDF'
    const usuario = sessionStorage.getItem('usuario')!
    this.spinnerService.show()
    //ip-request
    this.solicitudService.getInconsistencias(codPlanilla, this.solicitud.idSolicitud, usuario, 'localhost')
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(result => {
        this.spinnerService.hide()
        this.toastService.show('Se descargó el reporte de inconsistencias correctamente', { classname: 'bg-success text-white', delay: 3000, icon: 'check' })
        const url = window.URL.createObjectURL(result);
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.href = url;
        a.download = `${name}-${codPlanilla}.pdf`;
        a.click();
        return url;
      })

  }


}
