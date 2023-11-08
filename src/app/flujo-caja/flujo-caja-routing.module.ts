import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandejaDlDiecinueveComponent } from './bandeja-dl-diecinueve/bandeja-dl-diecinueve.component';

const routes: Routes = [
  { path: 'flujoDiecinueve', component: BandejaDlDiecinueveComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlujoCajaRoutingModule { }
