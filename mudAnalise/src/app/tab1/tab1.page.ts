import { BancoService } from './../servicos/banco.service';
import { DadosService } from './../servicos/dados.service';
import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public user_sessao;
  public profissional;
  public crises;
  public existe = 1;

  information;


  // public crises = [
  //   { data: "25/08/2019", tipo: "leve" },
  //   { data: "29/08/2019", tipo: "moderado" },
  //   { data: "19/07/2019", tipo: "forte" },
  //   { data: "06/09/2019", tipo: "extremo" },


  // ]


  constructor(
    private alertController: AlertController,
    private callNumber: CallNumber,
    private router: Router,
    private ds: DadosService,
    private bd: BancoService,
    public navCtrl: NavController
  ) {
    this.user_sessao = this.ds.getDados("user_sessao");
    this.profissional = this.ds.getDados("user");
    this.carregarCrises();
  }

  // PARAMS
  criseId;
  tipo;
  public NavigationExtras = {
    queryParams: {
      criseId: this.criseId,
      tipo: this.tipo
    }
  };



  ionViewDidEnter() {
    this.profissional = this.ds.getDados("user");
    if (!this.profissional) {
      this.ds.removeDados(true, '');
      this.router.navigateByUrl("/login");
    }
  }

  async callNow() {
    this.callNumber.callNumber(this.user_sessao.celular, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  abrirAbas() {
    this.router.navigateByUrl('/opcoes-menu/ficha-usuario')
  }

  async onClick(criseId, tipo) {
    // this.router.navigateByUrl('/detalhes-crise/'+criseId);
    this.criseId = criseId;
    this.tipo = tipo;
    this.navCtrl.navigateForward(['/detalhes-crise/'], this.NavigationExtras);

  }

  public mudaIntensidade(intensidade) {
    if (intensidade == "1") {
      intensidade = "leve"
    } else if (intensidade == "2") {
      intensidade = "moderado"
    } else if (intensidade == "3") {
      intensidade = "forte"
    }
    else if (intensidade == "4") {
      intensidade = "extremo"
    }

    return intensidade;
  }

  //#region aqui vou puxar as crises do banco
  private geraJSON(crises) {
    let temp = [];
    for (let cri of crises) {
      temp.push(
        {
          "criseId": cri.id_crise,
          "name": moment(cri.created_at).format('DD/MM/YYYY'),
          "intensidade": this.mudaIntensidade(cri.intensidade),
          "duracao": this.duracao(cri.hora_inicio, cri.hora_fim)

        }
      );
    }
    console.log("INFO: ", temp);
    return temp;
  }

  public duracao(hora_inicio, hora_fim) {
    var start = moment(hora_inicio, "HH:mm");
    var end = moment(hora_fim, "HH:mm");
    var minutes = end.diff(start, 'minutes');

    if (minutes < 0 || minutes == null || minutes == NaN) {
      minutes = 0;
    }
    return minutes;
  }

  carregarCrises() {
    this.bd.selectGenerico("SELECT * FROM crise WHERE usuario_id=" + this.user_sessao.id_usuario + ";")
    .then(async (resposta) => {
      console.log(resposta);
      this.crises = resposta;
      this.information = this.geraJSON(this.crises);
      console.log("crises: ", this.information);
      this.information[0].open = true;
      this.existe = 0;
    }).catch(async (resposta) => {
      
      console.log("ERR: ", resposta)

      const alert = await this.alertController.create({
        header: 'ERRO!!',
        subHeader: 'Dados inválidos!',
        message: 'Erro ao buscar crises! Verifique se há conexão com a internet',
        buttons: ['OK']
      });
      await alert.present();
      this.existe = 0;

    }).catch(async (resposta) => {
      console.log(resposta);
      this.existe = 2;
    })
  }


  doRefresh(event) {
    this.carregarCrises();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  public atualizaCrises() {
    this.carregarCrises();

  }
}
//#endregion


