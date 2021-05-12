import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';

@NgModule({
  declarations: [CardComponent],
  exports: [CardComponent],
  //é uma boa prática sempre importar o CommonModule
  imports: [CommonModule],
})
export class CardModule {}
