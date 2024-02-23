import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sin-datos',
  templateUrl: './sin-datos.component.html',
  styleUrls: ['./sin-datos.component.css']
})
export class SinDatosComponent {
  @Input() titulo: string="Sin datos";
  @Input() descripcion: string="Sin datos";
}
