import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandejaCalculoActuarialComponent } from './bandeja-calculo-actuarial/bandeja-calculo-actuarial.component';
import { RegistrarSolicitudComponent } from './registrar-solicitud/registrar-solicitud.component';
import { VerDetalleSolicitudComponent } from './ver-detalle-solicitud/ver-detalle-solicitud.component';
import { VerDetalleParametrosComponent } from './ver-detalle-parametros/ver-detalle-parametros.component';
import { VerDetalleMovimientosComponent } from './ver-detalle-movimientos/ver-detalle-movimientos.component';
import { AnularPlanillasComponent } from './anular-planillas/anular-planillas.component';
import { AnularSolicitudComponent } from './anular-solicitud/anular-solicitud.component';
import { SortableHeaderDirective } from './sortable-header.directive';
import { CargaInformacionDiecinueveComponent } from './carga-informacion-diecinueve/carga-informacion-diecinueve.component';
import { BandejaCargaDiecinueveComponent } from './carga-informacion-diecinueve/bandeja-carga-diecinueve/bandeja-carga-diecinueve.component';
import { BandejaCalcularDiecinueveComponent } from './realizar-calculo/bandeja-calcular-diecinueve/bandeja-calcular-diecinueve.component';

const routes: Routes = [
  { path: 'solicitudBandeja', component: BandejaCalculoActuarialComponent },
  { path: 'cargaInformacionNoventa', component: BandejaCargaDiecinueveComponent },
  { path: 'calcularInformacionNoventa', component: BandejaCalcularDiecinueveComponent },


  /*
  { path: 'ver-detalle-solicitud/:codSolicitud', component: VerDetalleSolicitudComponent },
  { path: 'ver-detalle-parametros/:codSolicitud', component: VerDetalleParametrosComponent },
  { path: 'ver-detalle-movimientos/:codSolicitud', component: VerDetalleMovimientosComponent },
  { path: 'anular-planillas/:codSolicitud', component: AnularPlanillasComponent },
  { path: 'anular-solicitud/:codSolicitud', component: AnularSolicitudComponent }
  */

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [

  ]
})
export class CalculoActuarialRoutingModule { }
