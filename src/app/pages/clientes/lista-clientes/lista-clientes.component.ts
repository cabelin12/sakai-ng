import { Component, OnInit, ViewChild } from "@angular/core";
import { DatarealtimeService } from "../../../layout/service/datarealtime.service";
import { Table, TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-lista-clientes",
  templateUrl: "./lista-clientes.component.html",
  styleUrls: ["./lista-clientes.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    RouterLink
  ],
  providers: [
    MessageService, ConfirmationService
  ]
})

export class ListaClientesComponent implements OnInit {

  data: any[] = [];
  globalFilter: string = '';
  @ViewChild('dt') table!: Table;
  urlPage: string = './dashboard/clientes/';

  constructor(
    private realtimeService: DatarealtimeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.realtimeService.listenToCollection('clientes').subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }

  link(id: any = undefined) {
    if (id) {
      console.log(id);
      this.router.navigate([this.urlPage + 'editar/' + id]);
      console.log(this.router);
    } else {
      this.router.navigate([this.urlPage + 'nuevo/']);
    }
  }

  clearFilters() {
    this.table.clear();
    this.globalFilter = '';
  }

  onFilterColumn(event: Event, field: string) {
    const inputValue = (event.target as HTMLInputElement).value;
    // "dt" es tu referencia a la tabla p-table (o DataTable)
    this.table.filter(inputValue, field, 'contains');
  }

  onFilterGlobal(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    // "dt" es tu referencia a la tabla p-table (o DataTable)
    this.table.filterGlobal(inputValue, 'contains');
  }

  confirmDelete(producto: any) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar este producto?',
      accept: async () => {
        await this.realtimeService.deleteRecord('productos', producto.id);
        this.messageService.add({ severity: 'warn', summary: 'Eliminado', detail: 'Producto eliminado' });
      }
    });
  }
}
