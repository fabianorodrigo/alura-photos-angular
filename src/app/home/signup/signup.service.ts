import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class SignUpService {
  constructor(private http: HttpClient) {}

  checkUserNameTaken(userName: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(API_URL + '/user/exists/' + userName);
  }
}
