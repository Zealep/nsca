import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-ok',
  templateUrl: './message-ok.component.html',
  styleUrls: ['./message-ok.component.css']
})
export class MessageOkComponent implements OnInit {

  @Input() message = "";

  constructor(public modalActive: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

  close() {
    this.modalActive.close(true);
  }

}
