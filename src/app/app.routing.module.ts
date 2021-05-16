import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { SignInComponent } from './home/signin/signin.component';
import { SignUpComponent } from './home/signup/signup.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';

const routes: Routes = [
  { path: '', component: SignInComponent, canActivate: [AuthGuard] }, //URL parametrizada
  { path: 'signup', component: SignUpComponent },
  { path: 'user/:usuario', component: PhotoListComponent, resolve: { photos: PhotoListResolver } }, //URL parametrizada
  { path: 'p/add', component: PhotoFormComponent }, //URL fixa
  { path: '**', component: NotFoundComponent }, //qualquer uma diferente das anteriores
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
