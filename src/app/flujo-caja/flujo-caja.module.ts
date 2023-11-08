import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlujoCajaRoutingModule } from './flujo-caja-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { BandejaDlDiecinueveComponent } from './bandeja-dl-diecinueve/bandeja-dl-diecinueve.component';


@NgModule({
  declarations: [
    BandejaDlDiecinueveComponent,
  ],
  imports: [
    CommonModule,
    FlujoCajaRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    NgbToast
  ]
})
export class FlujoCajaModule { }
