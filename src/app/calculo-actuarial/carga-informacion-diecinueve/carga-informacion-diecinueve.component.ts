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

  mostrarCarga: boolean = false

  @Input() solicitud!: BandejaSolicitudCarga


  constructor(private router: Router,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private solicitudService: SolicitudService,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService) {

  }

  ngOnInit() {

  }

  @ViewChild("fileDropRef", { static: false }) fileDropEl!: ElementRef;
  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler($event: any) {
    const files = $event.target.files;
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    /*
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }*/
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  /*
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }
  */

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      //item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
    //this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
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


  cerrar() {
    this.activeModal.close()
  }
  test() {
    this.spinnerService.show()
    setTimeout(() => {
      this.spinnerService.hide()
    }, 5000)
  }

  mostrarCargaArchivo(codPlanilla: string) {
    if (codPlanilla === COD_PLANILLA_ASEGURADOS) {
      this.mostrarCarga = false
      console.log('cargar por bd');
    } else {
      this.mostrarCarga = true
    }
  }

  descargarInconsistencias(codPlanilla: string) {

  }


}
