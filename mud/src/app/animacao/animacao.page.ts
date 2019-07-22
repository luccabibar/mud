import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animacao',
  templateUrl: './animacao.page.html',
  styleUrls: ['./animacao.page.scss'],
})
export class AnimacaoPage implements OnInit {

  constructor() { }

  ngOnInit() {
    var counter = 0;
    var timer = setInterval(function() {
      if( counter >= 10 ) {
        clearInterval( timer );
      }
      
      document.getElementById("circulo").style.width='400px';
    }, 1000);
  }

}
