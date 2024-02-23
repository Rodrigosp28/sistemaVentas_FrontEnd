import { Injectable } from '@angular/core';
import { environment } from 'src/enviroment/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { MResponse } from '../models/MResponse.model';
import { MCliente } from '../models/MCliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = `${environment.APIEndpoint}Cliente/`;
  constructor(private http: HttpClient) { }

  iniciarSesion(usuario:string,pass:string)
  {
    let uri = `${this.url}sesionCliente`
    let body = {
      usuario:usuario,
      contrasena:pass
    }
    return this.http.post<MResponse>(uri,body);

  }

  registrarCliente(cliente:MCliente)
  {
    let uri = `${this.url}insertarCliente`
    let body = {
      
         nombre: cliente.nombre
        ,apellidos: cliente.apellidos
        ,direccion: cliente.direccion
        ,usuario: cliente.usuario
        ,contrasena: cliente.contrasena
    }

    return this.http.post<MResponse>(uri,body);

    
  }

  obtenerClientes()
  {
    let uri = `${this.url}obtenerCliente`;
    return this.http.get<MResponse>(uri);
  }

}
