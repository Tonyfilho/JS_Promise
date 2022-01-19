import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PromiseConceitosBasicoComponent } from './promise_conceitos_basicos/promise_conceitos_basicos.component';


@NgModule({
  declarations: [
    AppComponent,
    PromiseConceitosBasicoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
