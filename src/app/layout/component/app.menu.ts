import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['./'] }]
            },
            {
                label: 'Funciones',
                items: [
                    { label: 'Clientes', icon: 'pi pi-users', routerLink: ['./clientes/lista'] },
                    { label: 'Catalogos', icon: 'pi pi-book', routerLink: ['./catalogos'] },
                    {
                        label: 'Configuraciones', icon: 'pi pi-cog', routerLink: ['./configuracion'],
                        items: [
                            { label: 'Usuarios', icon: 'pi pi-user', routerLink: ['./configuracion/usuarios'] },
                        ]
                    },
                ]
            }
        ];
    }
}
