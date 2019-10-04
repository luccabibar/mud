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
  existeSintoma = 1;
  duracao;
  duracao_texto;

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
      this.pegaCrise();


    } catch (error) {
      console.log("erro ao pegar crise e/ou erro ao processar data");
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

  /**
   * Este metodo calcula a duracao da crise recebendo os dois parametros abaixo
   * @param hora_inicio Hora inicial da crise
   * @param hora_fim  Hora final da Crise
   */
  /*public duracao(hora_inicio, hora_fim) {
    this.start = moment(hora_inicio, "HH:mm");
    this.end = moment(hora_fim, "HH:mm");
    var minutes = this.end.diff(this.start, 'minutes');

    if (minutes < 0 || minutes == null || minutes == NaN) {
      minutes = 0;
    }
    this.intervalo = minutes;
  }*/

  /**
   * Organiza em um array os sintomas recebidos da tabela sintomas(relativos ao usuario, durante uma crise X)
   */
  public organizaSintomas() {
    let j = 0;
    for (let i = 1; i < this.crises.sintoma_inicial.length; i += 2) {
      console.log("ID DO SINTOMA", this.crises.sintoma_inicial[i]);
      this.bd.selectGenerico("SELECT nome FROM sintoma WHERE id_sintoma=" + this.crises.sintoma_inicial[i] + " ;").then(async (resposta) => {
        this.listaSintomas[j] = resposta[0];
        j++;
        console.log("RESPOSTA -->", resposta[0]);
      }).catch(async (resposta) => {
        console.log("ERRO: ", resposta);
        this.existeSintoma = 2;
      })
    }
    console.log("SINTOMAS: ", this.listaSintomas);
    this.existeSintoma = 0;
  }
/**
 * Puxa os dados referentes à determinada crise, utilizando BancoService, preenchendo
 * a interface de Crise
 */
  public async pegaCrise() {
    this.bd.selectGenerico("SELECT * FROM crise WHERE id_crise=" + this.criseId + " ;").then(async (resposta) => {
      console.log("Crises:", resposta)
      this.crises = resposta[0];

      this.existe = 0;
      this.organizaSintomas();
      this.duracao = this.crises.duracao;
      if(this.duracao == "0")
        this.duracao_texto = "Menos de 10 minutos";
      if(this.duracao == "200")
        this.duracao_texto = "10 - 15 minutos";
      if(this.duracao == "400")
        this.duracao_texto = "15 - 30 minutos";
      if(this.duracao == "600")
        this.duracao_texto = "31 - 45 minutos";
      if(this.duracao == "800")
        this.duracao_texto = "46 - 60 minutos";
      if(this.duracao == "1000")
        this.duracao_texto = "Mais de 60 minutos";
    }).catch(async (resposta) => {
      console.log(resposta);
      this.existe = 2;
    })
  }
}

