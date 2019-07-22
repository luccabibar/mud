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
    var teste = 100;
    var chegou = 0;
    var fonte = 13;
    var opacidade = 100;   //parei aqui!
    var timer = setInterval(function() {
      if( counter >= 10 ) {
        clearInterval( timer );
      }
      if( chegou == 0){
        teste+=4;
        opacidade-=5;
        fonte+=1;
        document.getElementById("circulo").style.width=+teste+'px';
        document.getElementById("circulo").style.height=+teste+'px';
        document.getElementById("inspire").style.fontSize=+fonte+'px';
        document.getElementById("inspire").style.opacity=+opacidade+'%';
        if( teste == 268)
        {
          chegou = 1;
        }
      }
      if( chegou == 1){
        teste-=2;
        opacidade+=3;
        document.getElementById("circulo").style.width=+teste+'px';
        document.getElementById("circulo").style.height=+teste+'px';
        if(teste == 124)
        {
          chegou = 0;
        }
      }
      
    }, 80);
  }

}
