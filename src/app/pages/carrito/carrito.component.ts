import { Component } from '@angular/core';
import { MResponse } from 'src/app/models/MResponse.model';
import { ArticuloService } from 'src/app/services/articulo.service';
import { environment } from 'src/enviroment/environment';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  url:string = environment.Endpoint;
  constructor(public articuloServe:ArticuloService)
  {

  }

  comprar()
  {
    this.msgCargando("Ingresando su Compra");
    if(this.articuloServe.articulos.length==0)
    {
      this.msgAlerta("debe ingresar articulos al carrito");

    }
    else
    {
      this.articuloServe.insertaRelArticuloCliente(this.articuloServe.articulos).subscribe({
        next:(data:MResponse)=>{
          if(data.success)
          {
            console.log(data)
            this.articuloServe.articulos=[];
            this.msgSuccess("datos guardados correctamente");
          }
          else
          {
            this.msgError("Error Al intentar Guardar " + data.message)
          }
        },
        error:(e)=>{
          this.msgError("Error Al intentar Guardar " + e.message)
        }
      })
    }
  }

  eliminarArticulo(id:number)
  {
    this.articuloServe.articulos.splice(id,1);
  }


  msgCargando(msg:string)
  {
     Swal.close();
     Swal.fire({
       title: 'Espere',
       text: msg,
       icon: 'info',
       allowOutsideClick:false
     });
     Swal.showLoading();
  }

  msgAlerta(msg:string)
  {
   Swal.close();
   Swal.fire({
     title: 'ALERT!',
     text: msg,
     icon: 'warning',
   });
  }

  msgSuccess(msg:string)
  {
   Swal.close();
   Swal.fire({
     title: 'Success!',
     text: msg,
     icon: 'success',
   });
  }
  
  msgError(msg:string)
  {
   Swal.close();
   Swal.fire({
     title: 'ERROR!',
     text: msg,
     icon: 'error',
   });
  }


}
