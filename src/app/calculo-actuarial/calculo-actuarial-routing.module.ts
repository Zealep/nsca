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
import { RevisarConsistenciarComponent } from "./revisar-consistenciar/revisar-consistenciar.component";
import { BandejaExtrapolarComponent } from "./extrapolar-resultados/bandeja-extrapolar/bandeja-extrapolar.component";
import { BandejaAprobarComponent } from './aprobar-calculo/bandeja-aprobar/bandeja-aprobar.component';
import { BandejaParametroMoresperanzaComponent } from '../parametros/mortalidad-esperanza/bandeja-parametro-moresperanza/bandeja-parametro-moresperanza.component';

const routes: Routes = [
  { path: 'solicitudBandeja', component: BandejaCalculoActuarialComponent },
  { path: 'cargaInformacionNoventa', component: BandejaCargaDiecinueveComponent },
  { path: 'calcularInformacionNoventa', component: BandejaCalcularDiecinueveComponent },
  { path: 'revisarConsistenciar', component: RevisarConsistenciarComponent },
  { path: 'extrapolarContingencias', component: BandejaExtrapolarComponent },
  { path: 'aprobarCalculo', component: BandejaAprobarComponent },
  { path: 'cargaInformacionEstImpact', component: BandejaParametroMoresperanzaComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [

  ]
})
export class CalculoActuarialRoutingModule { }
