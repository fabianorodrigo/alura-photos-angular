import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TokenService } from '../token/token.service';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  authenticate(userName: string, password: string) {
    //HttpClient retorna Observable
    //a URL não é de login, é só um teste, só pra simular
    return (
      this.http
        //para ter acesso aos headers, passa-se como terceiro parâmetro o {observe: response}
        .post(API_URL + `/user/login/`, { userName, password }, { observe: 'response' })
        //com o pipe é possível executar um código antes de retornar o Observable
        .pipe(
          //operador tap para ...
          tap(res => {
            const authToken = res.headers.get('x-access-token');
            this.tokenService.setToken(authToken);
          }),
        )
    );
  }
}
