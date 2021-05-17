import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';
import { SignUpService } from './signup.service';

//Validador assíncrono da existência do nome de usuário
@Injectable()
export class UserNotTakenValidatorService {
  constructor(private signUpService: SignUpService) {}

  //retorna uma função que fará efetivamente a validação quando for chamada
  checkUserNameTaken() {
    return (control: AbstractControl) => {
      //control.valueChanges é um Observable
      //aplicamos aqui o padrão debounce para não fazer chamada ao backend a cada caracter digitado
      return (
        control.valueChanges
          .pipe(debounceTime(300))
          .pipe(
            //o switchMap abandona o fluxo anterior e passa a ouvir o Observable do serviço
            switchMap(userName => {
              return this.signUpService.checkUserNameTaken(userName);
            }),
          )
          //o exemplo da ALura o backend retorna boolean. Nosso aso não precisaríamos desse map, mas, vamos manter como exemplo
          .pipe(map(existsObj => (existsObj.exists ? { userNameTaken: true } : null)))
          //quando retornar o Observable até aqui o sistema de validação do Angular continuará ouvindo sem concluir o
          //subscribe. Para que a conclusão seja realizada, executamos o "first()" abaixo para pegar o primeiro e encerrar
          .pipe(first())
      );
    };
  }
}
