import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandejaParametroCalculoComponent } from './bandeja-parametro-calculo/bandeja-parametro-calculo.component';


const routes: Routes = [
  { path: 'paramCalculoActuarial', component: BandejaParametroCalculoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
