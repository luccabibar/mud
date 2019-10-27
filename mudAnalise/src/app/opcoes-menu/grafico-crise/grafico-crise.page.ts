import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DadosService } from 'src/app/servicos/dados.service';
import { BancoService } from 'src/app/servicos/banco.service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { resolve } from 'url';

@Component({
  selector: 'app-grafico-crise',
  templateUrl: './grafico-crise.page.html',
  styleUrls: ['./grafico-crise.page.scss'],
})
export class GraficoCrisePage implements OnInit 
{
  //dados do usuario
  dadosUser;
  //controle da pagina
  dias = 30; //ate qunatos dias ele pega no banco
  //grafico
  @ViewChild('grafico') grafElem;
  grafObj;
  //view
  error;

  /**
   * carrega o grafico 
   */
  async loadGraf()
  {
    //pega os dados brutos do banco
    let response: any = await this.getData(this.dadosUser.id_usuario); 
    if(!response.sucesso){
      console.log(response.dados);
      this.error = true;
    }
    let data = response.dados
                                                             
    //processa os dados do banco
    let grafStuff = this.prepareGrafStuff(data);
    //inicializa grfico com dados processado
    this.grafObj = new Chart(this.grafElem.nativeElement, grafStuff);

    // loadObservacoes(grafData);
  }

  /**
   * pega os dados que sao relevantes pro grafico
   * 
   * @param id id do usuario
   * @returns promessa que resolve nos dados e rejeita numa excessao 
   */
  async getData(id)
  {
    //async boizzz
    return new Promise((resolve, reject) => 
    {
      let dataset = null;
      //query sql
      //seleciona as crises que pertencam a um usuario E seja dos ultimos 30 dias, agrupando por intensidade E dia que ocorreu
      let sql = "SELECT COUNT(created_at) AS quantidade, created_at AS data, intensidade " +
        "FROM public.crise WHERE usuario_id = " + id + " AND " +
        "DATE_PART('day', now() - created_at) < " + this.dias + " " +
        "GROUP BY (created_at, intensidade) " +
        "ORDER BY data;";
      this.db.selectGenerico(sql)
      //sucesso
      .then((response: Array<Object>) => 
      {
        resolve({sucesso: true, dados: response});
      })
      //fail
      .catch((exception: Object) => 
      {
        reject({sucesso: false, dados: exception});
      });

    });
  }

  /**
   * prepara todas as informacoes que um grafico precisa com base em dados brutos do banci
   * 
   * @param data dados brutos do banco
   */
  prepareGrafStuff(data)
  {
    let dataset = this.prepareDataset(data);
    // let labels = [];// this.prepareLabels(data);

    let opts = {

    };

    return {
      type: 'bubble',
      data: {
        // labels: labels,
        datasets: dataset
      },
      options: opts
    };
  }

  /**
   * processa dados brutos do banco em um dataset para o grafico
   * 
   * @param data dados brutos dos bancos
   */
  prepareDataset(data)
  {
    let colors = ['d62a61'];
    let ultimosNDias = this.getUltimosNDias(this.dias);
    let dataset = {
      data: [],
      borderColor: "#" + colors[0] + "ff",
      backgroundColor: "#" + colors[0] + "99",
    };

    //itera sobre os N ultimos dias
    for(let i = 0; i < ultimosNDias.length; i++){
      let found = false;
      //procura crises que tenham ocorrido nesta data 
      data.forEach((crise) => 
      {
        //se achar uma crise que tenha ocorrido nesse dia, add ao dataset        
        if(crise.data == this.formatData(ultimosNDias[i])){
          found = true;
          console.log("foundk", i);
          
          dataset.data.push({
            x: i + 1,
            y: Number(crise.intensidade),
            r: crise.quantidade * 5
          });
        }
      });

      //se nao achar nenhuma crise, add dado vazio para ocupar espaco
      if(!found){
        dataset.data.push({
          x: i + 1,
          y: 0,
          r: 0
        });
      }
    }
    console.log(dataset);
    return dataset;
  }

  getUltimosNDias(qtd)
  {
    let lastN = [];
    let hj = new Date();

    for(let i = 0; i < qtd; i++){
      //milisegundos desde time 0 ate a data de i dias atras
      let NDiasAtras = new Date().setDate(hj.getDate() - i);
      lastN.push(new Date(NDiasAtras));
    }

    return lastN.reverse();
  }

  /**
   * formata um objeto data para que fique igual ao padrao do postgresql
   * 
   * @param data objeto data
   * @returns string semenlhande ao padrao do postgresql
   */
  formatData(data)
  {
    return data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate();
  }

  constructor(private db: BancoService, private ds: DadosService, private router: Router) 
  {
    this.error = false;
    this.grafObj = null;
    this.dadosUser = this.ds.getDados("user_sessao");
    this.loadGraf();
  }

  ngOnInit() 
  {
    
  }
}
