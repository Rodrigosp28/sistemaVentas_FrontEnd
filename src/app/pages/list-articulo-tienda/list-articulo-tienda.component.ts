import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MArticulo } from 'src/app/models/MArticulo.model';
import { MResponse } from 'src/app/models/MResponse.model';
import { MTienda } from 'src/app/models/MTienda.model';
import { ArticuloService } from 'src/app/services/articulo.service';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-list-articulo-tienda',
  templateUrl: './list-articulo-tienda.component.html',
  styleUrls: ['./list-articulo-tienda.component.css']
})
export class ListArticuloTiendaComponent implements OnInit {
  cargando:boolean=false;
  articulos:MArticulo[]=[];
  error:boolean=false;
  msgError:string="";
  tienda:MTienda=new MTienda();
  idTienda:string="0";
  constructor(private router: Router,private articuloServ:ArticuloService,private tiendaServ:TiendaService,private route: ActivatedRoute)
  {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idTienda = params['id'];
    });

    this.cargarDatos(this.idTienda);
    this.cargarDatosTienda(this.idTienda);
  }
  cargarDatos(id:string)
  {
    this.cargando=true;

    this.articuloServ.obtenerArticulosbyIdTienda(id).subscribe({
      next:(data:MResponse)=>
      {
        this.cargando=false;
        if(data.success)
        {
          this.error=false;
          this.msgError="";
          this.articulos = data.data;
          console.log(this.articulos)
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

  cargarDatosTienda(id:string)
  {
    this.tiendaServ.obtenerTiendasbyId(id).subscribe({
      next:(data:MResponse)=>
      {
        if(data.success)
        {
          this.tienda =data.data;
        }
        else
        {
          console.log("error al consumir dato de tienda: " + data.message);
        }
      },
      error:(e)=>
      {
        console.log("error al consumir dato de tienda: " + e.message);

      }
    });
    

  }

  agregarArticulo()
  {
    this.router.navigate(['/index/addArticuloTienda',this.idTienda]);
  }
}
