import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoComponent } from './photo/photo.component';
import { PhotoModule } from './photo/photo.module';

@NgModule({
  declarations: [],
  //se o componente não for colocado no exports, ele será privado,
  //não poderá ser usado por outros módulos, apenas dentro do próprio módulo
  exports: [PhotoComponent],
  imports: [PhotoModule, PhotoFormModule, PhotoListModule, HttpClientModule, CommonModule],
})
export class PhotosModule {}
