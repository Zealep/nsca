import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import es from '@angular/common/locales/es-PE';
import { registerLocaleData } from '@angular/common';
import { NgbModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from './shared/shared.module';
import { MainComponent } from './main/main.component';


registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HeaderComponent,
    LoginComponent,
    ProgressSpinnerComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-PE' },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
