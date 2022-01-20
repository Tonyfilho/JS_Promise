import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PromiseConceitosBasicoComponent } from './promise_conceitos_basicos/promise_conceitos_basicos.component';
import { PromiseCriadaPorInstanciaComponent } from './promise-criada-por-instancia/promise-criada-por-instancia.component';
import { PromiseAvancadaEncadiamentoComponent } from './promise-avancada-encadiamento/promise-avancada-encadiamento.component';


@NgModule({
  declarations: [
    AppComponent,
    PromiseConceitosBasicoComponent,
    PromiseCriadaPorInstanciaComponent,
    PromiseAvancadaEncadiamentoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
