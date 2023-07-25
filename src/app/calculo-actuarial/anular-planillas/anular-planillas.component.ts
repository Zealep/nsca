import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anular-planillas',
  templateUrl: './anular-planillas.component.html',
  styleUrls: ['./anular-planillas.component.scss']
})
export class AnularPlanillasComponent {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  cerrar(){
    this.router.navigate(['/calculo-actuarial/solicitud-bandeja'])

  }

}
