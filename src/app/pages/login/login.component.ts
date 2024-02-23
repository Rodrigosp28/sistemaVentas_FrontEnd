import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MResponse } from 'src/app/models/MResponse.model';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario:string="";
  pass:string="";
  constructor(private router: Router,private clienteServ:ClienteService)
  {

  }

  registrarse()
  {
    this.router.navigate(['/register']);
  }
  iniciarSesion()
  {
    this.msgCargando("Iniciando Sesion");

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
      if(this.usuario.length==0 || this.pass.length==0)
      {
        this.msgAlerta("Debe Ingresar Usuario y Contraseña")
      }
      else
      {
        this.clienteServ.iniciarSesion(this.usuario,this.pass).subscribe({
          next:(data:MResponse)=>
          {
            if(data.success)
            {
              Swal.close();
              localStorage.setItem('id_cliente',data.data.id_cliente);
              this.router.navigate(['/index','articulos',0]);
            }
            else
            {
              this.msgError(data.message);
            }
          },
          error:(e)=>
          {
            this.msgError("Error Al Iniciar Sesion");
          }
        })
      }
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
