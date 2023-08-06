import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registro-solicitud-error',
  templateUrl: './registro-solicitud-error.component.html',
  styleUrls: ['./registro-solicitud-error.component.css']
})
export class RegistroSolicitudErrorComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  close() {
    this.activeModal.close()
  }

}
