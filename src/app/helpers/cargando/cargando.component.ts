import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.css']
})
export class CargandoComponent {
  @Input() titulo: string="Cargando";
  @Input() descripcion: string="Cargando datos";
}
