import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anular-solicitud',
  templateUrl: './anular-solicitud.component.html',
  styleUrls: ['./anular-solicitud.component.scss']
})
export class AnularSolicitudComponent {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cerrar() {
    this.router.navigate(['/calculo-actuarial/solicitud-bandeja'])
  }

  anular(){
    
  }

}
