import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DadosService } from '../servicos/dados.service';
import { Router } from '@angular/router';
import { BancoService } from '../servicos/banco.service';
import { AlertController } from '@ionic/angular';

import * as moment from 'moment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public semanas;
  public user_sessao;


  information: any[] = [];

  automaticClose: false;

  constructor(
    private ds: DadosService,
    private router: Router,
    private bd: BancoService,
    private alertController: AlertController,
    private http: HttpClient
  ) {
    this.user_sessao = this.ds.getDados("user_sessao");
    this.carregaSemanas();
  }

  ionViewDidEnter() {
    this.user_sessao = this.ds.getDados("user_sessao");
    if (!this.user_sessao) {
      this.router.navigateByUrl("/home");
    } else {
      this.carregaSemanas();
    }
  }

  public async carregaSemanas() {
    this.bd.selectGenerico("SELECT * FROM semana WHERE usuario_id='" + this.user_sessao.id_usuario + "';").then(async (resposta) => {
      console.log(resposta);
      this.semanas = resposta;
      this.information = this.geraJSON(this.semanas);
      console.log("TIME: ", this.information);
      this.information[0].open = true;
    }).catch(async (resposta) => {
      console.log("ERR: ", resposta)
      const alert = await this.alertController.create({
        header: 'ERRO!!',
        subHeader: 'Dados inválidos!',
        message: 'Erro ao buscar semanas! Verifique se há conexão com a internet',
        buttons: ['OK']
      });
      await alert.present();
    })
  }

  private geraJSON(semanas) {
    let temp = [];
    for (let sem of semanas) {
      temp.push(
        {
          "name": moment(sem.data_inicial).format('DD/MM') + " à " + moment(sem.data_final).format('DD/MM/YYYY'),
          "children": [
            {
              "name": "Sono",
              "id": "8h/dia em média de sono sem interrupções.",
              "price": "$25"
            },
            {
              "name": "Bem-Estar",
              "information": "Foi 3x ao cinema com os colegas",
              "price": "$45"
            }
          ]
        }
      );
    }
    console.log("INFO: ", temp);
    return temp;
  }



  toggleSection(index) {
    this.information[index].open = !this.information[index].open;

    // se tirar  o "!", deixa abrir varias consultas ao msm tempo 
    if (this.automaticClose && this.information[index].open) {
      this.information
        .filter((item, itemIndex) => itemIndex != index)
        .map(item => item.open = false);
    }
  }

  toggleItem(index, childIndex) {
    this.information[index].children[childIndex].open = !this.information[index].children[childIndex].open;
  }

}
