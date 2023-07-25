import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Menu01RoutingModule } from './menu01-routing.module';
import {Menu01ListComponent} from './menu01-list/menu01-list.component';

@NgModule({
  declarations: [Menu01ListComponent],
  imports: [
    CommonModule,
    Menu01RoutingModule,
  ]
})
export class Menu01Module { }
