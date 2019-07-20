import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DadosService } from '../servicos/dados.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public user;
  public sessoes = [
    {nome:"paciente1",img:"https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png"},
    {nome:"paciente2",img:"https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png"},
    {nome:"paciente3",img:"https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png"},
    
  ];
  public addSessao(){
    let sessao = {nome:"paciente4", img:"https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png"};
    this.sessoes.push(sessao);
    

  }

  constructor(private AlertController: AlertController, private dados: DadosService) {
    this.user= this.dados.getDados("user");
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


