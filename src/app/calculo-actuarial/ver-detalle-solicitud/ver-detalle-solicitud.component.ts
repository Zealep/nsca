import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-detalle-solicitud',
  templateUrl: './ver-detalle-solicitud.component.html',
  styleUrls: ['./ver-detalle-solicitud.component.css']
})
export class VerDetalleSolicitudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cerrar() {

  }

  verDetalleParametro() {
    this.router.navigate(['/calculo-actuarial/ver-detalle-parametros'])

  }

  verDetalleMovimiento() {

  }

}
