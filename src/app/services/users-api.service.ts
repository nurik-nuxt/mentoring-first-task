import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(private httpClient: HttpClient) {}
  getUser() {
    return this.httpClient.get(` https://jsonplaceholder.typicode.com/users`)
  }
}
