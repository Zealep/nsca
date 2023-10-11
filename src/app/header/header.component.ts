import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sideNavToggled = new EventEmitter<boolean>()
  menuStatus: boolean = false
  nombre!: string
  usuario!: string


  constructor(private authService: AuthenticationService,
    private sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.nombre = sessionStorage.getItem('nombre')!
    this.usuario = sessionStorage.getItem('usuario')!
  }

  SideNavToggled() {
    this.menuStatus = !this.menuStatus
    this.sideNavToggled.emit(this.menuStatus)
  }

  cerrar() {
    this.authService.logOut()
  }

}
