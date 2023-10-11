import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ParametrosRoutingModule } from './parametros-routing.module';
import { BandejaParametroCalculoComponent } from './bandeja-parametro-calculo/bandeja-parametro-calculo.component';
import { ValorParametroComponent } from './valor-parametro/valor-parametro.component';
import { GrabarParametroComponent } from './grabar-parametro/grabar-parametro.component';


@NgModule({
  declarations: [

  
    BandejaParametroCalculoComponent,
        ValorParametroComponent,
        GrabarParametroComponent
  ],
  imports: [
    CommonModule,
    ParametrosRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    NgbToast
  ]
})
export class ParametrosModule { }
