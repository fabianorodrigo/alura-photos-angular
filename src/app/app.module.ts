import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CoreModule } from './core/core.module';
import { ErrorsModule } from './errors/errors.module';
import { HomeModule } from './home/home.module';
import { PhotosModule } from './photos/photos.module';
import { TabelasModule } from './tabelas/tabelas.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PhotosModule, TabelasModule, AppRoutingModule, ErrorsModule, HomeModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
