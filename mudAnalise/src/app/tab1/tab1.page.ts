import { BancoService } from './../servicos/banco.service';
import { DadosService } from './../servicos/dados.service';
import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public user_sessao;
  public profissional;
  // public crises;
  public existe = 1;

  public information;
  //public information: any[] = [];


  public crises = [
    { data: "25/08/2019", tipo: "leve" },
    { data: "29/08/2019", tipo: "moderado" },
    { data: "19/07/2019", tipo: "forte" },
    { data: "06/09/2019", tipo: "extremo" },


  ]

  constructor(
    private alertController: AlertController,
    private callNumber: CallNumber,
    private router: Router,
    private ds: DadosService,
    private bd: BancoService
  ) {
    this.user_sessao = this.ds.getDados("user_sessao");
    this.profissional = this.ds.getDados("user");
   // this.carregarCrises();
  }

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

  async onClick(criseId){
    this.router.navigateByUrl('/detalhes-crise/'+criseId);
    console.log(criseId);
  }


  //#region aqui vou puxar as crises do banco
  private geraJSON(crises) {
    let temp = [];
    for (let cri of crises) {
      temp.push(
        {
          "data": moment(cri.hora_inicio).format('DD/MM'),
          "children": [
            {
              "name": "Sono",
              "CriseId": cri.id_crise,
            },
           
          ]
        }
      );
    }
  }

  // carregarCrises() {
  //   this.bd.selectGenerico("SELECT * FROM crise WHERE usuario_id='" + this.user_sessao.id_usuario + "';").then(async (resposta) => {
  //     console.log(resposta);
  //     this.crises = resposta;
  //     this.information = this.geraJSON(this.crises);
  //     console.log("crises: ", this.information);
  //     this.information[0].open = true;
  //     this.existe = 0;
  //   }).catch(async (resposta) => {
  //     console.log("ERR: ", resposta)
  //     const alert = await this.alertController.create({
  //       header: 'ERRO!!',
  //       subHeader: 'Dados inválidos!',
  //       message: 'Erro ao buscar crises! Verifique se há conexão com a internet',
  //       buttons: ['OK']
  //     });
  //     await alert.present();
  //     this.existe = 0;

  //   }).catch(async (resposta) => {
  //     console.log(resposta);
  //     this.existe = 2;
  //   })
  // }

}
//#endregion


