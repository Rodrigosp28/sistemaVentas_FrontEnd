import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MArticulo } from 'src/app/models/MArticulo.model';
import { MResponse } from 'src/app/models/MResponse.model';
import { ArticuloService } from 'src/app/services/articulo.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-articulo-tienda',
  templateUrl: './form-articulo-tienda.component.html',
  styleUrls: ['./form-articulo-tienda.component.css']
})
export class FormArticuloTiendaComponent {
  selectedFile: File | null = null;
  tam:number=0;
  tamVar : number = 0;
  tamtotal:number=0;
  articulo:MArticulo=new MArticulo();
  id_tienda:string = "0";
  constructor(private articuloServ:ArticuloService,private router: Router,private route: ActivatedRoute)
  {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_tienda = params['id'];
    });
    this.articulo.id_tienda = Number(this.id_tienda);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.tam = this.selectedFile?.size / 1024 /1024
    this.tamtotal = this.selectedFile?.size
  }

  registrarInfo()
  {
    this.msgCargando("Registrando Informacion...")
    if(this.articulo.codigo==""||this.articulo.descripcion==""||this.articulo.precio==0||this.articulo.stock==0
      ||this.selectedFile==null)
      {
        this.msgAlerta("debe agregar todos los campos y una imagen")
      }
      else
      {
        this.articuloServ.insertarArticulo(this.articulo,this.selectedFile).subscribe({
          next: (data:MResponse) => {
            if(data.success==true)
            {
              Swal.fire({
                title: 'Correcto!',
                text: 'se Guardaron los datos correctamente',
                icon: 'success'
              }).then((resp) => {
                Swal.close();
                this.router.navigate(['/index/listArticulos',this.id_tienda]);
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
