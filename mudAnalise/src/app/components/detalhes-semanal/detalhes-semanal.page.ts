import { BancoService } from './../../servicos/banco.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISemanalSono } from 'src/app/interfaces/ISemanalSono';
import { ISemanaLazer } from 'src/app/interfaces/ISemanaLazer';
import { ISemanaAtividade } from 'src/app/interfaces/ISemanalAtividade';
import { ISemanalAlimentacao } from 'src/app/interfaces/ISemanalAlimentacao';
import { buildDriverProvider } from 'protractor/built/driverProviders';
@Component({
  selector: 'app-detalhes-semanal',
  templateUrl: './detalhes-semanal.page.html',
  styleUrls: ['./detalhes-semanal.page.scss'],
})
export class DetalhesSemanalPage implements OnInit {

  // Cria instancia local das interfaces de cada pilar do relatorio semanal
  public sono: ISemanalSono;
  public lazer: ISemanaLazer;
  public atividade: ISemanaAtividade;
  public alimentacao: ISemanalAlimentacao;

  icone = null;
  myId = null;
  semanaId = null;
  array;
  existe = 1;

  constructor(private activatedRoute: ActivatedRoute, public bd: BancoService) {

  }

  ngOnInit() {
    // Pega os parametros recebidos por Router 
    this.myId = this.activatedRoute.snapshot.paramMap.get('myId');
    this.array = this.myId.split("-");
    // divide o array em

    this.icone = this.array[2];
    this.semanaId = this.array[1];
    this.myId = this.array[0];
  }
  public ionViewDidEnter() {
    this.myId = this.activatedRoute.snapshot.paramMap.get('myId');
    this.array = this.myId.split("-");

    // divide o array em

    this.icone = this.array[2];
    this.semanaId = this.array[1];
    this.myId = this.array[0];

    // se parametro recebidos por Router é X,entao sabemos que há de se abrir tal detalhe semanal

    if (this.myId == "Sono") { this.pegaSono(); }
    if (this.myId == "Atividade Física") { this.pegaAtividade(); }
    if (this.myId == "Lazer") { this.pegaLazer(); }
    if (this.myId == "Alimentação") { this.pegaAlimentacao() }


  }
 /**
  * pega os detalhes sobre o sono do paciente em dada semana
  */
  public async pegaSono() {
    this.bd.selectGenerico("SELECT * FROM sono WHERE semana_id=" + this.semanaId + " ;").then(async (resposta) => {
      console.log("SONO", resposta)
      this.sono = resposta[0];

      // ARRUMAR OS t e f que vem do banco 

      // t/s sono
      if (resposta[0].acordou_naturalmente == 't') {
        this.sono.acordou_naturalmente = true;
      } else if (resposta[0].acordou_naturalmente == 'f') {
        this.sono.acordou_naturalmente = false;
      }
      if (resposta[0].acordou == 't') {
        this.sono.acordou = true;
      } else if (resposta[0].acordou == 'f') {
        this.sono.acordou = false;
      }

      this.existe = 0;
    }).catch(async (resposta) => {
      console.log(resposta);
      this.existe = 2;
    })

  }
/**
 * pega os detalhes das atividades fisicas do paciente em dada semana
 */
  public async pegaAtividade() {
    this.bd.selectGenerico("SELECT * FROM atividade_fisica WHERE semana_id=" + this.semanaId + " ;").then(async (resposta) => {
      console.log("ATIVIDADE FISICA:", resposta)
      this.atividade = resposta[0];

      // ARRUMAR OS t e f que vem do banco 

      // t/s atividade
      if (resposta[0].realizou == 't') {
        this.atividade.realizou = true;
      } else if (resposta[0].realizou == 'f') {
        this.atividade.realizou = false;
      }
      this.existe = 0;
    }).catch(async (resposta) => {
      console.log(resposta);
      this.existe = 2;
    })
  }

  /**
   * pega os detalhes sobre o lazer do paciente em dada semana
   */
  public async pegaLazer() {
    this.bd.selectGenerico("SELECT * FROM bem_estar WHERE semana_id=" + this.semanaId + " ;").then(async (resposta) => {
      console.log("Bem-Estar:", resposta)
      this.lazer = resposta[0];

      // ARRUMAR OS t e f que vem do banco 

      // t/s bem-estar
      if (resposta[0].realizou == 't') {
        this.lazer.realizou = true;
      } else if (resposta[0].realizou == 'f') {
        this.lazer.realizou = false;
      }
      this.existe = 0;
    }).catch(async (resposta) => {
      console.log(resposta);
      this.existe = 2;
    })
  }
/**
 * Recebe os detalhes sobre a alimentacao do paciente em destaque dada a semana
 */
  public async pegaAlimentacao() {
    this.bd.selectGenerico("SELECT * FROM alimentacao WHERE semana_id=" + this.semanaId + " ;").then(async (resposta) => {
      console.log("Alimentação:", resposta)
      this.alimentacao = resposta[0];
      this.existe = 0;
    }).catch(async (resposta) => {
      console.log(resposta);
      this.existe = 2;
    })
  }



}
