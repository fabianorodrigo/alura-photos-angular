import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TokenService } from '../token/token.service';
import { User } from './user';
import * as jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private tokenService: TokenService) {
    //se já tiver um token, já manda o decodeAndNotify
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  //Ao invés de ser do tipo 'Subject' o userSubject precisa ser do tipo 'BehaviorSubject'
  //Isto porque no momento que a instância de userService é criada e seu constructor é
  //executado, o headerComponent ainda não existe, então, o "decodeAndNotify()" do constructor
  //emitirá um Observable que cairia num limbo. Isso acaba fazendo com que, após logar, se
  //a página for carregada, o nome do usuário não seja impresso no HeaderComponent, pois ele fará
  // um subscribe e ficará aguardando um evento que nunca virá.
  //o BehaviorSubject aguarda alguém fazer subscribe, e não cai no limbo
  //o primeiro que fizer o subscribe pega o valor que ele "gritou" e não
  //tinha ninguém para ouvir
  private userSubject = new BehaviorSubject<User>(null);

  private userName: string;

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  private decodeAndNotify() {
    //o tokenService retorna do LocalStorage
    const token = this.tokenService.getToken();
    const user = jwt_decode.default(token) as User;
    this.userName = user.userName;
    this.userSubject.next(user);
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  isLogged() {
    return this.tokenService.hasToken();
  }

  getUser() {
    //retornando observable, é possível fazer um subscribe
    return this.userSubject.asObservable();
  }
  getUserName() {
    return this.userName;
  }
}
