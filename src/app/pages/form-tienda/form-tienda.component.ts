import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MResponse } from 'src/app/models/MResponse.model';
import { MTienda } from 'src/app/models/MTienda.model';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-tienda',
  templateUrl: './form-tienda.component.html',
  styleUrls: ['./form-tienda.component.css']
})
export class FormTiendaComponent {
  tienda:MTienda = new MTienda();
  constructor(private tiendaServ:TiendaService,private router: Router)
  {

  }

  registrar()
  {
    this.msgCargando("Agregando Tienda");
    if(this.tienda.nombre.length==0||this.tienda.sucursal.length==0||this.tienda.direccion.length==0)
    {
      this.msgAlerta("Debe llenar todos los campos");
    }
    else
    {
      this.tiendaServ.insertarTienda(this.tienda).subscribe({
        next: (data:MResponse) => {
          if(data.success==true)
          {
            Swal.fire({
              title: 'Correcto!',
              text: 'se Guardaron los datos correctamente',
              icon: 'success'
            }).then((resp) => {
              Swal.close();
              this.router.navigate(['/index/tiendas']);
              return;
            });
          }
          else
          {
            this.msgError("Error al registrar: " + data.message);
          }
        },
        error: (e) => {
          this.msgError("Error al registrar: " + e.message);
        },
      });

    }
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
