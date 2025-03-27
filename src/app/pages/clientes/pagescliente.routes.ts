import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';

export default [
    { path: 'nuevo', component: ClienteComponent },
    { path: 'editar/:id', component: ClienteComponent },
    { path: 'lista', component: ListaClientesComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
