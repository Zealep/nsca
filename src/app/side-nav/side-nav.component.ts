import { Component, Input, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input() sideNavStatus: boolean = false
  permisos!: any

  constructor(private sharedService: SharedService) {

  }

  ngOnInit(): void {
    const dataToken: any = jwt_decode(sessionStorage.getItem('token')!)
    console.log('token', dataToken);
    this.permisos = dataToken.permisos!
  }

  verRuta(nombrePadre: string, nombreHijo: string) {
    this.sharedService.setTitle(`${nombrePadre} / ${nombreHijo}`)
  }

}
