import { Component } from '@angular/core';
import {Root} from "../../interfaces/root";
import {BandejaSolicitudCalculo} from "../../interfaces/bandeja-solicitud-calculo";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SolicitudService} from "../../services/solicitud.service";
import {SpinnerOverlayService} from "../../services/overlay.service";
import {ToastService} from "../../services/toast.service";
import {COD_TIPO_SOLICITUD_1990} from "../../shared/var.constant";
import {catchError, EMPTY} from "rxjs";
import {
  CalcularVerPlanillasComponent
} from "../realizar-calculo/calcular-ver-planillas/calcular-ver-planillas.component";
import {VerRevisarConsistenciarComponent} from "./ver-revisar-consistenciar/ver-revisar-consistenciar.component";

@Component({
  selector: 'app-revisar-consistenciar',
  templateUrl: './revisar-consistenciar.component.html',
  styleUrls: ['./revisar-consistenciar.component.scss']
})
export class RevisarConsistenciarComponent {

  currentPage: number = 1;
  itemsPerPage: number = 10;

  periodo: string = ''

  bandeja: Root<BandejaSolicitudCalculo> = { paginacion: { totalRegistros: 0, page: 1, per_page: 15 }, items: [] };


  constructor(private router: Router,
              private modal: NgbModal,
              private solicitudService: SolicitudService,
              private spinnerService: SpinnerOverlayService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.getSearchBandeja()
  }

  getSearchBandeja() {

    this.spinnerService.show()
    this.solicitudService.getBandejaCalculo(COD_TIPO_SOLICITUD_1990)
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

  revisarPlanillas(solicitud: BandejaSolicitudCalculo) {
    const modalRef = this.modal.open(VerRevisarConsistenciarComponent,
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
