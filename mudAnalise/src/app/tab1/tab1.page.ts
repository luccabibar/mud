import { BancoService } from './../servicos/banco.service';
import { DadosService } from './../servicos/dados.service';
import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public user_sessao;
  public profissional;

  constructor(
    private alertController: AlertController,
    private callNumber: CallNumber,
    private router: Router,
    private ds: DadosService,
    private db: BancoService
  ) {
    this.user_sessao = this.ds.getDados("user_sessao");
    this.profissional = this.ds.getDados("user");
  }

  ionViewDidEnter() {
    this.profissional = this.ds.getDados("user");
    if (!this.profissional) {
      this.ds.removeDados(true, '');
      this.router.navigateByUrl("/login");
    }
  }

  async callNow() {
    this.callNumber.callNumber(this.user_sessao.celular, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  abrirAbas() {
    this.router.navigateByUrl('/opcoes-menu/ficha-usuario')
  }

}


