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
import { BandejaMortalidad } from 'src/app/interfaces/bandeja-mortalidad';
import { TipoTablaList } from 'src/app/interfaces/list-tipo-tabla';
import { EdadList } from 'src/app/interfaces/list-edad';
import * as Papa from 'papaparse';

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

  listaTipoTabla: TipoTablaList = {
    items: []
  }

  listaEdades: EdadList = {
    items: []
  }

  bandeja: Root<BandejaMortalidad> = { paginacion: { totalRegistros: 0, page: 1, per_page: 15 }, items: [] };
  sortBandeja: Root<BandejaMortalidad> = { paginacion: { totalRegistros: 0, page: 1, per_page: 15 }, items: [] };

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
    this.listEdad()
    this.listTipoTabla()
    this.getSearchBandeja()
  }


  ngOnDestroy(): void {
    this.toastService.clear();
  }

  getSearchBandeja() {


    this.spinnerService.show()


    //this.parametroService.getBandejaParametro(this.tipoSolicitud, this.parametro, this.descripcion, this.currentPage, this.itemsPerPage)
    this.parametroService.getBandejaMortalidad(this.tabla, this.edad, this.currentPage, this.itemsPerPage)
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
        this.currentPage = 1;
      })

  }

  listTipoTabla() {
    this.parametroService.listTipoTablas()
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(res => {
        this.listaTipoTabla = res
      })
  }

  listEdad() {
    this.parametroService.listEdades()
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(res => {
        this.listaEdades = res
      })
  }

  exportar() {

    if (this.totalItems == 0) {
      this.toastService.show('No hay datos registros a descargar', { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
      return
    }



    this.spinnerService.show()
    this.parametroService.getBandejaMortalidad(this.tabla, this.edad, 1, this.totalItems)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        this.toastService.show(error, { classname: 'bg-danger text-white', delay: 3000, icon: 'ban' })
        return EMPTY
      }))
      .subscribe(x => {


        this.spinnerService.hide()
        this.exportToCsv(x.items, 'tablas_mortalidad_esperanza_vida.csv')

        this.toastService.show('Se descargo correctamente el archivo de parametros', { classname: 'bg-success text-white', delay: 3000, icon: 'check' })
      })

  }



  cargar() {
    const modalRef = this.modal.open(CargaTablaMortalidadComponent,
      {
        size: 'lg'
      });

    modalRef.closed.subscribe(x => {
      this.getSearchBandeja()
    })
  }
  exportToCsv(data: any[], filename: string): void {
    const csv = Papa.unparse(data, {
      // header: true,
      delimiter: ',',
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }


  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getSearchBandeja();
  }

}
