import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DadosService } from 'src/app/servicos/dados.service';
import { BancoService } from 'src/app/servicos/banco.service';
import { Router } from '@angular/router';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-grafico-crise',
  templateUrl: './grafico-crise.page.html',
  styleUrls: ['./grafico-crise.page.scss'],
})
export class GraficoCrisePage implements OnInit {

  data = [
    {
      'name': 'Jan',
      'value': 31
    },
    {
      'name': 'Feb',
      'value': 19
    },
    {
      'name': 'Mar',
      'value': 21
    },
    {
      'name': 'Abr',
      'value': 20
    },
    {
      'name': 'Mai',
      'value': 56
    },
    {
      'name': 'Jun',
      'value': 24
    }
  ];

  constructor(
    private ds: DadosService,
    private db: BancoService,
    private router: Router,

  ) {
    this.user_sessao = this.ds.getDados("user_sessao");

  }


  ionViewDidEnter() {
    this.user_sessao = this.ds.getDados("user_sessao");
    if (!this.user_sessao) {
      this.ds.removeDados(true, '');
      this.router.navigateByUrl("/login");
    }
  }

  view;
  public user_sessao;


  ngOnInit() {
  }
  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }


}
