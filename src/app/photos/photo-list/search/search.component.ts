import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ap-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit, OnDestroy {
  //com o Output EventEmitter é possível enviar valor do filho para um componente pai
  @Output() onDigitacao = new EventEmitter<string>();
  @Input() value = '';
  debounce: Subject<string> = new Subject<string>();

  //fase do ciclo de vida Angular que ocorre após instanciação do
  //componente e depois do componente receber os "inbound properties"
  ngOnInit(): void {
    //com o pipe(debounceTime(x)), só passa pra função  do subscribe depois de um intervalo dox X milisegundos
    //OBS: Ao contrário do Observable, o Subject nunca completa. Fica ativo eternamente, portanto,
    //é necessário deinscrever quando não for mais necessário
    this.debounce.pipe(debounceTime(300)).subscribe(filter => this.onDigitacao.emit(filter));
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }
}
