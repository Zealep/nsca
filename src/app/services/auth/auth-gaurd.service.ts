import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanLoad, CanActivate {

  constructor(private router: Router,
    private authService: AuthenticationService) { }


  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isUserLoggedIn())
      return true;

    this.router.navigate(['login']);
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn())
      return true;

    this.router.navigate(['login']);
    return false;

  }

  /*
  checkTokenExpiration(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      const tokenExp = new Date(Number.parseInt(JSON.parse(atob(token.split('.')[1])).exp) * 1000);
      const now = new Date();
      return tokenExp > now;
    }
    return false;
  }
  */
}
