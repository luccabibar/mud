import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-class',
  templateUrl: './ng-class.page.html',
  styleUrls: ['./ng-class.page.scss'],
})
export class NgClassPage implements OnInit {

  // Variavel para receber qual estilo será utilizado
  public css: string = '';

  // Array que permite o item possuir mais que um estilo;
  public listaEstilos = [];

  public idade: number = 0;

  constructor() { }

  ngOnInit() {
  }

  public addEstilo(estilo) {
    // Procura o estilo para saber se ele existe na lista
    let index = this.listaEstilos.indexOf(estilo);

    // Adiciona o estilo apenas se ele não for encontrado na lista.
    if (index == -1) {
      this.listaEstilos.push(estilo);
    }

  }

  public removeEstilo(estilo) {
    // Procura o estilo para saber se ele existe na lista
    let index = this.listaEstilos.indexOf(estilo);

    // Remove o estilo apenas se ele for encontrado na lista.
    if (index != -1) {
      this.listaEstilos.splice(index, 1);
    }
  }

  public limpaEstilos() {
    this.css = null;
    this.listaEstilos = [];
  }

}
