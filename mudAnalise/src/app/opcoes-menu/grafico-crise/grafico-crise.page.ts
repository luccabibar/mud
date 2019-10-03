import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DadosService } from 'src/app/servicos/dados.service';
import { BancoService } from 'src/app/servicos/banco.service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-grafico-crise',
  templateUrl: './grafico-crise.page.html',
  styleUrls: ['./grafico-crise.page.scss'],
})
export class GraficoCrisePage implements OnInit {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  teste:string;
  totalCrises;
  totalCrisesMes;
  totalCrisesDias;
  public user_sessao;
  h = [];
  primeiro;
  constructor(private BancoService: BancoService, private ds: DadosService, private router: Router) {
    this.user_sessao = this.ds.getDados("user_sessao");
  }

   ngOnInit() {
     this.lineChartMethod(null);
    
  }
  async RetornarListaAnos(){
    let ReturnAnos = await this.BancoService.selectGenerico("SELECT EXTRACT('YEAR' FROM hora_inicio) AS ANO FROM crise WHERE usuario_id = " +this.user_sessao.id_usuario+" GROUP BY ANO ORDER BY ANO DESC;");
    let anos=[];
    for(let i in ReturnAnos)
      anos[i]=ReturnAnos[i].ano;
    return anos;
  }
  //lista os anos que apresentam crise
  async lineChartMethod($event = null) {

    this.h = await this.RetornarListaAnos();
    this.primeiro = this.h[0];

    let crises;

    if($event!=null){//o $event é ele que identifica se foi selecionado
       crises = await this.BancoService.selectGenerico("SELECT COUNT(id_crise) AS CRISE,EXTRACT('MONTH' FROM hora_inicio) AS MESES FROM crise WHERE EXTRACT('YEAR' FROM hora_inicio)="+$event.target.value+" AND usuario_id =" + this.user_sessao.id_usuario + " GROUP BY MESES ORDER BY MESES");
    }
    //select do número de crises do banco
    else{
       crises = await this.BancoService.selectGenerico("SELECT COUNT(id_crise) AS CRISE,EXTRACT('MONTH' FROM hora_inicio) AS MESES FROM crise WHERE EXTRACT('YEAR' FROM hora_inicio)="+this.h[0]+ "AND usuario_id =" + this.user_sessao.id_usuario + " GROUP BY MESES ORDER BY MESES");
    }
    let valor = [0,0,0,0,0,0,0,0,0,0,0,0];
    let totalCrises= 0;
    for(let i in crises){
      valor[crises[i].meses]=crises[i].crise;
      totalCrises += crises[i].crise;
    }
    this.totalCrises = totalCrises * 1;
    this.totalCrisesMes = (totalCrises/12).toFixed(2);
    this.totalCrisesDias = (totalCrises/365).toFixed(2);
    //realiza as estatísticas do gráfico
    
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro','outubro', 'Novembro', 'Dezembro'],
        datasets: [
          {
            label: 'Ocorrência de crises',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: valor,
            spanGaps: false,
          }
        ]
      }
    });
  }
  //cria a base de dados do gráfico 
  
  ionViewDidEnter() {
    this.user_sessao = this.ds.getDados("user_sessao");
    if (!this.user_sessao) {
      this.ds.removeDados(true, '');
      this.router.navigateByUrl("/login");
    }
  }
  clickOk($e){
    alert($e.target.value);
  }
  view;

}
