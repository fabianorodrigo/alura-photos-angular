import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './errors/not-found/not-found.component';
import {PhotoFormComponent} from './photos/photo-form/photo-form.component';
import {PhotoListComponent} from './photos/photo-list/photo-list.component';
import {PhotoListResolver} from './photos/photo-list/photo-list.resolver';

const routes: Routes = [
  {path: 'user/:usuario', component: PhotoListComponent, resolve: {photos: PhotoListResolver}}, //URL parametrizada
  {path: 'p/add', component: PhotoFormComponent}, //URL fixa
  {path: '**', component: NotFoundComponent}, //qualquer uma diferente das anteriores
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
