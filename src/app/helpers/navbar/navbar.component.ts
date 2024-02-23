import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router,public articuloServ:ArticuloService)
  {

  }

  salir()
  {
    this.router.navigate(['/login']);
  }

  irCarrito()
  {
    this.router.navigate(['index','carrito']);

  }
}
