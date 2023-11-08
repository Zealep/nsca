import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, catchError } from 'rxjs';
import { BandejaParametro } from 'src/app/interfaces/bandeja-parametros';
import { ParametroList } from 'src/app/interfaces/param';
import { Root } from 'src/app/interfaces/root';
import { SpinnerOverlayService } from 'src/app/services/overlay.service';
import { ParametroService } from 'src/app/services/parametro.service';
import { SharedService } from 'src/app/services/shared.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastService } from 'src/app/services/toast.service';
import { CargaTablaMortalidadComponent } from '../carga-tabla-mortalidad/carga-tabla-mortalidad.component';

@Component({
  selector: 'app-bandeja-parametro-moresperanza',
  templateUrl: './bandeja-parametro-moresperanza.component.html',
  styleUrls: ['./bandeja-parametro-moresperanza.component.scss']
})
export class BandejaParametroMoresperanzaComponent {

  title: string = ""
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalItems: number = 0;

  tabla: string = ''
  edad: string = ''

  listaParametros: ParametroList = {
    items: []
  }

  bandeja: Root<BandejaParametro> = { paginacion: { totalRegistros: 0, page: 1, per_page: 15 }, items: [] };
  sortBandeja: Root<BandejaParametro> = { paginacion: { totalRegistros: 0, page: 1, per_page: 15 }, items: [] };

  constructor(private router: Router,
    private modal: NgbModal,
    private solicitudService: SolicitudService,
    private parametroService: ParametroService,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService,
    private sharedService: SharedService
  ) {
    this.sharedService.getTitle.subscribe(res => res != "" ? this.title = res : this.title = sessionStorage.getItem('title')!
    )
  }

  ngOnInit() {
    this.getSearchBandeja()
  }


  ngOnDestroy(): void {
    this.toastService.clear();
  }

  getSearchBandeja() {


    this.spinnerService.show()


    //this.parametroService.getBandejaParametro(this.tipoSolicitud, this.parametro, this.descripcion, this.currentPage, this.itemsPerPage)
    this.parametroService.getBandejaParametro('19990', 'TASAREEM19', 'TASA', 1, 10)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(x => {
        this.bandeja = x
        this.sortBandeja = this.bandeja
        this.totalItems = x.paginacion.totalRegistros;
        this.spinnerService.hide()
      })

  }

  exportar() {

  }

  cargar() {
    const modalRef = this.modal.open(CargaTablaMortalidadComponent,
      {
        size: 'lg'
      });

    modalRef.closed.subscribe(x => {

    })
  }


  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getSearchBandeja();
  }

}
