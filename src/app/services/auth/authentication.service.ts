import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { SISTEMA_LOGIN } from '../../shared/var.constant';

export class User {
  constructor(public status: string) { }
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {



  constructor(private httpClient: HttpClient,
    private router: Router) { }
  // Provide username and password for authentication, and once authentication is successful,
  //store JWT token in session
  authenticate(usuario: any, clave: any) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return this.httpClient
      .post<any>(`${environment.hostLogin}/login/token`, { usuario, clave, sistema: SISTEMA_LOGIN },)
      .pipe(
        map(userData => {
          sessionStorage.setItem("token", userData.token);
          const dataToken: any = jwt_decode(userData.token)
          sessionStorage.setItem("usuario", dataToken.usuario)
          sessionStorage.setItem("nombre", dataToken.nombre)
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("usuario");
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("nombre");
    this.router.navigate(['login']);
  }

  getIp() {
    return this.httpClient.get<any>(`http://api.ipify.org/?format=json`)
  }

}
