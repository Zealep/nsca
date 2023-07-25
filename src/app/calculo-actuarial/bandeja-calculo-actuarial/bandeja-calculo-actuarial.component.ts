import { Component, OnInit } from '@angular/core';
import { solicitudes } from '../../mocks/bandeja-solicitud';
import { Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrarSolicitudComponent } from '../registrar-solicitud/registrar-solicitud.component';

@Component({
  selector: 'app-bandeja-calculo-actuarial',
  templateUrl: './bandeja-calculo-actuarial.component.html',
  styleUrls: ['./bandeja-calculo-actuarial.component.css']
})
export class BandejaCalculoActuarialComponent implements OnInit {

  solicitudes = solicitudes
  p: number = 1;

  constructor(private router: Router,
    private registrarModal: NgbModal) { }

  ngOnInit() {
  }

  registrarSolicitud() {
    const modalRef = this.registrarModal.open(RegistrarSolicitudComponent);
    modalRef.componentInstance.id = 123; // Puedes cambiar el valor del ID según lo que necesites

  }

  verDetalle() {
    this.router.navigate(['/calculo-actuarial/ver-detalle-solicitud']);

  }

  anularPlanillas(){
    this.router.navigate(['/calculo-actuarial/anular-planillas'])
  }

  
  anularSolicitud(){
    this.router.navigate(['/calculo-actuarial/anular-solicitud'])
  }
}
