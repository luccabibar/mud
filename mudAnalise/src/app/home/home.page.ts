import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private AlertController: AlertController) {

  }

  ngOnInit() {
  }
  async deletadoSucesso(){
    const alert = await this.AlertController.create({
      header: '',
      subHeader: '',
      message: "Paciente Deletado com Sucesso",
      buttons: ['OK']

    });
    await alert.present();
  }

  

  async alertaDeletar() {
    const alert = await this.AlertController.create({
      header: 'Apagar Resgistro',
      message: 'Deseja realmente apagar todos os dados deste <strong>paciente</strong>?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.deletadoSucesso();
          }
        }
      ]

    });
    await alert.present();
  }

}


