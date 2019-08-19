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

  public sono: ISemanalSono;
  public lazer: ISemanaLazer;
  public atividade: ISemanaAtividade;
  public alimentacao: ISemanalAlimentacao;

  icone = null;
  myId = null;
  semanaId = null;
  array;
  existe=1;

  constructor(private activatedRoute: ActivatedRoute, public bd: BancoService) {

  }

  ngOnInit() {
    this.myId = this.activatedRoute.snapshot.paramMap.get('myId');
    this.array = this.myId.split("-");
    // divide o array em

    this.icone = this.array[2];
    this.semanaId = this.array[1];
    this.myId = this.array[0];
  }
  public ionViewDidEnter(){
    this.myId = this.activatedRoute.snapshot.paramMap.get('myId');
    this.array = this.myId.split("-");
    // divide o array em

    this.icone = this.array[2];
    this.semanaId = this.array[1];
    this.myId = this.array[0];

    if (this.myId == "Sono") {this.pegaSono(); }

  }
  //  TODO --> conectar com o banco e puxar detalhe semanal onde semana Id = x && 
  // id usuario =x && id_prof = x
  public async pegaSono() {
    this.bd.selectGenerico("SELECT * FROM sono WHERE semana_id=" + this.semanaId + " ;").then(async (resposta) => {
      console.log("SONO",resposta)
      this.sono = resposta[0];
      this.existe=0;
    }).catch(async (resposta) => {
      console.log(resposta);
      this.existe=2;
    })

  }



}
