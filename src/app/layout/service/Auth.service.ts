import { Injectable } from "@angular/core";
import PocketBase from 'pocketbase';
import { environment } from "../../../environments/environment.prod";

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pb!: PocketBase;

  constructor() {
    this.pb = new PocketBase(environment.APIEndpoint);
  }

  async login(email: string, password: string) {
    try {
      const authData = await this.pb.collection('usuarios').authWithPassword(email, password);
      return authData;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    this.pb.authStore.clear();
  }

  isAuthenticated(): boolean {
    return this.pb.authStore.isValid;
  }

  getUser() {
    return this.pb.authStore.model;
  }

}
