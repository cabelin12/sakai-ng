import { Routes } from '@angular/router';
import { Empty } from './empty/empty';

export default [
    { path: 'clientes', loadChildren: () => import('./clientes/pagescliente.routes') },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
