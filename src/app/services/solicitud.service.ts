import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Root } from '../interfaces/root';
import { BandejaSolicitud } from '../interfaces/bandeja-solicitud';
import { Observable, catchError, throwError } from 'rxjs';
import { Solicitud } from '../interfaces/solicitud';
import { ParametroSolicitud } from '../interfaces/parametro-solicitud';
import { SolicPlaniMov } from '../interfaces/solicitud-plani-mov';
import { ParametroList } from '../interfaces/param';
import { BandejaSolicitudCarga } from '../interfaces/bandeja-solicitud-carga';
import { environment } from 'src/environments/environment';
import { BandejaSolicitudCalculo } from '../interfaces/bandeja-solicitud-calculo';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private urlSolicitud: string = `${environment.hostSolicitud}`;
  private urlCarga: string = `${environment.hostCarga}`;
  private urlCalculo: string = `${environment.hostCalculo}`;

  constructor(
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

    return this.http.get<Root<BandejaSolicitud>>(`${this.urlSolicitud}/consulta/solicitud`,
      {
        params: params
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  registrarSolicitud(r: Solicitud, tipoSolicitud: string, periodo: string) {
    return this.http.post<any>(`${this.urlSolicitud}/solicitud/${tipoSolicitud}-${periodo}/registrarSolicitud`, r)
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

    return this.http.get<Root<ParametroSolicitud>>(`${this.urlSolicitud}/consulta/parametrosCalculo`,
      {
        params: params
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  anularSolicitud(codSolicitud: string) {
    return this.http.put<any>(`${this.urlSolicitud}/solicitud/${codSolicitud}/anularSolicitud`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  anularPlanilla(codSolicitud: string, codPlani: string) {
    return this.http.put<any>(`${this.urlSolicitud}/solicitud/${codSolicitud}-${codPlani}/anularPlanilla`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  getSolicitudPlanillaMovimiento(codSol: string) {

    return this.http.get<SolicPlaniMov>(`${this.urlSolicitud}/consulta/${codSol}/solicitud`,
    )
      .pipe(
        catchError(this.handleError)
      );
  }

  getTiposDeSolicitud() {
    let params = new HttpParams()
    params = params.append("codParametro", "TIPOSOLIN")

    return this.http.get<ParametroList>(`${this.urlSolicitud}/consulta/parametros`,
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

    return this.http.get<any>(`${this.urlSolicitud}/consulta/validarPeriodo`,
      {
        params: params
      }
    )
      .pipe(
        catchError(this.handleError)
      );
  }

  getBandejaCarga(tipoSolicitud: string) {
    let params = new HttpParams()
    params = params.append("tipoSolicitud", tipoSolicitud)

    return this.http.get<Root<BandejaSolicitudCarga>>(`${this.urlCarga}/carga/solicitud`,
      {
        params: params
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  getInconsistencias(codPlanilla: string, codSolicitud: number, usuario: string, ip: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'idUsuaCrea': usuario,
      'ipUsuaCrea': ip
    });


    return this.http.get(`${this.urlCarga}/carga/${codPlanilla}-${codSolicitud}/inconsistencias`,
      {
        headers: headers,
        responseType: 'blob'
      })
      .pipe(
        catchError(this.handleError)
      );
  }


  cargarPlanilla(codPlanilla: string, codSolicitud: number, usuario: string, ip: string, formData: FormData) {

    const headers = new HttpHeaders({
      'idUsuaCrea': usuario,
      'ipUsuaCrea': ip
    });

    return this.http.post<any>(`${this.urlCarga}/carga/${codPlanilla}-${codSolicitud}/cargaPlanilla`,
      formData, {
      headers: headers
    })
      .pipe(
        catchError(this.handleError)
      );
  }

  getBandejaCalculo(tipoSolicitud: string) {
    let params = new HttpParams()
    params = params.append("tipoSolicitud", tipoSolicitud)

    return this.http.get<Root<BandejaSolicitudCalculo>>(`${this.urlCalculo}/calculo/solicitud`,
      {
        params: params
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  calcularPlanilla(codPlanilla: string, codSolicitud: number, usuario: string, ip: string) {

    const headers = new HttpHeaders({
      'idUsuaCrea': usuario,
      'ipUsuaCrea': ip
    });

    return this.http.post<any>(`${this.urlCalculo}/calculo/${codPlanilla}-${codSolicitud}/calcularPlanilla`,
      {
        headers: headers
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  aprobarPlanilla(tipoSolicitud:string, codSolicitud: number, codPlanillas: string[]) {
    let params = new HttpParams()
    params = params.append("tiposPlanilla", codPlanillas.join(","))

    return this.http.put<any>(`${this.urlCalculo}/calculo/${tipoSolicitud}-${codSolicitud}/aprobarPlanilla`, {
      params:params
      }
    )
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
