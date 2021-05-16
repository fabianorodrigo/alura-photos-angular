import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lowercase.validator';
import { UserNotTakenValidatorService } from './user-not-taken-validator.service';

@Component({
  templateUrl: './signup.component.html',
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userNoTakenValidatorService: UserNotTakenValidatorService) {}

  ngOnInit(): void {
    const fnCheckUserNameTaken = this.userNoTakenValidatorService.checkUserNameTaken();
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          lowerCaseValidator,
          Validators.pattern(/^[a-z0-9_-]+$/),
        ],
        //os validadores assíncronos são o 3º parâmetro do atributo
        fnCheckUserNameTaken,
      ],
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]],
    });
  }
}
