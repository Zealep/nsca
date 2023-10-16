import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BandejaSolicitud } from '../interfaces/bandeja-solicitud';
import { Root } from '../interfaces/root';
import { catchError, throwError } from 'rxjs';
import { BandejaSolicitudRevisar } from '../interfaces/bandeja-solicitud-revisar';
import { BandejaParametro } from '../interfaces/bandeja-parametros';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  private urlSolicitud: string = `${environment.mock}`;


  constructor(
    private http: HttpClient) {

  }

  getBandejaParametro(tipoRegimen: string, idTabla: string, descripcion: string, numPag: number, numRegPorPag: number) {
    let params = new HttpParams()

    params = params.append("tiRegimen", tipoRegimen)
    params = params.append("idTabla", idTabla)
    params = params.append("desParam", descripcion)

    params = params.append("numPag", numPag)
    params = params.append("numRegPorPag", numRegPorPag)

    return this.http.get<Root<BandejaParametro>>(`${this.urlSolicitud}/consulta/listarParametros`,
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
