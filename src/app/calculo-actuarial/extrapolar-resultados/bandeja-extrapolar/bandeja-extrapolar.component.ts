import { Component } from '@angular/core';
import { Root } from "../../../interfaces/root";
import { BandejaSolicitudCalculo } from "../../../interfaces/bandeja-solicitud-calculo";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SolicitudService } from "../../../services/solicitud.service";
import { SpinnerOverlayService } from "../../../services/overlay.service";
import { ToastService } from "../../../services/toast.service";
import { COD_TIPO_SOLICITUD_1990 } from "../../../shared/var.constant";
import { catchError, EMPTY } from "rxjs";
import {
  CalcularVerPlanillasComponent
} from "../../realizar-calculo/calcular-ver-planillas/calcular-ver-planillas.component";
import { BandejaSolicitudRevisar } from "../../../interfaces/bandeja-solicitud-revisar";
import { VerExtrapolarComponent } from "../ver-extrapolar/ver-extrapolar.component";
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-bandeja-extrapolar',
  templateUrl: './bandeja-extrapolar.component.html',
  styleUrls: ['./bandeja-extrapolar.component.scss']
})
export class BandejaExtrapolarComponent {

  title: string = ""
  currentPage: number = 1;
  itemsPerPage: number = 10;

  periodo: string = ''

  bandeja: Root<BandejaSolicitudRevisar> = { paginacion: { totalRegistros: 0, page: 1, per_page: 15 }, items: [] };


  constructor(private router: Router,
    private modal: NgbModal,
    private solicitudService: SolicitudService,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService,
    private sharedService: SharedService) {
    this.sharedService.getTitle.subscribe(res => res != "" ? this.title = res : this.title = sessionStorage.getItem('title')!
    )
  }

  ngOnInit() {
    this.getSearchBandeja()
  }

  getSearchBandeja() {

    this.spinnerService.show()
    this.solicitudService.getBandejaRevisar(COD_TIPO_SOLICITUD_1990)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(x => {
        this.bandeja = x
        this.spinnerService.hide()
      })

  }

  verExtrapolar(solicitud: BandejaSolicitudRevisar) {
    const modalRef = this.modal.open(VerExtrapolarComponent,
      {
        size: 'lg'
      });
    modalRef.componentInstance.solicitud = solicitud
    modalRef.closed.subscribe(x => {
      this.getSearchBandeja()
    })
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getSearchBandeja();
  }
  soloNumeros(e: KeyboardEvent): boolean {
    const input = e.key;
    const regExp = /^[0-9]+$/;
    return regExp.test(input);
  }

}
