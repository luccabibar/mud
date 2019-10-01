import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DadosService } from '../servicos/dados.service';
import { Router } from '@angular/router';
import { BancoService } from '../servicos/banco.service';
import { AlertController } from '@ionic/angular';
//import { LoadingController } from '@ionic/angular';

import * as moment from 'moment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public semanas;
  public user_sessao;
  public existe = 1;
 

  information: any[] = [];

  automaticClose: false;

  constructor(
    private ds: DadosService,
    private router: Router,
    private bd: BancoService,
    private alertController: AlertController,
    private http: HttpClient
    // private load: LoadingController
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

  /**
   * Carrega o as semanas em um array para dps mostra-los na timeline
   */
  public async carregaSemanas() {
    this.bd.selectGenerico("SELECT * FROM semana WHERE usuario_id='" + this.user_sessao.id_usuario + "';").then(async (resposta) => {
      console.log(resposta);
      this.semanas = resposta;
      this.information = this.geraJSON(this.semanas);
      console.log("TIME: ", this.information);
      this.information[0].open = true;
      this.existe = 0;
    }).catch(async (resposta) => {
      console.log("ERR: ", resposta)
      const alert = await this.alertController.create({
        header: 'ERRO!!',
        subHeader: 'Dados inválidos!',
        message: 'Erro ao buscar semanas! Verifique se há conexão com a internet',
        buttons: ['OK']
      });
      await alert.present();
      this.existe = 0;

    }).catch(async (resposta) => {
      console.log(resposta);
      this.existe = 2;
    })
  }
/**
 * assim como o geraJson para as crises, pega as informacoes vitais da semana para melhor organizar os dados na tab2
 * @param semanas 
 */
  private geraJSON(semanas) {
    let temp = [];
    for (let sem of semanas) {
      temp.push(
        {
          "name": moment(sem.data_inicial).format('DD/MM/YYYY') + " à " + moment(sem.data_final).format('DD/MM/YYYY'),
          "children": [
            {
              "name": "Sono",
              "semanaId": sem.id_semana,
              "icone": "bed"
            },
            {
              "name": "Alimentação",
              "semanaId": sem.id_semana,
              "icone": "pizza"
            },
            {
              "name": "Atividade Física",
              "semanaId": sem.id_semana,
              "icone": "fitness"
            },
            {
              "name": "Lazer",
              "semanaId": sem.id_semana,
              "icone": "brush"
            }
          ]
        }
      );
    }
    console.log("INFO: ", temp);
    return temp;
  }


/**
 * abre um item da timeline, exibindo os 4 subitems
 * @param index 
 */
  toggleSection(index) {
    this.information[index].open = !this.information[index].open;

    // se tirar  o "!", deixa abrir varias consultas ao msm tempo 
    if (this.automaticClose && this.information[index].open) {
      this.information
        .filter((item, itemIndex) => itemIndex != index)
        .map(item => item.open = false);
    }
  }
/**
 * executado quando clica em um item da timelien
 * @param index 
 * @param childIndex 
 */
  toggleItem(index, childIndex) {
    this.information[index].children[childIndex].open = !this.information[index].children[childIndex].open;
  }
  // LOADING STUFF



}
