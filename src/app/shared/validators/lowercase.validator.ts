import { AbstractControl } from '@angular/forms';

export function lowerCaseValidator(control: AbstractControl) {
  if (control.value.trim() && !/^[a-z0-9_-]+$/.test(control.value)) {
    //se a validação NÃO foi atendida, retorna um objeto uma propriedade com mesmo nome que constará
    //dentro do formGrup.get('nomeinput').errors. (ex. meuForm.get('meuinput').errors?.lowercase
    return { lowercase: true };
  }

  //se não há erro, retorna null
  return null;
}
