import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Root } from '../interfaces/root';
import { BandejaSolicitud } from '../interfaces/bandeja-solicitud';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Solicitud } from '../interfaces/solicitud';
import { ParametroSolicitud } from '../interfaces/parametro-solicitud';
import { SolicPlaniMov } from '../interfaces/solicitud-plani-mov';
import { ParametroList } from '../interfaces/param';
import { BandejaSolicitudCarga } from '../interfaces/bandeja-solicitud-carga';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private url: string = `${environment.host}`;

  constructor(private router: Router,
    private http: HttpClient) {

  }

  getBandejaSolicitud(tipoSolicitud: string, periodo: string, numPag: number, numRegPorPag: number) {
    let params = new HttpParams()
    params = params.append("tipoSolicitud", tipoSolicitud)
    if (periodo !== '') {
      params = params.append("periodo", periodo)
    }

    params = params.append("numPag", numPag)
    params = params.append("numRegPorPag", numRegPorPag)

    return this.http.get<Root<BandejaSolicitud>>(`${this.url}/consulta/solicitud`,
      {
        params: params
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  registrarSolicitud(r: Solicitud, tipoSolicitud: string, periodo: string) {
    return this.http.post<any>(`${this.url}/solicitud/${tipoSolicitud}-${periodo}/registrarSolicitud`, r)
      .pipe(
        catchError(this.handleError)
      );
  }

  getParametrosSolicitud(codSolicitud: string, codPlanilla: string, numPag: number, numRegPorPag: number) {

    let params = new HttpParams()
    params = params.append("codSolicitud", codSolicitud)
    if (codPlanilla !== '0') {
      params = params.append("codPlanilla", codPlanilla)
    }
    params = params.append("numPag", numPag)
    params = params.append("numRegPorPag", numRegPorPag)

    return this.http.get<Root<ParametroSolicitud>>(`${this.url}/consulta/parametrosCalculo`,
      {
        params: params
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  anularSolicitud(codSolicitud: string) {
    return this.http.put<any>(`${this.url}/solicitud/${codSolicitud}/anularSolicitud`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  anularPlanilla(codSolicitud: string, codPlani: string) {
    return this.http.put<any>(`${this.url}/solicitud/${codSolicitud}-${codPlani}/anularPlanilla`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  getSolicitudPlanillaMovimiento(codSol: string) {

    return this.http.get<SolicPlaniMov>(`${this.url}/consulta/${codSol}/solicitud`,
    )
      .pipe(
        catchError(this.handleError)
      );
  }

  getTiposDeSolicitud() {
    let params = new HttpParams()
    params = params.append("codParametro", "TIPOSOLIN")

    return this.http.get<ParametroList>(`${this.url}/consulta/parametros`,
      {
        params: params
      }
    )
      .pipe(
        catchError(this.handleError)
      );
  }

  validarPeriodoSolicitud(tipoSolicitud: string, periodo: string) {
    let params = new HttpParams()
    params = params.append("tipoSolicitud", tipoSolicitud)
    params = params.append("periodo", periodo)

    return this.http.get<any>(`${this.url}/consulta/validarPeriodo`,
      {
        params: params
      }
    )
      .pipe(
        catchError(this.handleError)
      );
  }

  getBandejaCarga(tipoSolicitud: string, periodo: string, numPag: number, numRegPorPag: number) {
    let params = new HttpParams()
    params = params.append("tipoSolicitud", tipoSolicitud)
    if (periodo !== '') {
      params = params.append("periodo", periodo)
    }

    params = params.append("numPag", numPag)
    params = params.append("numRegPorPag", numRegPorPag)

    return this.http.get<Root<BandejaSolicitudCarga>>(`http://demo4873478.mockable.io/calculoactuarial/e/carga/solicitud`,
      {
        params: params
      })
      .pipe(
        catchError(this.handleError)
      );
  }





  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Client error', error.error.message);
    } else {
      // Error en el lado del servidor
      console.log('Error Status:', error.status);
      console.log('Error:', error.error);

      if (error.error.errors) {
        console.error('Errores adicionales:');
        for (const err of error.error.errors) {
          console.error(`Código: ${err.codError}, Descripción: ${err.desError}`);
        }
      }
      // Devolver el mensaje de error como string
    }
    return throwError(error.error.errors ? error.error.errors[0].desError : 'Algo salió mal en el servidor. Por favor, inténtalo de nuevo más tarde.');
  }


}
