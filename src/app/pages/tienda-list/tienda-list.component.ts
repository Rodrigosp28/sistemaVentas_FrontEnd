import { Component } from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';
import { MResponse } from 'src/app/models/MResponse.model';
import { MTienda } from 'src/app/models/MTienda.model';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-tienda-list',
  templateUrl: './tienda-list.component.html',
  styleUrls: ['./tienda-list.component.css']
})
export class TiendaListComponent {
  cargando:boolean=false;
  tiendas:MTienda[]=[];
  error:boolean=false;
  msgError:string="";
  constructor(private tiendaServ:TiendaService,private router: Router,private urlSerializer: UrlSerializer)
  {
    this.cargarDatos();
  }

  cargarDatos()
  {
    this.cargando=true;

    this.tiendaServ.obtenerTiendas().subscribe({
      next:(data:MResponse)=>
      {
        this.cargando=false;
        if(data.success)
        {
          this.error=false;
          this.msgError="";
          if(data.id>0)
          {
            this.tiendas = data.data;

          }
          console.log(this.tiendas)
        }
        else
        {
          this.error=true;
          this.msgError = "Error: " + data.message;

        }
      },
      error:(e)=>
      {
        this.cargando=false;
        this.msgError = "Error: " + e.message;
        this.error=true;

      }
    });
    

  }
  
  irRegistrarTienda()
  {
    this.router.navigate(['index','addTienda']);
  }

  verArticulosTienda(id:number)
  {
    this.router.navigate(['/index/articulos',id]);

  }

  verListaArticulosTienda(id:number)
  {
    this.router.navigate(['/index/listArticulos',id]);
  }
}
