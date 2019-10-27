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
  //configuracoes do datasource
  maxLinhas = 8; //maximo de reginstros que puxa do banco
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
  obs;
  obsData;
  //tooltip
  tooltip;
  tooltipData;

  /**
   * altera o estado de visibilidade de um elemento para visivel ou invisivel
   * 
   * @param elem id do elemento
   * @param visivel estado de visibilidade
   */
  setVisbilidElem(elemId, visivel)
  {
    let elem = document.getElementById(elemId);
    if(visivel){
      elem.style.visibility = "visible";
      elem.style.position = "static";
    }
    else{
      elem.style.visibility = "hidden";
      elem.style.position = "absolute";
    }
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
    this.setVisbilidElem("grafBox", true);
    
    //grafico principal
    let dataset = [];
    let opts;
    //grafico secundario
    let datasec = [];
    let secopts;
    
    //label
    let labels = [];
    this.semana.forEach(sem => 
    {
      labels.push(sem.created_at);  
    });
    
    //preenche o dataset condicionalmente
    switch(this.grafSel) {
      //case alimentacao
      case "alim":{
        //cores custom
        let colors = ['ffa500', 'ff3333', '5cbdbb','9ad318'];
        //legendas custom
        let legendas = ['carboidratos', 'proteínas', 'laticínios', 'verduras e frutas']

        let first = true; 
        this.obs = false;
        this.havegrafsec = false;

        this.tooltip = true;
        this.tooltipData = {
          titulo: "Consumo (vezes por semana):",
          //texto em array para multilinha
          texto: [
            "1- baixo (um a dois dias na semana)",
            "2- moderado (tres a cinco dias na semana)",
            "3- alto (seis a sete dias na semana)",
          ]
        };

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
                  label: legendas[i],
                  data: [value],
                  //cores custom
                  borderColor: "#" + colors[i] + "ff",
                  backgroundColor: "#" + colors[i] + "99",
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
              stacked: false,
              scaleLabel: {
                display: true,
                labelString: 'tempo'
              }
            }],
            yAxes: [{
              stacked: false,
              ticks : {
                  suggestedMax : 4,    
                  min : 0
              },
              scaleLabel: {
                display: true,
                labelString: 'alimento consumido'
              }              
            }]
          }
        };

        break;
      }
      //case lazer
      case "lazr":{
        //cores
        let colors = ['ffd700'];

        this.obs = true;
        this.havegrafsec = false;
        let i = 0;
        
        this.tooltip = true;
        this.tooltipData = {
          titulo: "Vezes realizadas:",
          //texto em array para multilinha
          texto: [
            "1- baixo (um a dois dias na semana)",
            "2- moderado (tres a cinco dias na semana)",
            "3- alto (seis a sete dias na semana)",
          ]
        };

        //itera sobre cada semana 
        this.lazer.forEach((sem) => 
        { 
          //datset secundario pra observaoces
          if(sem.comentario && sem.comentario.toLowerCase() != "null"){
            this.obsData.push({
              "semana": this.semana[i].created_at,
              "value": sem.comentario
            });
          }

          //dataset principal pro grafico
          //if for a primeira vez, cria objeto de dataset
          if(i == 0){     
            dataset.push({
              label: "frequencia",
              data: [sem.vezes],
              //cores custom
              borderColor: "#" + colors[0] + "ff",
              backgroundColor: "#" + colors[0] + "99",
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
              stacked: false,
              scaleLabel: {
                display: true,
                labelString: 'tempo'
              }
            }],
            yAxes: [{
              stacked: false,
              ticks : {
                  suggestedMax : 4,    
                  min : 0
              },
              scaleLabel: {
                display: true,
                labelString: 'atividades de lazer realizadas'
              }
            }]
          }
        };

        break;
      }
      //case hidratacao
      case "hidr":{
        //cores
        let colors = ['1f06f0'];

        this.obs = false;
        this.havegrafsec = false;
        let i = 0;

        this.tooltip = true;
        this.tooltipData = {
          titulo: "Consumo (média semanal):",
          //texto em array para multilinha
          texto: [
            "1- baixo (menos de cinco copos por dia)",
            "2- moderado (menos de seis a onze copos por dia)",
            "3- alto (doze copos ou mais por dia)",
          ]
        };
        
        //itera sobre cada semana
        this.hidratacao.forEach((sem) => 
        {
          //if for a primeira iter cria o objeto dataset
          if(i == 0){
            dataset.push({
              label: "frequencia",
              data: [sem.hidratacao],
							borderColor: "#" + colors[0] + "ff",
							backgroundColor: "#" + colors[0] + "99",
              fill: false,
              borderWidth: 1
            });
          }
          //else apenas pusha valor
          else{
            dataset[0].data.push(sem.hidratacao);
          }

          i++;
        });

        //opcoes
        opts = {
          scales: {
            xAxes: [{
              stacked: false,
              scaleLabel: {
                display: true,
                labelString: 'tempo'
              }
            }],
            yAxes: [{
              stacked: false,
              ticks : {
                  suggestedMax : 4,    
                  min : 0
              },
              scaleLabel: {
                display: true,
                labelString: 'água consumida'
              }
            }]
          }
        };

        break;
      }
      //case sono
      case "sono":{
        this.havegrafsec = true;
        this.obs = false;
        
        this.tooltip = false;
        this.tooltipData = {};

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
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: 'tempo'
              }
            }],
            yAxes: [{
              stacked: true,
              ticks : {
                  suggestedMax : 12,
                  max: 24,    
                  min : 0
              },
              scaleLabel: {
                display: true,
                labelString: 'horas dormidas por noite'
              }
            }]
          }
        };

        secopts = {
          scales: {
            xAxes: [{
              stacked: false,
              scaleLabel: {
                display: true,
                labelString: 'tempo'
              }
            }],
            yAxes: [{
              stacked: false,
              ticks : {
                  suggestedMax : 12,    
                  min : 0
              },
              scaleLabel: {
                display: true,
                labelString: 'vezes acordadas durante a noite'
              }
            }]
          }
        };

        break;
      }
    }

    //ajustes nas opts universais
    opts.legend = {
      display: true,
      position: 'bottom',
      align: "start"
    };

    let grafStuff = {
      type: 'bar',
      data: {
        labels: labels,
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
      this.grafObj.data.datasets = dataset;
      this.grafObj.options = opts;
      this.grafObj.update();
    }

    if(this.havegrafsec){
      this.setVisbilidElem("grafSecBox", true);
      
      secopts.legend = {
        display: true,
        position: 'bottom',
        align: "start"
      }

      let secGrafStuff = {
        type: 'bar',
        data: {
          labels: labels,
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
        this.grafSecObj.data.datasets = datasec;
        this.grafSecObj.options = secopts;
        this.grafSecObj.update();
      }
    }
    else{
      this.setVisbilidElem("grafSecBox", false);
    }
  }

  /**
   * a partir de um id de um usuario, pega todas as semanas, e para cada semana,
   * pega todos os dados relacionados a aquela semana semana
   * 30
   * 
   * @param id o id do usuario
   * @param limite o limite de registros que pega do banco
   */
  pegaDados(id, limite)
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
      "WHERE sem.usuario_id = " + id + " " +
      "ORDER BY sem.created_at LIMIT " + limite +
      ") AS semana ORDER BY created_at asc;"

    console.log(sql);    

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
        let dataIni = row.created_at.split(' ')[0].split('-');
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

      console.log(this.semana, this.alimentacao, this.hidratacao, this.lazer, this.sono);
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
    this.pegaDados(this.paciente.id_usuario, this.maxLinhas);

    this.semKey = 0;
    this.obs = false;
    this.obsData = [];
    this.tooltip = false;
    this.tooltipData = {};
  }

  ngOnInit() { }

  ionViewDidEnter() { }

  aa = false;
}
