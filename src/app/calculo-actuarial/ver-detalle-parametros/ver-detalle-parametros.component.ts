import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-detalle-parametros',
  templateUrl: './ver-detalle-parametros.component.html',
  styleUrls: ['./ver-detalle-parametros.component.css']
})
export class VerDetalleParametrosComponent implements OnInit {

  p: number = 1;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  cerrar(){
    this.router.navigate(['/calculo-actuarial/solicitud-bandeja'])

  }

  descargar(){}

  verMovimientos(){
    this.router.navigate(['/calculo-actuarial/ver-detalle-movimientos'])
  }

}
