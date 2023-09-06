import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteCalculoActuarialComponent } from './reporte-calculo-actuarial/reporte-calculo-actuarial.component';
import { GenerarReporteCalculoActuarialComponent } from './generar-reporte-calculo-actuarial/generar-reporte-calculo-actuarial.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ReporteCalculoActuarialComponent,
    GenerarReporteCalculoActuarialComponent,
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    NgbToast
  ]
})
export class ReportesModule { }
