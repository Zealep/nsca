import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandejaParametroCalculoComponent } from './calculo-actuarial/bandeja-parametro-calculo/bandeja-parametro-calculo.component';
import { BandejaParametroMoresperanzaComponent } from './mortalidad-esperanza/bandeja-parametro-moresperanza/bandeja-parametro-moresperanza.component';


const routes: Routes = [
  { path: 'paramCalculoActuarial', component: BandejaParametroCalculoComponent },
  { path: 'morEsperanzaVida', component: BandejaParametroMoresperanzaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
