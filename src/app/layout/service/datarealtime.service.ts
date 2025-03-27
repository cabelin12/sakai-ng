import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../environments/environment.prod";
import PocketBase from 'pocketbase';

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class DatarealtimeService {
  private pb = new PocketBase(environment.APIEndpoint);
  private dataSubjects: { [key: string]: BehaviorSubject<any[]> } = {};

  constructor() { }

  listenToCollection(collection: string) {
    if (!this.dataSubjects[collection]) {
      this.dataSubjects[collection] = new BehaviorSubject<any[]>([]);
      this.init(collection);
    }
    return this.dataSubjects[collection].asObservable();
  }

  private async init(collection: string) {
    const result = await this.pb.collection(collection).getFullList();
    this.dataSubjects[collection].next(result);

    this.pb.collection(collection).subscribe('*', (e) => {
      this.handleRealtime(collection, e);
    });
  }

  private handleRealtime(collection: string, event: any) {
    const current = this.dataSubjects[collection].value;
    const record = event.record;
    let updated: any[] = [];

    switch (event.action) {
      case 'create':
        updated = [...current, record];
        break;
      case 'update':
        updated = current.map(p => p.id === record.id ? record : p);
        break;
      case 'delete':
        updated = current.filter(p => p.id !== record.id);
        break;
    }

    this.dataSubjects[collection].next(updated);
  }

  async deleteRecord(collection: string, id: string) {
    await this.pb.collection(collection).delete(id);
  }

  async updateRecord(collection: string, id: string, data: any) {
    await this.pb.collection(collection).update(id, data);
  }

  async getRecord(collection: string, id: string) {
    await await this.pb.collection(collection).getOne(id);
  }
}
