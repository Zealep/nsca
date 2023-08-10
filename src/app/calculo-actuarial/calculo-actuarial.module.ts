import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es-PE';
import { CalculoActuarialRoutingModule } from './calculo-actuarial-routing.module';
import { BandejaCalculoActuarialComponent } from './bandeja-calculo-actuarial/bandeja-calculo-actuarial.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegistrarSolicitudComponent } from './registrar-solicitud/registrar-solicitud.component';
import { VerDetalleSolicitudComponent } from './ver-detalle-solicitud/ver-detalle-solicitud.component';
import { VerDetalleParametrosComponent } from './ver-detalle-parametros/ver-detalle-parametros.component';
import { VerDetalleMovimientosComponent } from './ver-detalle-movimientos/ver-detalle-movimientos.component';
import { AnularPlanillasComponent } from './anular-planillas/anular-planillas.component';
import { AnularSolicitudComponent } from './anular-solicitud/anular-solicitud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared/shared.module';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { CargaInformacionDiecinueveComponent } from './carga-informacion-diecinueve/carga-informacion-diecinueve.component';
import { SortableHeaderDirective } from './sortable-header.directive';


@NgModule({
  declarations: [BandejaCalculoActuarialComponent, RegistrarSolicitudComponent, VerDetalleSolicitudComponent, VerDetalleParametrosComponent, VerDetalleMovimientosComponent, AnularPlanillasComponent, AnularSolicitudComponent, CargaInformacionDiecinueveComponent,
    SortableHeaderDirective],
  imports: [
    CommonModule,
    CalculoActuarialRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    NgbToast
  ],
})
export class CalculoActuarialModule { }
