import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroment/environment';
import { MResponse } from '../models/MResponse.model';
import { MTienda } from '../models/MTienda.model';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  private url = `${environment.APIEndpoint}Tienda/`;
  constructor(private http: HttpClient) {
    
   }

  obtenerTiendas()
  {
    let uri = `${this.url}obtenerTiendas`;
    return this.http.get<MResponse>(uri);
  }

  obtenerTiendasbyId(id:string)
  {
    let uri = `${this.url}obtenerTiendasbyId/${id}`;
    return this.http.get<MResponse>(uri);
  }

  insertarTienda(tienda:MTienda)
  {
    let uri = `${this.url}insertarTienda`;
    let body = {
        nombre: tienda.nombre,
        sucursal: tienda.sucursal,
        direccion: tienda.direccion
    }
    return this.http.post<MResponse>(uri,body);

  }


}
