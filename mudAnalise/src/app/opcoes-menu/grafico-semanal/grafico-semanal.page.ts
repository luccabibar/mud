import { Component, OnInit, ViewChild } from '@angular/core';

import { BancoService } from '../../servicos/banco.service';
import { DadosService } from '../../servicos/dados.service';

import { Chart } from "chart.js";
import { colorSets } from '@swimlane/ngx-charts/release/utils';

@Component({
  selector: 'app-grafico-semanal',
  templateUrl: './grafico-semanal.page.html',
  styleUrls: ['./grafico-semanal.page.scss'],
})
export class GraficoSemanalPage implements OnInit 
{
  //dados do paciente (service)
  paciente;
  //dados do paciente (banco)
  semana;
  alimentacao;
  hidratacao;
  lazer;
  sono;
  //controle da view
  semKey;
  //grafico
  grafSel;
  grafObj;
  @ViewChild("grafico") grafElem;
  //grafico secundario
  havegrafsec;
  grafSecObj;
  @ViewChild("grafsec") secElem;
  //observações
  obs
  obsData

  /**
   * gera uma cor aleatoria
   * 
   * @returns string comm a cor em hexdec
   */
  randColor(){
    let vals = "0123456789ABCDEF"
    let cor = "#";
    for (let i = 0; i < 6; i++) {
      cor += vals[Math.floor(Math.random() * 16)];
    }
    return cor;
  }

  /**
   * converte int pra float pQ O ANGULAR NAO CONSEGUE LIDAR COM TIPOS
   * (tambem atualiza a view)
   */
  changeOpt()
  {
    this.semKey = Number.parseInt(this.semKey);
    this.changeGraf();
  }

  /**
   * altera o grafico com base no escolhido
   * olhando bem, eu poderia ter exraido diversos snippets pra diversas funcoes e aplicar o DP calisthenics
   * nao esperava que essa funcao fosse tomar essas proporcoes
   * oh well, se sobrar tempo eu deixo esse codigo legivel
   */
  changeGraf()
  {
    //grafico principal
    let dataset = [];
    let opts;
    //grafico secundario
    let datasec = [];
    let secopts;
    
    //preenche o dataset condicionalmente
    switch(this.grafSel) {
      //case alimentacao
      case "alim":{
        let first = true; 
        this.obs = false;
        this.havegrafsec = false;

        //itera sobre cada semana
        this.alimentacao.forEach((sem) => 
        { 
          let i = 0;
          //itera sobre cada indice da semana
          for (var key in sem) { //"foreach"
            if (sem.hasOwnProperty(key)) {
              let value = sem[key];
            
              //if for a primeira vez, cria objeto de dataset
              if(first){     
                dataset.push({
                  label: key,
                  data: [value],
                  borderColor: this.randColor(),
                  fill: false,
                  borderWidth: 1
                });
              }
              //else so add o valor no dataset correspondente
              else{
                dataset[i].data.push(value);
              }
              i++;
            }
          }
          first = false;
        });

        //opcoes
        opts = {
          scales: {
            xAxes: [{
              stacked: false
            }],
            yAxes: [{
              stacked: false
            }]
          }
        };

        break;
      }
      //case lazer
      case "lazr":{
        this.obs = true;
        this.havegrafsec = false;
        let i = 0;
        
        //itera sobre cada semana 
        this.lazer.forEach((sem) => 
        { 
          //datset secundario pra observaoces
          this.obsData.push({
            "semana": this.semana[i].created_at,
            "value": sem.comentario
          });

          //dataset principal pro grafico
          //if for a primeira vez, cria objeto de dataset
          if(i == 0){     
            dataset.push({
              label: "frequencia",
              data: [sem.vezes],
              borderColor: this.randColor(),
              fill: false,
              borderWidth: 1
            });
          }
          //else so add o valor no dataset correspondente
          else{
            dataset[0].data.push(sem.vezes);
          }
          
          i++;
        });
        
        //opcoes
        opts = {
          scales: {
            xAxes: [{
              stacked: false
            }],
            yAxes: [{
              stacked: false
            }]
          }
        };

        break;
      }
      //case hidratacao
      case "hidr":{
        this.obs = false;
        this.havegrafsec = false;
        let i = 0;
        console.log(this.hidratacao);
        
        //itera sobre cada semana
        this.hidratacao.forEach((sem) => 
        {
          //if for a primeira iter cria o objeto dataset
          if(i == 0){
            dataset.push({
              label: "frequencia",
              data: [sem.hidratacao],
              borderColor: this.randColor(),
              fill: false,
              borderWidth: 1
            });
          }
          //else apenas pusha valor
          else{
            dataset[0].data.push(sem.vezes);
          }

          i++;
        });

        //opcoes
        opts = {
          scales: {
            xAxes: [{
              stacked: false
            }],
            yAxes: [{
              stacked: false
            }]
          }
        };

        break;
      }
      //case sono
      case "sono":{
        this.havegrafsec = true;
        this.obs = false;
        
        //ok desse aqui eu gosto
        //cores custom
        let colors = ['3399ff', 'ff3333'];
        let i = 0;
        this.sono.forEach((sem) => 
        {
          let qualDset = (sem.acordNat == 't') ? true : false;
          
          //if for a primeira vez, cria dois objetos datasets, um pras semanas em que acorodu naturalmente e outro pro caso contrario (e tambem o objeto datasec)
          if(i == 0){     
            dataset.push({
              label: "horas dormidas (acorodu natralmente)",
              //adiciona valor caso tenha acordado naturalmente, caso contrario adciona 0
              data: [(qualDset) ? sem.duracao : 0],
              borderColor: '#' + colors[0] + 'ff',
              backgroundColor: '#' + colors[0] + '99',
              fill: false,
              borderWidth: 1
            });
            dataset.push({
              label: "horas dormidas (nao acorodu natralmente)",
              //adiciona valor caso nao tenha acordado naturalmente, caso contrario adciona 0
              data: [(!qualDset) ? sem.duracao : 0],
              borderColor: '#' + colors[1] + 'ff',
              backgroundColor: '#' + colors[1] + '99',
              fill: false,
              borderWidth: 1
            });

            datasec.push({
              label: "vezes acordadas durante a noite (média semanal)",
              //adiciona valor caso nao tenha acordado naturalmente, caso contrario adciona 0
              data: [sem.acordVezes],
              borderColor: '#' + '66ff66' + 'ff',
              backgroundColor: '#' + '66ff66' + '99',
              fill: false,
              borderWidth: 1
            });
          }
          //else so add o valor no dataset correspondente
          else{
            dataset[0].data.push((qualDset) ? sem.duracao : 0);					
            dataset[1].data.push((!qualDset) ? sem.duracao : 0);	
            
            datasec[0].data.push(sem.acordVezes);
          }

          i++;
        });

        opts = {
          scales: {
            xAxes: [{
              stacked: true
            }],
            yAxes: [{
              stacked: true
            }]
          }
        };

        secopts = {
          scales: {
            xAxes: [{
              stacked: false
            }],
            yAxes: [{
              stacked: false
            }]
          }
        };

        break;
      }
    }

    let grafStuff = {
      type: 'bar',
      data: {
        //labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: dataset
      },
      options: opts
    };

    //cria um objeto grafico caso nao existe
    if(this.grafObj == null){
      this.grafObj = new Chart(this.grafElem.nativeElement, grafStuff);
    }
    //else limpa o obj grafico e add o novo dataset
    else{
      console.log("yare yare");
      this.grafObj.data.datasets = dataset;
      this.grafObj.options = opts;
      this.grafObj.update();
    }

    if(this.havegrafsec){
      //eu poderia usar ngsyle pra alterar dinamicamente? sim
      //eu vou? nao 
      document.getElementById("grafSecBox").style.visibility = "visible";

      let secGrafStuff = {
        type: 'bar',
        data: {
          //labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
          datasets: datasec
        },
        options: secopts
      };
  
      //cria um objeto grafico caso nao existe
      if(this.grafSecObj == null){
        this.grafSecObj = new Chart(this.secElem.nativeElement, secGrafStuff);
      }
      //else limpa o obj grafico e add o novo dataset
      else{
        console.log("daze");
        this.grafSecObj.data.datasets = datasec;
        this.grafSecObj.options = secopts;
        this.grafSecObj.update();
      }
    }
    else{
      document.getElementById("grafSecBox").style.visibility = "hidden";
    }
  }

  /**
   * a partir de um id de um usuario, pega todas as semanas, e para cada semana,
   * pega todos os dados relacionados a aquela semana semana
   * 
   * @param id o id do usuario
   */
  pegaDados(id)
  {
    let sql = "SELECT * FROM (" +  
		  "SELECT sem.created_at, sem.observacao, " +
      "ali.carboidratos, ali.proteinas, ali.laticinios, ali.verd_frut, ali.hidratacao, " +
      "bem.b_realizou, bem.vezes, bem.comentario, " +
      "son.duracao_sono, son.vezes_acordou, son.acordou_naturalmente " +
      "FROM semana AS sem " +
      "JOIN alimentacao AS ali ON sem.id_semana = ali.semana_id " +
      "JOIN bem_estar AS bem ON sem.id_semana = bem.semana_id " +
      "JOIN sono AS son ON sem.id_semana = son.semana_id " +
      "WHERE sem.usuario_id = " + id +" " +
      "ORDER BY sem.created_at LIMIT 12" +
      ") AS semana ORDER BY created_at asc;"

    this.db.selectGenerico(sql)
    .then((resp: any) => 
    {
      this.semana = [];
      this.alimentacao = [];
      this.hidratacao = [];
      this.lazer = [];
      this.sono = [];

      resp.forEach(row => 
      {
        let dataIni = (row.created_at).split('-');
        dataIni = dataIni[2] + "/" + dataIni[1] + "/" + dataIni[0];

        //5 pacotes de dados brutos
        this.semana.push({
          "created_at": dataIni,
          "observacao": row.observacao
        });
        this.alimentacao.push({
          "carboidratos": row.carboidratos,              
          "proteinas": row.proteinas,              
          "laticinios": row.laticinios,              
          "verd_frut": row.verd_frut,              
        });
        this.hidratacao.push({
          "hidratacao": row.hidratacao                
        });
        this.lazer.push({
          "b_realizou": row.b_realizou,
          "vezes": row.vezes,
          "comentario": row.comentario
        });
        this.sono.push({
          "duracao": row.duracao_sono,
          "acordVezes": row.vezes_acordou,
          "acordNat": row.acordou_naturalmente
        });
      });
    })
    .catch(ex => 
    {
      console.log("err: ", ex);      
    });
  }

  constructor(private db: BancoService, private data: DadosService) 
  {    
    this.grafObj = null;
    this.grafSecObj = null;
    this.paciente = this.data.getDados("user_sessao");
    this.pegaDados(this.paciente.id_usuario);
    this.semKey = 0;
    this.obs = false;
    this.obsData = [];
  }

  ngOnInit() { }

  ionViewDidEnter() { }

}
