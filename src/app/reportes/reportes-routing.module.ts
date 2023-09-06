import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteCalculoActuarialComponent } from './reporte-calculo-actuarial/reporte-calculo-actuarial.component';

const routes: Routes = [
  { path: 'reporteCalculoActuarialNoventa', component: ReporteCalculoActuarialComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
