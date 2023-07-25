import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es-PE';

import { CalculoActuarialRoutingModule } from './calculo-actuarial-routing.module';
import { BandejaCalculoActuarialComponent } from './bandeja-calculo-actuarial/bandeja-calculo-actuarial.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegistrarSolicitudComponent } from './registrar-solicitud/registrar-solicitud.component';
import { VerDetalleSolicitudComponent } from './ver-detalle-solicitud/ver-detalle-solicitud.component';
import { VerDetalleParametrosComponent } from './ver-detalle-parametros/ver-detalle-parametros.component';


@NgModule({
  declarations: [BandejaCalculoActuarialComponent, RegistrarSolicitudComponent, VerDetalleSolicitudComponent, VerDetalleParametrosComponent],
  imports: [
    CommonModule,
    CalculoActuarialRoutingModule,
    NgxPaginationModule
  ],
})
export class CalculoActuarialModule { }
