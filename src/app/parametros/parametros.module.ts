import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ParametrosRoutingModule } from './parametros-routing.module';
import { BandejaParametroCalculoComponent } from './calculo-actuarial/bandeja-parametro-calculo/bandeja-parametro-calculo.component';
import { ValorParametroComponent } from './calculo-actuarial/valor-parametro/valor-parametro.component';
import { GrabarParametroComponent } from './calculo-actuarial/grabar-parametro/grabar-parametro.component';
import { EditarParametroComponent } from './calculo-actuarial/editar-parametro/editar-parametro.component';
import { BandejaParametroMoresperanzaComponent } from './mortalidad-esperanza/bandeja-parametro-moresperanza/bandeja-parametro-moresperanza.component';
import { CargaTablaMortalidadComponent } from './mortalidad-esperanza/carga-tabla-mortalidad/carga-tabla-mortalidad.component';



@NgModule({
  declarations: [

    BandejaParametroCalculoComponent,
    ValorParametroComponent,
    GrabarParametroComponent,
    EditarParametroComponent,
    BandejaParametroMoresperanzaComponent,
    CargaTablaMortalidadComponent],
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
