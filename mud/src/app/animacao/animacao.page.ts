import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animacao',
  templateUrl: './animacao.page.html',
  styleUrls: ['./animacao.page.scss'],
})
export class AnimacaoPage implements OnInit {

  constructor(private AlertController: AlertController) { }

  ngOnInit() {
    var counter = 0;
    var teste = 124;
    var chegou = 0;
    var fonte = 14;
    var aux = 0;
    var opacidade = 1;   //parei aqui!
    var timer = setInterval(function() {
      if( counter >= 10 ) {
        clearInterval( timer );
      }
      if( chegou == 0){
        teste+=3;
        opacidade-=0.023;
        fonte+=1;
        document.getElementById("circulo").style.width=+teste+'px';
        document.getElementById("circulo").style.height=+teste+'px';
        document.getElementById("inspire").style.fontSize=+fonte+'px';
        document.getElementById("inspire").style.color='rgba(255, 255, 255,'+opacidade+')';
        if( teste == 268)
        {
          chegou = 1;
          document.getElementById("inspire").style.display='none';
          document.getElementById("inspire").style.fontSize='124px';
          document.getElementById("expire").style.display='unset';
        }
      }
      if( chegou == 1)
      {
        aux++;
        if( aux == 5)
        {
          chegou = 2;
          aux = 0;
          opacidade = 1;
        }
      }
      if( chegou == 2){
        teste-=2;
        opacidade-=0.015;
        if((teste % 4) == 0)
        {
          fonte-=1;
        }
        document.getElementById("circulo").style.width=+teste+'px';
        document.getElementById("circulo").style.height=+teste+'px';
        document.getElementById("expire").style.fontSize=+fonte+'px';
        document.getElementById("expire").style.color='rgba(255, 255, 255,'+opacidade+')';
        if(teste == 124)
        {
          chegou = 0;
          document.getElementById("expire").style.display='none';
          document.getElementById("inspire").style.display='unset';
          fonte = 14;
          opacidade = 1;
        }
      }
      
    }, 75);
  }

   async vaiRelatCrise()
  {
    
      const alert = await this.AlertController.create({
        message: 'Já está se sentindo melhor?',
        buttons: ['Não', 'Sim']
      });
      return await alert.present();
  
  }

}
