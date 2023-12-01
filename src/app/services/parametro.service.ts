import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BandejaSolicitud } from '../interfaces/bandeja-solicitud';
import { Root } from '../interfaces/root';
import { catchError, throwError } from 'rxjs';
import { BandejaSolicitudRevisar } from '../interfaces/bandeja-solicitud-revisar';
import { BandejaParametro } from '../interfaces/bandeja-parametros';
import { ParametroRequest } from '../interfaces/parametro-request';
import { BandejaMortalidad } from '../interfaces/bandeja-mortalidad';
import { TipoTablaList } from '../interfaces/list-tipo-tabla';
import { EdadList } from '../interfaces/list-edad';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  private urlSolicitud: string = `${environment.hostSolicitud}`;
  private urlCarga: string = `${environment.hostCarga}`;


  constructor(
    private http: HttpClient) {

  }

  getBandejaParametro(tipoRegimen: string, idTabla: string, descripcion: string, numPag: number, numRegPorPag: number) {
    let params = new HttpParams()

    params = params.append("tiRegimen", tipoRegimen)
    params = params.append("tabla", idTabla)
    params = params.append("desParam", descripcion)

    params = params.append("numPag", numPag)
    params = params.append("numRegPorPag", numRegPorPag)

    return this.http.get<Root<BandejaParametro>>(`${this.urlSolicitud}/parametros/listarParametros`,
      {
        params: params
      })
      .pipe(
        catchError(this.handleError)
      );
  }
  //http://onp.peru/v1/calculoactuarial/parametros/{idTabla}-{idCod}/actualizarParametro?idCamp=1&tiTipoCamp=1&vlCamp=valor
  updateParametros(idTabla: string, idCod: string, req: ParametroRequest) {

    return this.http.put<any>(`${this.urlSolicitud}/parametros/${idTabla}-${idCod}/actualizarParametro`, req)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveParametros(idTabla: string, idCod: string, req: ParametroRequest) {

    return this.http.put<any>(`${this.urlSolicitud}/parametros/${idTabla}-${idCod}/registrarParametro`, req)
      .pipe(
        catchError(this.handleError)
      );
  }

  getBandejaMortalidad(nomTabla: string, edad: string, numPag: number, numRegPorPag: number) {
    let params = new HttpParams()

    params = params.append("tabla", nomTabla)
    params = params.append("edad", edad)

    params = params.append("numPag", numPag)
    params = params.append("numRegPorPag", numRegPorPag)

    return this.http.get<Root<BandejaMortalidad>>(`${this.urlCarga}/mortalidad/listar`,
      {
        params: params
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  listTipoTablas() {
    return this.http.get<TipoTablaList>(`${this.urlCarga}/mortalidad/obtenerTablas`)
      .pipe(
        catchError(this.handleError)
      );
  }

  listEdades() {
    return this.http.get<EdadList>(`${this.urlCarga}/mortalidad/obtenerEdades`)
      .pipe(
        catchError(this.handleError)
      );
  }

  cargarTablaMortalidad(usuario: string, ip: string, formData: FormData) {

    const headers = new HttpHeaders({
      'idUsuaCrea': usuario,
      'ipUsuaCrea': ip
    });

    return this.http.post<any>(`${this.urlCarga}/mortalidad/cargar`,
      formData, {
      headers: headers
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
