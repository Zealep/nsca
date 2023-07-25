import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CalculoActuarialModule } from './calculo-actuarial/calculo-actuarial.module';

const routes: Routes = [
  {
    path: 'calculo-actuarial', loadChildren: () =>
      import('./calculo-actuarial/calculo-actuarial.module').then(m => m.CalculoActuarialModule)
  },
  {
    path: 'menu-02', loadChildren: () =>
      import('./menu02/menu02.module').then(m => m.Menu02Module)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true, // <-- debugging purposes only
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
