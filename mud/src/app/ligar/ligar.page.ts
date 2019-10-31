import { Component, OnInit } from '@angular/core';
import { DadosService } from '../dados.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { NavController, IonSlides, AlertController, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-ligar',
  templateUrl: './ligar.page.html',
  styleUrls: ['./ligar.page.scss'],
})
export class LigarPage implements OnInit {

  constructor(public dadosService: DadosService, private callNumber: CallNumber, public navCtrl: NavController) { }

  nome1 = this.dadosService.getCont1_nome();
  num1 = this.dadosService.getCont1_num();
  nome2 = this.dadosService.getCont2_nome();
  num2 = this.dadosService.getCont2_num();
  
  ngOnInit() {
    this.nome1 = this.dadosService.getCont1_nome();
    this.num1 = this.dadosService.getCont1_num();
    this.nome2 = this.dadosService.getCont2_nome();
    this.num2 = this.dadosService.getCont2_num();
    if(this.nome2 == "")
    {
      document.getElementById("cont2").style.display='none';
    }
  }

  /**
 * Metodo efetuar chamada telefonica
 */
  async callNow() {
  this.callNumber.callNumber(this.num1, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
}

voltar()
{
  this.navCtrl.navigateBack('tabs/tab2');
}
}
