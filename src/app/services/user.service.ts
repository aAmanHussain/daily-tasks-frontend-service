import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}
  register(user: any) {
    return this.http.post(`${environment.baseAPIUrl}register`, user);
  }
  login(user: any) {
    return this.http.post(`${environment.baseAPIUrl}login`, user);
  }
  getTodo() {
    return this.http.get<any[]>(`${environment.baseAPIUrl}to-do`);
  }
  addTodo(data) {
    return this.http.post<any[]>(`${environment.baseAPIUrl}to-do`, data);
  }
  deleteTodo(id: number) {
    return this.http.delete(`${environment.baseAPIUrl}to-do/${id}`);
  }
}
