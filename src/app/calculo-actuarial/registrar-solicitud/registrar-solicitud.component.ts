import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Solicitud } from './../../interfaces/solicitud';
import { Util } from 'src/app/shared/util';
import { catchError, concatMap, EMPTY, of } from 'rxjs';
import { RegistroSolicitudOkComponent } from './registro-solicitud-ok/registro-solicitud-ok.component';
import { ParametroList } from 'src/app/interfaces/param';
import { RegistroSolicitudErrorComponent } from './registro-solicitud-error/registro-solicitud-error.component';
import { Router } from '@angular/router';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-registrar-solicitud',
  templateUrl: './registrar-solicitud.component.html',
  styleUrls: ['./registrar-solicitud.component.css']
})
export class RegistrarSolicitudComponent implements OnInit {

  usuario!: string
  maxLength: number = 300; // Número máximo de caracteres permitidos
  remainingChars: number = this.maxLength;
  fechaActual: string = new Date().toISOString().substring(0, 10)
  loading: boolean = false;
  invalid: boolean = false

  listaParametros: ParametroList = {
    items: []
  }


  form: FormGroup = new FormGroup({
    periodoCalculo: new FormControl('', [Validators.required, this.customValidator]),
    tipoSolicitud: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    cargo: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    observacion: new FormControl(''),
    checkPensionista: new FormControl(false),
    checkContAdmini: new FormControl(false),
    checkAfiliado: new FormControl(false),
    checkContJudicial: new FormControl(false),
  });

  constructor(public activeModal: NgbActiveModal,
    public modal: NgbModal,
    private solicitudService: SolicitudService,
    private router: Router,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.usuario = sessionStorage.getItem('usuario')!
    this.getTipoSolicitud()
  }

  getTipoSolicitud() {

    this.solicitudService.getTiposDeSolicitud()
      .pipe(catchError(error => {
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(x => {
        this.listaParametros = x
      })
  }


  guardar() {

    const tipoSoliciutd = this.form.get('tipoSolicitud')?.value;
    const periodo = this.form.get('periodoCalculo')?.value;

    if (tipoSoliciutd === '01') {
      if (periodo.substring(4, 6) !== '12') {
        this.invalid = true
        return;
      }
    }


    this.loading = true

    const solicitud: Solicitud =
    {
      descSolicitud: this.form.get('descripcion')?.value,
      fechRecepcion: Util.formatearFecha(new Date()),
      tipoSolicitud: this.form.get('tipoSolicitud')?.value,
      nombSolicitante: this.form.get('nombre')?.value,
      cargSolicitante: this.form.get('cargo')?.value,
      mailSolicitante: this.form.get('correo')?.value,
      observacion: this.form.get('observacion')?.value,
      indPensionistas: this.form.get('checkPensionista')?.value ? 'S' : 'N',
      indActivos: this.form.get('checkAfiliado')?.value ? 'S' : 'N',
      indContAdm: this.form.get('checkContAdmini')?.value ? 'S' : 'N',
      indContJud: this.form.get('checkContJudicial')?.value ? 'S' : 'N',
      idUsuacrea: 'CPELAEZ',
      ipUsuacrea: '127.0.0.1'
    }




    this.solicitudService.validarPeriodoSolicitud(tipoSoliciutd, periodo)
      .pipe(
        concatMap((resultado) => {
          if (resultado.indExistePeriodo === '0') {
            return this.solicitudService.registrarSolicitud(solicitud, tipoSoliciutd, periodo)
          } else {
            this.loading = false
            const errorModal = this.modal.open(RegistroSolicitudErrorComponent)
            errorModal.closed.subscribe(x => {

            })
            return EMPTY
          }
        }),
        catchError(error => {
          this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
          this.loading = false
          return of(null); // Retornar un observable con valor nulo para evitar que el error se propague
        })
      ).subscribe(x => {
        this.loading = false
        const codSolicitud = x.data.codSolicitud

        const okModal = this.modal.open(RegistroSolicitudOkComponent,
          {
            backdrop: 'static',
            keyboard: false
          }
        )

        okModal.componentInstance.codSolicitud = codSolicitud

        okModal.closed.subscribe(x => {
          this.activeModal.close('refresh')
        })

      })

  }

  limpiar() {
    this.form.reset()
    /*
    this.form.controls['checkPensionista'].setValue(true)
    this.form.controls['checkContAdmini'].setValue(true)
    this.form.controls['checkAfiliado'].setValue(true)
    this.form.controls['checkContJudicial'].setValue(true)
    */
  }

  close() {
    this.activeModal.close()
  }

  selectTipoSolicitud() {

    const tipSol = this.form.get('tipoSolicitud')?.value

    if (tipSol === '01') {
      this.form.controls['checkPensionista'].setValue(true)
      this.form.controls['checkContAdmini'].setValue(true)
      this.form.controls['checkAfiliado'].setValue(true)
      this.form.controls['checkContJudicial'].setValue(true)
      this.form.controls['checkPensionista'].disable()
      this.form.controls['checkContAdmini'].disable()
      this.form.controls['checkAfiliado'].disable()
      this.form.controls['checkContJudicial'].disable()
    } else {
      this.form.controls['checkPensionista'].enable()
      this.form.controls['checkContAdmini'].enable()
      this.form.controls['checkAfiliado'].enable()
      this.form.controls['checkContJudicial'].enable()
    }
  }


  customValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;
    const year = parseInt(value.slice(0, 4));
    const month = parseInt(value.slice(4, 6));

    const currentYear = new Date().getFullYear();

    if (value.length !== 6) {
      return { invalidFormat: true };
    } else if (year > currentYear) {
      return { invalidYear: true };
    } else if (month < 1 || month > 12) {
      return { invalidMonth: true };
    }
    else if (year < 2000) {
      return { invalidYearMayor: true };
    }

    return null;
  }


  getValidationErrorMessage(): string {
    const inputControl = this.form.get('periodoCalculo');
    if (inputControl!.hasError('invalidFormat')) {
      return 'Por favor ingresa el formato (YYYYMM).';
    } else if (inputControl!.hasError('invalidYear')) {
      return '(YYYY) No puede ser mayor al año actual.';
    } else if (inputControl!.hasError('invalidMonth')) {
      return 'El mes debe comprender entre 01 y 12.';
    }
    else if (inputControl!.hasError('invalidYearMayor')) {
      return 'El año tiene que ser mayor al 2000'
    }

    return '';
  }

  soloNumeros(e: KeyboardEvent): boolean {
    const input = e.key;
    const regExp = /^[0-9]+$/;
    return regExp.test(input);
  }

  onTextareaInput(event: Event): void {
    const inputValue = (event.target as HTMLTextAreaElement).value;
    this.remainingChars = this.maxLength - inputValue.length;
  }


}
