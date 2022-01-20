import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promise-avancada-encadiamento',
  templateUrl: './promise-avancada-encadiamento.component.html',
})
export class PromiseAvancadaEncadiamentoComponent implements OnInit {
  /**
   * Aqui estudaremos o uso de promise de forma encadeada,
   * imagine se vc tem que ir a DB para buscar um CEP para depois
   * se inscrever em uma API para ter acesso ao endereço com rua etc,
   * vamos aprender fazer:
   * COMO UTILIZAR,
   * COMO FZ REQUEST ASSINCRONOS,
   * OPERAÇÕES EM CADEIA,
   *
   */

  constructor() {
    /**
     * Quando uma uma operação assincrona depende o valor da outra , chamamos isto de
     * REQUESTS ASSINCRONOS
     * vamos criar uma Função que já retorna uma PROMISE.RESOLVE(), já com cep
     * para simular uma ida a DB de uma cliente para buscar o seu CEP
     */

    function buscaCep() {
      /**Aqui simulamos um ida a DB com uma PROMISE já com a resposta SUCCESS */
      return Promise.resolve(29072200);
    }
    function pegaEnd(cep: any) {
      return window.fetch(`https://viacep.com.br/ws/${cep}/json/`);
    }
    function extraiJson(data: Response) {
      /**O Parametro da DATA precisa ser do tipo RESPONSE
      se for ANY, retornará undefine na função */
      return data.json();
    }
    function imprimeEndereco(endereco: any) {
      return console.log('Endereço: ', endereco);
    }
    function ImprimeError(localError: any) {
      return console.error('error nos REQUEST :', localError);
    }

    /**
     * Usaremos o REQUEST ASSINCRONO, para buscar o CEP e passar para outra API de endereços
     * este TIPO de operações ASSINCRONAS temos que usar o ENCADEAMENTO de THEN para PROMISE ou SUBSCRIBE para OBSERVABLE
     */
    buscaCep()
      .then((cep) => {
        /**Fui a DB, fiz um REQUEST, peguei o CEP de forma ASSICRONA */
        return pegaEnd(
          cep
        ); /**Já com o CEP em Mãos, chamos outra função Vai a uma API e passo o CEP */
      })
      .then((body: Response) => {
        return body.json(); /** O retorno da API é outra PROMISE com o BODY, onde transformo em JSON
        OBS: TIPAR o paramentro como RESPONSE, pois o Angular precisa saber */
      })
      .then((endereco) => {
        /** Por ter uma retorno PROMISE,faço outro REQUEST, agora sim recebendo o ENDEREÇO */
        console.log('Endereço da localidade: ', endereco.localidade, endereco);
      })
      .catch((error) => console.log('aconteceu um error: ', error));

    /**Faremos os mesmo REQUEST ASSINCRONOS, mas agora refatorando tudo para
     * dentro de funções separadas.
     */
    buscaCep()
      .then(pegaEnd)
      .then(extraiJson)
      .then(imprimeEndereco)
      .catch(ImprimeError)
      .finally(() => {
        /**Usamos o FINALLY quando precisamo passar outras informações ou acessar
         * uma outra API  Caso a 1º API estaja OffLine e  haja ERROS,
         * com isto FINALLY() vai execultar outros REQUEST ou algo que passarmos */
        console.log(
          'Sou o FINALLY , sou  sempre Executado independente se foi SUCCESS or ERROR '
        );
      });
  }

  ngOnInit(): void {
    /**
     * Falaremos sobre PROMISE.ALL([]), que devolve uma Array de Promise, na ORDEM que foi passado
     * independente se a 1º no index 0, demorar mais do que a 2º ou a 3º, a ordem será sempre o
     * que foi dentro do array.
     *
     * Ex: onde temos 2 funções q devolvem 2 promise com o time diferente de resposta
     * 1º Demora 5 Segundos para retornar o RESOLVE e a outra 2 Segundos.  Mesmo passando a Promise
     * que leva menos tempo, o PROMISE.ALL(), vai retornar a ORDEM do INDEX.
     *
     */
    function demora5Segundos() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('Demorou 5 Segundos');
        }, 5000);
      });
    }
    function demora2Segundos() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('Demorou 5 Segundos');
        }, 2000);
      });
    }

    Promise.all([demora5Segundos, demora2Segundos]).then(dataArray => {
      console.log('PROMISE ALL()',dataArray)
    })
  }
}
