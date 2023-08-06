import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CalculoActuarialModule } from './calculo-actuarial/calculo-actuarial.module';
import { LoginComponent } from './login/login.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';

const routes: Routes = [
  {
    path: 'login',
    component: ProgressSpinnerComponent
  },
  {
    path: 'calculo-actuarial', loadChildren: () =>
      import('./calculo-actuarial/calculo-actuarial.module').then(m => m.CalculoActuarialModule)
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
