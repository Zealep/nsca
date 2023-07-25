import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Menu02ListComponent } from './menu02-list/menu02-list.component';

const routes: Routes = [
  { path: '',  component: Menu02ListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Menu02RoutingModule { }
