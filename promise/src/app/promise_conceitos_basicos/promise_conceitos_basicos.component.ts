import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise-conceitos-basicos',
  templateUrl: './promise_conceitos_basicos.component.html',
 
})
export class PromiseConceitosBasicoComponent implements OnInit {

   /**
    * O JS é SINGLE THREAD e SINCRONO
    * e
    * IO Não Bloqueate, com isto ele aceita operações ASSINCRONA,
    * ou seja enquanto a pagina é carregada consigo, buscar um CEP em uma API,
    * sem que o sistema fique travado esperando uma resposta  Ex: DB ou API pegar CEP -> CTT
    * 
    * As PROMISES é a forma mais mais fácil do JS trabalhar com ASSINCRONO
    * 
    * 
    */
  constructor() {
    /**
     * Ex: de Promise usando o SETIMEOUT() é um agendador onde execulta uma função depois de TIME
     * que foi agendado. Ele percente a uma API que é INVOCATE pela BROWSER, sem bloqueio, 
     * 
     * A PROMISE tem 4 estados
     * 1º PENDENTE --Quando vc faz uma requisição, é PENDENTE, pois não houve resultado:
     * a PROMISE Tem um metodo chamado RESOLVE()
     * 
     * 2º REALIZADO -- É quando o RESULTADO é SUCCESS. Usa-se o THEN
     * 
     * 3º REJEITADO -- É quando houve um erro, no request e o RESULTADO é ERROR, Usa-se o CATCH
     * 
     * 4º ESTABELECIDO -- É RESULT, ou resultado final, seja SUCCESS or ERROR
     * 
     * Ex: de PROMISES NO JS, o retorno da PROMISE É um OBJETO do JS,
     * as PROMISES possuem um FILA ESPECIAL e preferencial na frente de outras fila no JS
     */

     /**
      *  Ex. do REALIZADO, neste ex: temos metodos para o RESOLVE, que é o THEN()
      */
     function promiseRealizada() {
       return Promise.resolve(30); /**
       quando PASSAMOS um valor aqui no RESOLVE, isto é retornado lá no THEN
     */     }
     promiseRealizada().then((data : any) => { console.log('Fila da Promise antes do SetimeOut() somando data +2', data + 2)});

     /**
      * Ex. do REJEITADO: Quando é REJEITADO ele não cai no bloco do THEN {BLOCO},
      * mas sim no BLOCO do CATCH para tratamento do ERRO
      */
     function promiseRejeitado(){
       return Promise.reject('Error de conexão, promessa não cumprida'); /**
       quando PASSAMOS um valor aqui no REJECT, isto é retornado lá no CATCH
     */  
     };
     promiseRejeitado().catch(data => console.error(data))
   }

  ngOnInit(): void {
    

    console.log('primeiro console');
    /** o SetimeOut(), não pertence ao JS, e sim a uma API que o BROWSER importa, 
     * pois o JS é SINCRONO, não bloqueante */
      setTimeout(() => { 
        console.log('segundo console');        
      }, 2000);
    console.log('terceiro console');
  }

}
