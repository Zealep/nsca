import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CalculoActuarialModule } from './calculo-actuarial/calculo-actuarial.module';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGaurdService } from './services/auth/auth-gaurd.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: '/calculoActuarial', pathMatch: 'full' },
      {
        path: 'calculoActuarial', loadChildren: () =>
          import('./calculo-actuarial/calculo-actuarial.module').then(m => m.CalculoActuarialModule),
        canLoad: [AuthGaurdService],
      },
      {
        path: 'reportes', loadChildren: () =>
          import('./reportes/reportes.module').then(m => m.ReportesModule),
        canLoad: [AuthGaurdService],
      },
      {
        path: 'parametros', loadChildren: () =>
          import('./parametros/parametros.module').then(m => m.ParametrosModule),
        canLoad: [AuthGaurdService],
      }
    ]

  },


  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //enableTracing: true, // <-- debugging purposes only
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
