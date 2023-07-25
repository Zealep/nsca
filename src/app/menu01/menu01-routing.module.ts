import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Menu01ListComponent } from './menu01-list/menu01-list.component';

const routes: Routes = [
  { path: '',  component: Menu01ListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Menu01RoutingModule { }
