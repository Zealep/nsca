import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EMPTY, catchError} from 'rxjs';
import {BandejaSolicitudCalculo} from 'src/app/interfaces/bandeja-solicitud-calculo';
import {BandejaSolicitudCarga} from 'src/app/interfaces/bandeja-solicitud-carga';
import {
    GenerarReporteCalculoActuarialComponent
} from 'src/app/reportes/generar-reporte-calculo-actuarial/generar-reporte-calculo-actuarial.component';
import {SpinnerOverlayService} from 'src/app/services/overlay.service';
import {SolicitudService} from 'src/app/services/solicitud.service';
import {ToastService} from 'src/app/services/toast.service';
import {ConfirmDialogComponent} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-calcular-ver-planillas',
    templateUrl: './calcular-ver-planillas.component.html',
    styleUrls: ['./calcular-ver-planillas.component.scss']
})
export class CalcularVerPlanillasComponent {

    usuario!: string

    @Input() solicitud!: BandejaSolicitudCalculo

    constructor(private router: Router,
                private activeModal: NgbActiveModal,
                private modal: NgbModal,
                private solicitudService: SolicitudService,
                private spinnerService: SpinnerOverlayService,
                private toastService: ToastService) {

    }

    ngOnInit() {
        this.usuario = sessionStorage.getItem('usuario')!
    }

    dialogCalcular(tipoPlanilla: string) {
        const modalRef = this.modal.open(ConfirmDialogComponent)
        modalRef.componentInstance.message = `¿Está seguro que desea procesar el cálculo de la reserva para la planilla ${tipoPlanilla} de la solicitud N° ${this.solicitud.idSolicitud}?`;

        modalRef.closed.subscribe(result => {
            if (result) {
                this.procesarCalculo(tipoPlanilla);
            }
        })

    }

    procesarCalculo(codPlanilla: string) {
        const usuario = sessionStorage.getItem('usuario')!
        const ip = '127.0.0.1'

        this.spinnerService.show()
        this.solicitudService.calcularPlanilla(codPlanilla, this.solicitud.idSolicitud, usuario, ip)
            .pipe(catchError(error => {
                this.spinnerService.hide()
                this.toastService.show(error, {classname: 'bg-danger text-white', delay: 3000, icon: 'ban'})
                return EMPTY
            }))
            .subscribe(res => {
                this.updateTableLoad(res)
                this.spinnerService.hide()
                this.toastService.show(`Se realizo el calculo de la planilla de ${res.desTipPla} correctamente`, {classname: 'bg-success text-white', delay: 3000, icon: 'check'})
            })
    }

    updateTableLoad(res: any) {

        const codPlanilla = res.codTipPla
        const indexFound = this.solicitud.planilla.findIndex(planilla => planilla.codTipPla === codPlanilla)
        if (indexFound !== -1) {
            const planillaEncontrada = {...this.solicitud.planilla[indexFound]}
            planillaEncontrada.codEst = res.codEst
            planillaEncontrada.desEst = res.desEst
            planillaEncontrada.numPerPla = res.numPerPla
            planillaEncontrada.numIncosPla = res.numIncosPla
            planillaEncontrada.indCalcRealizado = res.indCalcRealizado

            this.solicitud.planilla[indexFound] = planillaEncontrada
        }
    }


    verReportes() {
        const modalRef = this.modal.open(GenerarReporteCalculoActuarialComponent,
            {
                size: 'lg'
            });
        modalRef.componentInstance.codSolicitud = this.solicitud.idSolicitud
        modalRef.closed.subscribe(x => {

        })
    }

    dialogAprobar() {
        const modalRef = this.modal.open(ConfirmDialogComponent)
        modalRef.componentInstance.message = `¿Está seguro que  desea aprobar el cálculo de la reserva  de la solicitud N° ${this.solicitud.idSolicitud} ?`;

        modalRef.closed.subscribe(result => {
            if (result) {
                this.aprobar();
            }
        })
    }

    aprobar() {
        const planillas: string[] = ['01', '02', '03', '04']
        this.spinnerService.show()
        this.solicitudService.aprobarPlanilla(this.solicitud.tipoSolicitud, this.solicitud.idSolicitud, planillas)
            .pipe(catchError(error => {
                this.spinnerService.hide()
                this.toastService.show(error, {classname: 'bg-danger text-white', delay: 3000, icon: 'ban'})
                return EMPTY
            }))
            .subscribe(res => {
                this.spinnerService.hide()
                if (res.indAprobacion === '1') {
                    this.toastService.show(`Se realizo la aprobación de la solicitud N° ${this.solicitud.idSolicitud} correctamente`, {classname: 'bg-success text-white', delay: 3000, icon: 'check'})
                }
                else{
                    this.toastService.show(`No se pudo realizar la aprobación de la solicitud N° ${this.solicitud.idSolicitud}`, {classname: 'bg-danger text-white', delay: 3000, icon: 'ban'})
                }
            })
    }

    cerrar() {
        this.activeModal.close()
    }


}
