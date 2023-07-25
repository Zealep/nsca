import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandejaCalculoActuarialComponent } from './bandeja-calculo-actuarial/bandeja-calculo-actuarial.component';
import { RegistrarSolicitudComponent } from './registrar-solicitud/registrar-solicitud.component';
import { VerDetalleSolicitudComponent } from './ver-detalle-solicitud/ver-detalle-solicitud.component';
import { VerDetalleParametrosComponent } from './ver-detalle-parametros/ver-detalle-parametros.component';

const routes: Routes = [
  { path: 'solicitud-bandeja', component: BandejaCalculoActuarialComponent },
  { path: 'ver-detalle-solicitud', component: VerDetalleSolicitudComponent },
  { path: 'ver-detalle-parametros', component: VerDetalleParametrosComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculoActuarialRoutingModule { }
