import { Component } from '@angular/core';
import { MCliente } from 'src/app/models/MCliente.model';
import { MResponse } from 'src/app/models/MResponse.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent {

  clientes:MCliente[]=[];
  cargando:boolean=false;
  error:boolean=false;
  msgError:string="";
  constructor(private clienteServ:ClienteService)
  {
    this.cargarDatos()
  }

  cargarDatos()
  {
    this.cargando=true;

    this.clienteServ.obtenerClientes().subscribe({
      next:(data:MResponse)=>
      {
        this.cargando=false;
        if(data.success)
        {
          this.error=false;
          this.msgError="";
          if(data.id>0)
          {
            this.clientes = data.data;

          }
          console.log(this.clientes)
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


}
