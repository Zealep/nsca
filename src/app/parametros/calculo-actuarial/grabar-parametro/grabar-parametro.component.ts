import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { ParametroService } from 'src/app/services/parametro.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastService } from 'src/app/services/toast.service';
import { BandejaParametro } from '../../../interfaces/bandeja-parametros';
import { Valor } from 'src/app/interfaces/valort';
import { CamposDinamicos } from 'src/app/interfaces/campos-form-parametros';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CamposValores } from 'src/app/interfaces/campos-valores';
import { EMPTY, catchError } from 'rxjs';
import { ParametroRequest } from 'src/app/interfaces/parametro-request';

@Component({
  selector: 'app-grabar-parametro',
  templateUrl: './grabar-parametro.component.html',
  styleUrls: ['./grabar-parametro.component.scss']
})
export class GrabarParametroComponent {

  @Input() solicitud!: BandejaParametro
  usuario!: string
  campos: CamposDinamicos[] = []
  idValor!: string

  formulario!: FormGroup;

  constructor(private router: Router,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private solicitudService: SolicitudService,
    private parametroService: ParametroService,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService,
    private fb: FormBuilder) {

    this.formulario = this.fb.group({})


  }

  ngOnInit() {
    this.usuario = sessionStorage.getItem('usuario')!

    if (this.solicitud.valores.length < 1) {
      alert('No hay una estructura definida para mostrar');
      return;
    }

    this.solicitud.valores[0].detalle.forEach(x => {
      let c: CamposDinamicos = {
        id: x.idCamp,
        label: x.vlCamp.split("|")[0],
        tipo: x.vlCamp.split("|")[1],
        valor: ""
      }
      this.campos.push(c)
      this.formulario.addControl(c.label, this.fb.control(c.valor, this.getValidations(c.tipo)))
    })

  }

  grabar() {
    console.log('formValues', this.formulario.value);
    console.log('idvalor', this.idValor);
    if (this.idValor === undefined || this.idValor === '') {
      this.toastService.show('Debes ingresar un ID valor', { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
      return;
    }

    const valoresReq: CamposValores[] = []
    const arreglo: [string, string][] = Object.entries(this.formulario.value);

    for (const [clave, valor] of arreglo) {
      console.log(`Clave: ${clave}, Valor: ${valor}`);
      valoresReq.push({
        idCamp: this.campos.find(campo => campo.label === clave)?.id || '',
        tiTipoCamp: this.campos.find(campo => campo.label === clave)?.tipo || '',
        vlCamp: valor.toString()
      })
    }

    console.log('request', valoresReq);

    const req: ParametroRequest = {
      idUsuamodi: this.usuario,
      ipUsuamodi: '127.0.0.1',
      campos: valoresReq
    }


    this.spinnerService.show()
    this.parametroService.saveParametros(this.solicitud.idTabl, this.idValor, req)
      .pipe(catchError(error => {
        console.log('error', error);
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(res => {
        this.spinnerService.hide()
        if (res.indEjecucion === '1')
          this.toastService.show('Se grabo el valor correctamente', { classname: 'bg-success text-white', delay: 3000, icon: 'check' })
        this.cerrar()

      })
  }

  cerrar() {
    this.activeModal.close()
  }

  // Función para obtener validaciones en función del tipo de dato
  getValidations(tipoDato: string) {
    switch (tipoDato) {
      case '1': // Número
        return [Validators.required, Validators.pattern(/^\d+$/)];
      case '3': // Correo electrónico
        return [Validators.required, Validators.email];
      default: // Otros tipos
        return [Validators.required];
    }
  }

}
