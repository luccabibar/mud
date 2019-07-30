import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DadosService } from '../servicos/dados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public user;
  public sessoes = [
    { nome: "paciente1", img: "https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png" },
    { nome: "paciente2", img: "https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png" },
    { nome: "paciente3", img: "https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png" },

  ];
  public addSessao() {
    let sessao = { nome: "paciente4", img: "https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png" };
    this.sessoes.push(sessao);
  }

  constructor(
    private AlertController: AlertController,
    private ds: DadosService,
    private router: Router
  ) {
    this.user = this.ds.getDados("user");
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.user = this.ds.getDados("user");
    if (!this.user) {
      this.logout(0);
    }
  }

  public async logout(trava) {
    if (trava == 0) {
      this.ds.removeDados(true, '');
      this.router.navigateByUrl("/login");
    }
    else {
      const alert = await this.AlertController.create({
        header: 'Sair',
        message: 'Deseja realmente sair?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('nem saiu');
            }
          }, {
            text: 'Sim',
            handler: () => {
              this.ds.removeDados(true, '');
              this.router.navigateByUrl("/login");
            }
          }
        ]
      });
      await alert.present();
    }

  }

  async deletadoSucesso() {
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


