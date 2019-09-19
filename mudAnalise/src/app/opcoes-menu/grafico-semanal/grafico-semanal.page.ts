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
  atividade;
  bemEstar;
  //controle da view
  semKey;
  //grafico
  grafObj;
  grafSel
  @ViewChild("grafico") grafElem;

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
   * PHP RAINHA ANGULAR NADINHA 
   * (tambem atualiza a view)
   */
  changeOpt()
  {
    this.semKey = Number.parseInt(this.semKey);
    this.changeGraf();
  }

  /**
   * altera o grafico com base no escolhido
   */
  changeGraf()
  {
    let dataset = [];

    switch(this.grafSel) {
      case "alim":
        let first = true;
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
                let color = this.randColor();
                dataset.push({
                  label: key,
                  data: [value],
                  backgroundColor: color,
                  borderColor: color,
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
        break;
      /*case "atvd":
        dataset = this.atividade;
        break;
      case "bemes":
        dataset = this.bemEstar;
        break;*/
    }

    console.log(dataset);

    let grafOpts = {
      type: 'bar',
      data: {
        //labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: dataset
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }; 
    this.grafObj = new Chart(this.grafElem.nativeElement, grafOpts);
  }

  /**
   * a partir de um id de um usuario, pega todas as semanas, e para cada semana,
   * pega todos os dados relacionados a aquela semana semana
   * 
   * @param id o id do usuario
   */
  pegaDados(id)
  {
    let sql = "SELECT sem.data_inicial, sem.observacao, " +
      "ali.carboidratos, ali.proteinas, ali.laticinios, ali.verd_frut, ali.hidratacao, " +
      "atv.a_realizou, atv.tempo, atv.intensidade, " +
      "bem.b_realizou, bem.vezes, bem.comentario " +
      "FROM semana AS sem " +
      "JOIN alimentacao AS ali ON sem.id_semana = ali.semana_id " +
      "JOIN atividade_fisica AS atv ON sem.id_semana = atv.semana_id " +
      "JOIN bem_estar AS bem ON sem.id_semana = bem.semana_id " +
      "WHERE sem.usuario_id = " + id + " ";
      "ORDER BY sem.data_inicial; ";

    this.db.selectGenerico(sql)
    .then((resp: any) => 
    {
      this.semana = [];
      this.alimentacao = [];
      this.atividade = [];
      this.bemEstar = [];

      resp.forEach(row => 
      {
        let dataIni = (row.data_inicial).split('-');
        dataIni = dataIni[2] + "/" + dataIni[1] + "/" + dataIni[0];

        this.semana.push({
          "data_inicial": dataIni,
          "observacao": row.observacao
        });
        this.alimentacao.push({
          "carboidratos": row.carboidratos,              
          "proteinas": row.proteinas,              
          "laticinios": row.laticinios,              
          "verd_frut": row.verd_frut,              
          "hidratacao": row.hidratacao                
        });
        this.atividade.push({
          "a_realizou": row.a_realizou,
          "tempo": row.tempo,
          "intensidade": row.intensidade
        });
        this.bemEstar.push({
          "b_realizou": row.b_realizou,
          "vezes": row.vezes,
          "comentario": row.comentario
        });
      });
    })
    .catch(ex => 
    {
      console.log("err: ", ex);      
    })
  }

  constructor(private db: BancoService, private data: DadosService) 
  {    
    this.paciente = this.data.getDados("user_sessao");
    this.pegaDados(this.paciente.id_usuario);
    this.semKey = 0;
  }

  ngOnInit() { }

  ionViewDidEnter()
  {    
    this.changeGraf();
  }

}
