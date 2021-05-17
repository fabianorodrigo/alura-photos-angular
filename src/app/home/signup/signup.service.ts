import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUser } from './newUser';

const API_URL = 'http://localhost:3000';

@Injectable()
export class SignUpService {
  constructor(private http: HttpClient) {}

  checkUserNameTaken(userName: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(API_URL + '/user/exists/' + userName);
  }

  signup(newUser: NewUser) {
    return this.http.post(API_URL + '/user/signup', newUser);
  }
}
