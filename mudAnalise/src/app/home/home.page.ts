import { BancoService } from './../servicos/banco.service';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DadosService } from '../servicos/dados.service';
import { Router } from '@angular/router';
import { IUsuario } from '../interfaces/IUsuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public profissional;
  public sessoes;
  public existe = 1;
  private noSess;


  constructor(
    private AlertController: AlertController,
    private ds: DadosService,
    private router: Router,
    private bd: BancoService,
    private alertController: AlertController

  ) {
    this.profissional = this.ds.getDados("user");
    this.noSess = false;
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.profissional = this.ds.getDados("user");
    if (!this.profissional) {
      this.logout(0);
    } else {
      this.carregaSessoes();
    }
  }

  doRefresh(event) {
    this.carregaSessoes();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


  public async carregaSessoes() {
    this.bd.selectGenerico("SELECT * FROM sessao INNER JOIN usuario ON sessao.usuario_id=usuario.id_usuario WHERE profissional_id='" + this.profissional.id_usuario + "' AND status = 1;").then(async (resposta) => {
      console.log(resposta);
      this.sessoes = resposta;
      this.existe = 0;
    }).catch(async (resposta) => {
      console.log(resposta);
      this.noSess = true;
      this.existe = 2;
    })
  }

  public abreSessao(sessao) {
    let usuario: IUsuario = {
      id_usuario: sessao.id_usuario,
      nome: sessao.nome,
      cpf: sessao.cpf,
      email: sessao.email,
      celular: sessao.celular,
      dt_nasc: sessao.dt_nasc,
      sexo: sessao.sexo
    };
    this.ds.setDados("user_sessao", usuario);
    this.router.navigateByUrl("/tabs");
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
    this.carregaSessoes();

  }

  async alertaDeletar(idSessao) {
    const alert = await this.AlertController.create({
      header: 'Apagar Resgistro',
      message: 'Deseja realmente apagar todos os dados deste <strong>paciente</strong>?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.apagarSessao(idSessao);

            this.deletadoSucesso();
          }
        }
      ]

    });
    await alert.present();
  }


  public apagarSessao(idSessao) {
    let sql = "UPDATE sessao SET  status = 0, deleted_at=NOW() WHERE id_sessao=" + idSessao + ";";
    this.bd.updateGenerico(sql).then(async resposta => {
      console.log(resposta);
    });
    this.carregaSessoes();
  }
}


