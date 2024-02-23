import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './helpers/navbar/navbar.component';
import { ClienteListComponent } from './pages/cliente-list/cliente-list.component';
import { TiendaListComponent } from './pages/tienda-list/tienda-list.component';
import { ArticuloListComponent } from './pages/articulo-list/articulo-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { IndexComponent } from './pages/index/index.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CargandoComponent } from './helpers/cargando/cargando.component';
import { ErrorComponent } from './helpers/error/error.component';
import { SinDatosComponent } from './helpers/sin-datos/sin-datos.component';
import { FormTiendaComponent } from './pages/form-tienda/form-tienda.component';
import { ListArticuloTiendaComponent } from './pages/list-articulo-tienda/list-articulo-tienda.component';
import { FormArticuloTiendaComponent } from './pages/form-articulo-tienda/form-articulo-tienda.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClienteListComponent,
    TiendaListComponent,
    ArticuloListComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    CargandoComponent,
    ErrorComponent,
    SinDatosComponent,
    FormTiendaComponent,
    ListArticuloTiendaComponent,
    FormArticuloTiendaComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
