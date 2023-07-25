import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  @Input() sideNavStatus: boolean = false

  list = [
    {
      number: "1",
      name: "PARAMETROS",
      icon: "fa-solid fa-folder"
    },
    {
      number: "2",
      name: "CALCULO ACTUARIAL",
      icon: "fa-solid fa-folder",
      id: "calculo-actuarial",
      items: [
        {

          name: "Administrar Solicitud"
        },
        {

          name: "Anular Solicitud"
        }

      ]
    },
    {
      number: "3",
      name: "REPORTES",
      icon: "fa-solid fa-folder"
    }, {
      number: "4",
      name: "FLUJO DE CAJA",
      icon: "fa-solid fa-folder"
    }
  ]

}
