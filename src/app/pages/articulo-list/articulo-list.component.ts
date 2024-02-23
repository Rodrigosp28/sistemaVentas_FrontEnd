import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MArticulo } from 'src/app/models/MArticulo.model';
import { MResponse } from 'src/app/models/MResponse.model';
import { MTienda } from 'src/app/models/MTienda.model';
import { ArticuloService } from 'src/app/services/articulo.service';
import { environment } from 'src/enviroment/environment';

@Component({
  selector: 'app-articulo-list',
  templateUrl: './articulo-list.component.html',
  styleUrls: ['./articulo-list.component.css']
})
export class ArticuloListComponent implements OnInit {
  idtienda:string = "0";
  cargando:boolean=false;
  articulos:MArticulo[]=[];
  error:boolean=false;
  msgError:string="";
  tienda:MTienda=new MTienda();
  url:string = environment.Endpoint;
  constructor(private router: Router,private route: ActivatedRoute,public articuloServ:ArticuloService)
  {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idtienda = params['id'];
    });

    if(this.idtienda=="0")
    {
      this.cargarDatos();
    }
    else
    {
      this.cargarDatosbyId(this.idtienda);
    }

  } 

  cargarDatos()
  {
    this.cargando=true;

    this.articuloServ.obtenerArticulos().subscribe({
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

  cargarDatosbyId(id:string)
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
          if(data.id>0)
          {
            this.articulos = data.data;

          }
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

  agregarCarrito(articulo:MArticulo)
  {
    this.articuloServ.articulos.push(articulo);
  }
}
