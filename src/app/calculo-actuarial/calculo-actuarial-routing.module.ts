import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandejaCalculoActuarialComponent } from './bandeja-calculo-actuarial/bandeja-calculo-actuarial.component';
import { RegistrarSolicitudComponent } from './registrar-solicitud/registrar-solicitud.component';
import { VerDetalleSolicitudComponent } from './ver-detalle-solicitud/ver-detalle-solicitud.component';
import { VerDetalleParametrosComponent } from './ver-detalle-parametros/ver-detalle-parametros.component';
import { VerDetalleMovimientosComponent } from './ver-detalle-movimientos/ver-detalle-movimientos.component';
import { AnularPlanillasComponent } from './anular-planillas/anular-planillas.component';
import { AnularSolicitudComponent } from './anular-solicitud/anular-solicitud.component';

const routes: Routes = [
  { path: 'solicitud-bandeja', component: BandejaCalculoActuarialComponent },
  { path: 'ver-detalle-solicitud', component: VerDetalleSolicitudComponent },
  { path: 'ver-detalle-parametros', component: VerDetalleParametrosComponent },
  { path: 'ver-detalle-movimientos', component: VerDetalleMovimientosComponent },
  { path: 'anular-planillas', component: AnularPlanillasComponent },
  { path: 'anular-solicitud', component: AnularSolicitudComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculoActuarialRoutingModule { }
