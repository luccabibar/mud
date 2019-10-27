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
  //grafico
  @ViewChild('grafico') grafElem;
  grafObj;
  //estatisticas
  estatisticas
  //view
  error;

  /**
   * carrega o grafico 
   */
  async loadView()
  {
    try{
      //pega os dados brutos do banco
      let response: any = await this.getData(this.dadosUser.id_usuario); 
      if(!response.sucesso){
        console.log(response.dados);
        this.error = true;
        return;
      }
      let data = response.dados
                                                              
      //processa os dados do banco em estatisticas e carrega elas pra view
      this.estatisticas = this.prepareEstatisticas(data);
      console.log(this.estatisticas);      

      //processa os dados do banco em um dataset pro grafico
      let grafStuff = this.prepareGrafStuff(data);
      console.log(grafStuff);
      
      //inicializa grfico com dados processado
      this.grafObj = new Chart(this.grafElem.nativeElement, grafStuff);
    }
    catch(ex){
      console.log(ex);
      this.error = true;
    }

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
      //seleciona as crises que ocorreram no ultimo ano
      let sql = "SELECT created_at AS data " +
        "FROM public.crise WHERE usuario_id = " + id + " AND " +
        "DATE_PART('day', now() - created_at) < " + 365 + " " +
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
   * prepara dados estatisticos com base na quantidade de crises
   * 
   * @param data dados brutos base
   * @returns objeto de dados processados
   */
  prepareEstatisticas(data)
  {
    let total = 0;

    //conta total de crises;
    data.forEach(element => 
    {
      total++;
    });

    let mediaMensal = (total / 12).toFixed(2);
    let mediaDiaria = (total / 365).toFixed(2);
    let mediaInterv = (total != 0) ? Math.round(365 * 1 / total) : false;

    return {
      total: total,
      mediaMensal: mediaMensal,
      mediaDiaria: mediaDiaria,
      mediaInterv: mediaInterv
    };
  }

  /**
   * prepara todas as informacoes que um grafico precisa com base em dados brutos do banco
   * 
   * @param data dados brutos do banco
   */
  prepareGrafStuff(data)
  {
    let dataset = this.prepareDataset(data);
    let labels = this.prepareLabels();    

    let opts = {
      legend: {
        display: true,
        position: 'bottom',
        align: "start"
      },

      scales: {
        xAxes: [{
          stacked: false,
          scaleLabel: {
            display: false,
            labelString: 'tempo'
          }
        }],
        yAxes: [{
          stacked: false,
          ticks : {
              suggestedMax : 10,
              min : 0
          },
          scaleLabel: {
            display: true,
            labelString: 'crises por mês'
          }
        }]
      }

    };

    return {
      type: 'bar',
      data: {
        labels: labels,
        datasets: dataset
      },
      options: opts
    };
  }

  /**
   * processa dados brutos do banco em um dataset para o grafico
   * 
   * @param data dados brutos dos bancos
   * @return dataset processado
   * 
   */
  prepareDataset(data)
  {
    let colors = ['D62A61'];
    let ultimoAno = [];
    let hoje  = new Date();
    
    for (let i = 0; i < 13; i++) {
      ultimoAno.push(0);      
    }

    //itera sobre os N ultimos dias
    data.forEach(crise => {
      //adiciona +1 no array de crises para cada crise que ocorre num mes
      data = new Date(crise.data);
      ultimoAno[this.diffMeses(hoje, data)]++;
    });
    
    return [{
      label: 'crises ocorridas',
      data: ultimoAno.reverse(),
      borderColor: "#" + colors[0] + "FF",
      backgroundColor: "#" + colors[0] + "99",
    }];
  }

  /**
   * prepara os labels para o grafico
   * 
   * @returns o array de labels
   */
  prepareLabels()
  {
    let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let hoje  = new Date();
    let ano = hoje.getFullYear();
    let labels = [];

    for(let i = 0; i < 13; i++){
      let mes = hoje.getMonth() - i;
      //if ano atual
      if(mes >= 0){
        labels.push(meses[mes] + " de " + ano);
      }
      //else ano passado
      else{
        labels.push(meses[mes + 12] + " de " + (ano - 1));
      }
    }

    return labels.reverse();
  }

  /**
   * cacula a diferenca de meses de duas datas
   * 
   * @param dataX primeira data
   * @param dataY segunda data
   * @returns a diferenca
   */
  diffMeses(dataX, dataY)
  {
    let yearDiff = dataX.getFullYear() - dataY.getFullYear();  
    let diferenca = dataX.getMonth() - dataY.getMonth();
    return diferenca + ((yearDiff == 0) ? 0 : 12);
  }

  constructor(private db: BancoService, private ds: DadosService, private router: Router) 
  {
    this.error = false;
    this.grafObj = null;
    this.estatisticas = null;
    this.dadosUser = this.ds.getDados("user_sessao");
    this.loadView();
  }

  ngOnInit() 
  {
    
  }
}
