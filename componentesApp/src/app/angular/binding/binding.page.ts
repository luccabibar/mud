import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.page.html',
  styleUrls: ['./binding.page.scss'],
})
export class BindingPage implements OnInit {

  public variavel; // variavel que aceita qualquer tipo de valor.

  public qualquerCoisa: any; // variavel que aceita qualquer tipo de informação, usada quando nao se sabe o tipo correto.

  public valor: number; // variavel que aceita apenas numeros, com ou sem virgula.

  public valorDeclarado: number = 88; // variavel numerica com valor inicial de 88 declarado.

  public texto: string; // variavel do tipo string para textos.

  public textoDeclarado: string = 'Olá Ionic!'; // variavel do tipo string com valor inicial declarado.

  public booleana: boolean = false; // variavel do tipo booleana, aceita apenas verdadeiro ou falso.

  public objeto = {}; // variavel do tipo objeto JSON, com um objeto vazio.

  // variavel do tipo objeto JSON com propriedade declaradas.
  public pokemon = { nome: 'Bulbasaur', numero: 1, img: '/assets/bulbasaur.png' }; 
  constructor() { }

  ngOnInit() {
  }

}
