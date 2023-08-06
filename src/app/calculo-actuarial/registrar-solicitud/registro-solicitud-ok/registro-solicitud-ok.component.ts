import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registro-solicitud-ok',
  templateUrl: './registro-solicitud-ok.component.html',
  styleUrls: ['./registro-solicitud-ok.component.css']
})
export class RegistroSolicitudOkComponent implements OnInit {

  @Input() codSolicitud!: string
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  close() {
    this.activeModal.close()
  }

}
