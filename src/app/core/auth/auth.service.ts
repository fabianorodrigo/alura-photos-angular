import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticate(userName: string, password: string) {
    //HttpClient retorna Observable
    //a URL não é de login, é só um teste, só pra simular
    return this.http.post(API_URL + `/user/login/`, { userName, password });
  }
}
