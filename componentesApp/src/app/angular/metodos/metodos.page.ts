import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metodos',
  templateUrl: './metodos.page.html',
  styleUrls: ['./metodos.page.scss'],
})
export class MetodosPage implements OnInit {

  public valorDeclarado: number = 88;

  public texto: string;

  public color = 'light';

  constructor() { }

  ngOnInit() {
  }


  // declaração de um método, ele deve fazer algo quando chamado.
  public metodo() {
    alert('Olá eu sou um alert, que foi chamado por um método');
  }

  // declaração de um método, que altera variaveis, mudando tambem o programa.
  public metodoAlteraVariaveis() {
    // modifica a cor a cada clique do usuário.
    if (this.color == 'danger') { // verifica qual cor está exibindo
      // se vermelha muda para branco
      this.color = 'light';
    } else {
      // se branca muda para vermelha
      this.color = 'danger';
    }
  }

  // declaração de um método que retorna um valor
  public metodoComRetorno() {
    return this.valorDeclarado + 2; // irá retorta a soma de 88 + 2, ou seja ele devolve 90
  }

  // declaração de método que recebe um valor
  public metodoQueRecebeValor(nome) {
    alert('Você passou o seguinte valor: ' + nome);
  }

  // declaração de método que recebe dois valores e utiliza variveis.
  public metodoQueRecebeValores(nome: string, numero: number) {
    // let declara uma variavel que só pode ser utilizada dentro do método.
    let ano: number = 2019;
    // realiza o calculo de menos.
    let idade = ano - numero; // realiza o calculo de menos.

    // Altera uma variavel global.
    this.texto = 'Seu nome é: ' + nome + ' e sua idade é: ' + idade;
  }

}
