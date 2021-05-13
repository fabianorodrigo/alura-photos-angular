import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/plataform-detector.service';

@Component({
  //como este componente é uma PÁGINA, no será incluído dentro de um outro
  //componente ou página, o SELECTOR não é necessário. E também não será
  //necessário incluí-lo no exports do home.module.ts
  templateUrl: './signin.component.html',
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  //pega a referência pro elemento do DOM que tenha o mesmo nome passado (semelhante ao useRef do React)
  @ViewChild('inputNomeDoUsuario') userNameInput: ElementRef<HTMLInputElement>;

  //injeta instâncias de FormBuilder, do nosso serviço responsável pela autenticação,
  //e também de Router para que faça-se a navegação programaticamente
  //e o nosso serviço que detecta se a plataforma é um navegador ou não
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private plataformDetectorService: PlatformDetectorService,
  ) {}

  ngOnInit(): void {
    //o método 'group' recebe como parâmetro um
    //objeto JS. Cada atributo desse JS corresponde
    //a um campo do formulário, o valor de cada atributo
    //é um array
    this.loginForm = this.formBuilder.group({
      // o primeiro valor do array é o valor padrão
      // o segundo, a validação
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    this.authService.authenticate(userName, password).subscribe(
      () => {
        this.router.navigateByUrl('/user/' + userName);
      },
      err => {
        console.log(err);
        this.loginForm.reset();
        this.plataformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
      },
    );
  }
}
