import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-for',
  templateUrl: './ng-for.page.html',
  styleUrls: ['./ng-for.page.scss'],
})
export class NgForPage implements OnInit {

  public valor;

  public listaArray = []; //variavel do tipo ARRAY vazia.

  public listaDeFrutas = ['Banana', 'Maçã', 'Pera', 'Uva']; //variavel do tipo ARRAY, com uma lista de frutas.

  public listaPokemons = [
    { nome: 'Bulbasaur', numero: 1, img: 'bulbasaur.jpg' },
    { nome: 'Charmander', numero: 4, img: 'charmander.jpg' },
    { nome: 'Squirtle', numero: 7, img: 'squirtle.jpg' },
    { nome: 'Pikachu', numero: 25, img: 'pikachu.jpg' }
  ]; // variavel do tipo ARRAY, contendo uma lista de objetos de pokemons.

  public listaProdutos = [
    { nome: 'Refrigerante', valor: 5.50 },
    { nome: 'Salgadinho', valor: 3.00 },
    { nome: 'Chiclete', valor: 0.50 },
    { nome: 'Chocolate', valor: 2.50 }
  ];

  constructor() { }

  ngOnInit() {
  }

  // Adiciona os dados da variavel valor no array.
  public adicionarNoArray() {
    // Push adiciona a variavel no array.
    this.listaArray.push(this.valor);

    this.valor = null; // Limpa a variavel.
  }

  public excluirPeloIndex(posicao: number) {
    // Remove 1 elemento a partir do index passado.
    this.listaDeFrutas.splice(posicao, 1);
    console.log(this.listaDeFrutas);
  }

  public excluirBuscandoPosicao(item) {
    // Cria um numero que não pode ser mudado dentro do método
    // Ele irá receber em qual posição o item está
    const index = this.listaPokemons.indexOf(item);

    // Usando o index encontrado, removemos o item do array.
    // Quando a posição for -1, quer dizer que nao foi possivel encontrar o item no array.
    if (index != -1) {
      this.listaPokemons.splice(index, 1);
    }
  }

  public retornaTotal() {
    // Cria uma variavel local para somar o total dos produtos
    let total: number = 0;

    // Percorre a lista de produtos para somar seu total
    for (let produto of this.listaProdutos) {
      // Soma o valor total anterior com o valor do produto.
      total = total + produto.valor;
    }

    //Retorna o valor total dos produtos da lista.
    return total;
  }

}
