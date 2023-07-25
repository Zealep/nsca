import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-detalle-movimientos',
  templateUrl: './ver-detalle-movimientos.component.html',
  styleUrls: ['./ver-detalle-movimientos.component.scss']
})
export class VerDetalleMovimientosComponent {
  p: number = 1;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  cerrar(){
    this.router.navigate(['/calculo-actuarial/solicitud-bandeja'])

  }

  descargar(){}

  verParametros(){
    this.router.navigate(['/calculo-actuarial/ver-detalle-parametros'])
  }
}
