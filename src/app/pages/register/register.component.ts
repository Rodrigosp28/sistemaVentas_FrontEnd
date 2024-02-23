import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MCliente } from 'src/app/models/MCliente.model';
import { MResponse } from 'src/app/models/MResponse.model';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  cliente:MCliente = new MCliente();
  constructor(private router: Router,private clienteServ:ClienteService)
  {

  }

  registrar()
  {
    this.msgCargando("Registrando Informacion");
    if(this.cliente.nombre.length==0 || this.cliente.apellidos.length==0 || this.cliente.direccion.length==0 
      || this.cliente.usuario.length==0 || this.cliente.contrasena.length==0)
      {
        this.msgAlerta("ingrese todos los campos");
      }
      else
      {
        var arrcliente = this.cliente.usuario.split(' ');
        var arrpass = this.cliente.contrasena.split(' ');
        if(arrcliente.length>1||arrpass.length>1)
        {
          this.msgAlerta("usuario y contraseña no deben tener espacios");
        }
        else
        {
          this.clienteServ.registrarCliente(this.cliente).subscribe({
            next: (data:MResponse) => {
              if(data.success==true)
              {
                Swal.fire({
                  title: 'Correcto!',
                  text: 'se Guardaron los datos correctamente',
                  icon: 'success'
                }).then((resp) => {
                  Swal.close();
                  this.router.navigate(['/login']);
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
  }
   irLogin()
   {
      this.router.navigate(['/login']);
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
