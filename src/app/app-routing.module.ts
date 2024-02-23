import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { IndexComponent } from './pages/index/index.component';
import { ArticuloListComponent } from './pages/articulo-list/articulo-list.component';
import { TiendaService } from './services/tienda.service';
import { ClienteListComponent } from './pages/cliente-list/cliente-list.component';
import { TiendaListComponent } from './pages/tienda-list/tienda-list.component';
import { FormTiendaComponent } from './pages/form-tienda/form-tienda.component';
import { ListArticuloTiendaComponent } from './pages/list-articulo-tienda/list-articulo-tienda.component';
import { FormArticuloTiendaComponent } from './pages/form-articulo-tienda/form-articulo-tienda.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'index',
    component:IndexComponent,
    children:[
      {
        path:'articulos/:id',
        component:ArticuloListComponent
      },
      {
        path:'tiendas',
        component:TiendaListComponent,
      },
      {
        path:'carrito',
        component:CarritoComponent,
      },
      {
        path:'addTienda',
        component:FormTiendaComponent
      },
      {
        path:'clientes',
        component:ClienteListComponent
      },
      {
        path:'listArticulos/:id',
        component:ListArticuloTiendaComponent
      },
      {
        path:'addArticuloTienda/:id',
        component:FormArticuloTiendaComponent
      },
      {
        path:'**',
        pathMatch:'full',
        redirectTo:'home'
      },
      {
        path:'',
        pathMatch:'full',
        redirectTo:'articulos'
      }
    ]
  },
  {
    path:'**',
    pathMatch:'full',
    redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
