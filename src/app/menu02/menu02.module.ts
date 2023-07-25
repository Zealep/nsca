import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Menu02RoutingModule } from './menu02-routing.module';
import { Menu02ListComponent } from './menu02-list/menu02-list.component';

@NgModule({
  declarations: [Menu02ListComponent],
  imports: [
    CommonModule,
    Menu02RoutingModule,  
  ]
})
export class Menu02Module { }
