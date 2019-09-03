import { ICrise } from './../interfaces/ICrise';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BancoService } from '../servicos/banco.service';
import * as moment from 'moment';

@Component({
  selector: 'app-detalhes-crise',
  templateUrl: './detalhes-crise.page.html',
  styleUrls: ['./detalhes-crise.page.scss'],
})
export class DetalhesCrisePage implements OnInit {


  public crises: ICrise;

  listaSintomas = [];

  info = null;
  array = null;
  existe = 1;
  intervalo = null;
  existeSintoma=1;

  // param VARs
  criseId = null;
  tipo = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    public bd: BancoService,
  ) {

    this.info = this.activatedRoute.snapshot.params.info;
    this.array = this.info.split("-");
    this.array[2];
    this.tipo = this.array[1];
    this.criseId = this.array[0];
    console.log(this.criseId);
    console.log(this.tipo);
    try {
      this.pegaCrise()
    } catch (error) {
      console.log("error");
    }

  }



  ngOnInit() {
    try {
      this.pegaCrise()
    } catch (error) {
      console.log("error");
    }
    this.info = this.activatedRoute.snapshot.params.info;
    this.array = this.info.split("-");
    this.array[2];
    this.tipo = this.array[1];
    this.criseId = this.array[0];
  }


  public duracao(hora_inicio, hora_fim) {
    var start = moment(hora_inicio, "HH:mm");
    var end = moment(hora_fim, "HH:mm");
    var minutes = end.diff(start, 'minutes');

    if (minutes < 0 || minutes == null || minutes == NaN) {
      minutes = 0;
    }
    this.intervalo = minutes;
  }

  public organizaSintomas() {
    let j=0;
    for (let i = 1; i < this.crises.sintoma_inicial.length; i+=2) {
      console.log("ID DO SINTOMA",this.crises.sintoma_inicial[i]);
      this.bd.selectGenerico("SELECT nome FROM sintoma WHERE id_sintoma=" + this.crises.sintoma_inicial[i] + " ;").then(async (resposta) => {
        this.listaSintomas[j] = resposta[0];
        j++;
        console.log("RESPOSTA -->" ,resposta[0]);
      }).catch(async (resposta) => {
        console.log("ERRO: ",resposta);
        this.existeSintoma = 2;
      })
    }
    console.log("SINTOMAS: ",this.listaSintomas);
    this.existeSintoma=0;
  }

  public async pegaCrise() {
    this.bd.selectGenerico("SELECT * FROM crise WHERE id_crise=" + this.criseId + " ;").then(async (resposta) => {
      console.log("Crises:", resposta)
      this.crises = resposta[0];

      this.existe = 0;
      this.duracao(this.crises.hora_inicio, this.crises.hora_fim);
      this.organizaSintomas();
    }).catch(async (resposta) => {
      console.log(resposta);
      this.existe = 2;
    })
  }
}

