import { Injectable } from '@angular/core';
import { environment } from 'src/enviroment/environment';
import { MResponse } from '../models/MResponse.model';
import { HttpClient } from '@angular/common/http';
import { MArticulo } from '../models/MArticulo.model';
import { MRelArticuloCliente } from '../models/MRelArticuloCliente.model';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private url = `${environment.APIEndpoint}Articulo/`;
  public articulos:MArticulo[]=[];
  
  constructor(private http: HttpClient) 
  {

  }

  obtenerArticulos()
  {
    let uri = `${this.url}obtenerArticulos`;
    return this.http.get<MResponse>(uri);
  }

  obtenerArticulosbyIdTienda(id:string)
  {
    let uri = `${this.url}obtenerArticulosbyIdTienda/${id}`;
    return this.http.get<MResponse>(uri);
  }


  insertarArticulo(articulo:MArticulo,img:File)
  {
    let uri = `${this.url}insertarArticulo`;

    const formdata = new FormData();
    formdata.append('codigo',articulo.codigo);
    formdata.append('descripcion',articulo.descripcion);
    formdata.append('precio', articulo.precio.toString());
    formdata.append('stock',articulo.stock.toString());
    formdata.append('id_tienda',articulo.id_tienda.toString());
    formdata.append('file',img);

    return this.http.post<MResponse>(uri,formdata);
  }

  insertaRelArticuloCliente(articulos:MArticulo[])
  {
    let id_cliente = localStorage.getItem("id_cliente");
    if(id_cliente==null || id_cliente=="")
    {
      id_cliente="1";
    } 

    let rel:MRelArticuloCliente[] = [];

    articulos.forEach(a => {
      
      let r:MRelArticuloCliente = new MRelArticuloCliente();
      r.id_articulo = a.id_articulo;
      r.id_cliente = Number(id_cliente);
      r.cantidad = 1;

      rel.push(r);
    });

    let uri = `${this.url}relArticuloCliente`;

    let body = {
      RelClienteArticulo:rel
    }


    return this.http.post<MResponse>(uri,body);

  }


}
