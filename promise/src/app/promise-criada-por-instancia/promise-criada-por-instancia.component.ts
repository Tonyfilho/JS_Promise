import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise-criada-por-instancia',
  templateUrl: './promise-criada-por-instancia.component.html',
  
})
export class PromiseCriadaPorInstanciaComponent implements OnInit {

  constructor() {
    /**
     * Quando criamos uma PROMISE, temos criar uma FUNÇÂO e  passar os 2 parametros
     * dentro da FUNÇÃO, que são eles (resolve, reject).
     * A PROMISE recebe a FUNÇÃO e vai  gerencia ela, retornando
     * SUCCESS or REJECT
     * 
     * Olhe o Ex: O RESOLVE É obrigatorio e o REJECT é opcional.
     * 
     * OBS: No JS quando não se colocar RETURN, nas Funções, seja PROMISE ou Não, 
     * ele o JS RETORNA automaticamente UNDEFINED
     * 
     */
     function promiseInstaciada(){
       return new Promise((resolve, reject) => {
         resolve('Ola Programador');
         reject('Erro da conexão');

       })
     }
     /**
      * Testando a PROMISE
      */
      promiseInstaciada().then(data => console.log('PROMISSE ',data))

      /**
       * Ex de PROMISE que o Resolve vem depois que o SetimeOut for acionado depois 2 segundos
       */

      function promiseComSetimeOut(){
        return new Promise((resolve, reject) => {
          return setTimeout(() => {
             resolve('Somente depois de 2S que o RESOLVE veio');
           }, 2000);
        return reject( console.log('Nosso error'));
        })
      }
       /**
      * Testando a PROMISE com SetimeOut()
      */
     promiseComSetimeOut().then(data => console.log(data));
   }


  ngOnInit(): void {
    /**
     * Neste Exemplo vamos usar uma PROMISE que vem de uma API
     * o end da API é: https://viacep.com.br/ws/SEUCEP/json/
     * ou seja vc manda seu CEP e recebe um JSON
     * Varemos u REQUEST usando o Metodo FETCH,ele retorna uma promise
     * OBS: o FETCH não pertence ao JS, mas sim há uma API do Browser
     */
  
    function pegaCep(cep: any) {
     return window.fetch(`https://viacep.com.br/ws/${cep}/json/`);

    }
    /**
     * Chamando a função
     */
     pegaCep('01001000').then(data => { console.log(`1º DATA do FETCH devolve o Body que tb é JSON, por isto 
      que temos que subscrever novamente em outra PROMISE data2 para recebermos o BODY`),
    data.json().then(dataBody => {console.log(dataBody, dataBody.cep) })});

    /**
     * Chamando a Função e encadiando THEN 
     */

    pegaCep(29072180).then(data => {
      return data.json(); /**como Json(), retorna outra PROMISE, podemos dar um RETURN e fazer
      outro subscrição*/
    }).then(dataBody => {
      console.log('Cep vindo da FUNÇÃO encadiada, endereço da Localidade de: ',dataBody.localidade)
    }).catch(error => console.error('Caso haja erro nos RESOLVES o CATCH estará aqui para lançar o ERROR', error))
  }

}
