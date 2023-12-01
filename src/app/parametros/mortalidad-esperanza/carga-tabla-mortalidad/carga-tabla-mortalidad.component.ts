import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, catchError } from 'rxjs';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { ParametroService } from 'src/app/services/parametro.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastService } from 'src/app/services/toast.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-carga-tabla-mortalidad',
  templateUrl: './carga-tabla-mortalidad.component.html',
  styleUrls: ['./carga-tabla-mortalidad.component.scss']
})
export class CargaTablaMortalidadComponent {

  usuario!: string

  constructor(private router: Router,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private parametroService: ParametroService,
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

  cargarPlanilla() {

    if (this.files.length > 0) {
      let formData = new FormData()
      formData.append('archivo', this.files[0])
      const modalRef = this.modal.open(ConfirmDialogComponent)
      modalRef.componentInstance.message = `¿¿Desea cargar los parámetros de mortalidad y esperanza de vida??`;

      modalRef.closed.subscribe(result => {
        if (result) {
          this.ejecutarCarga(formData);
        }
      })
    }
  }

  ejecutarCarga(formData: FormData) {
    const usuario = sessionStorage.getItem('usuario')!
    const ip = '127.0.0.1'

    this.spinnerService.show()
    this.parametroService.cargarTablaMortalidad(usuario, ip, formData)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        this.fileDropEl.nativeElement.value = "";
        return EMPTY
      }))
      .subscribe(res => {
        this.spinnerService.hide()
        this.activeModal.close()
        this.toastService.show(`Se cargo la tabla de mortalidad correctamente`, { classname: 'bg-success text-white', delay: 3000, icon: 'check' })
      })
  }


  cerrar() {
    this.activeModal.close()
  }

}
