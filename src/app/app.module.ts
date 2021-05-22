import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CoreModule } from './core/core.module';
import { ErrorsModule } from './errors/errors.module';
import { PhotosModule } from './photos/photos.module';
import { TabelasModule } from './tabelas/tabelas.module';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt');
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PhotosModule, TabelasModule, ErrorsModule, CoreModule, AppRoutingModule],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
