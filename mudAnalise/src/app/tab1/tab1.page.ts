import { BancoService } from './../servicos/banco.service';
import { DadosService } from './../servicos/dados.service';
import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public user_sessao;
  public profissional;

  constructor(
    private callNumber: CallNumber,
    private router:Router,
    private ds:DadosService,
    private db:BancoService 
  ) {
    this.user_sessao= this.ds.getDados("user_sessao");
    this.profissional= this.ds.getDados("user");
   }

   ionViewDidEnter() {
    this.profissional = this.ds.getDados("user");
    if (!this.profissional) {
      this.ds.removeDados(true, '');
      this.router.navigateByUrl("/login");
    } 
  }

  callNow(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  abrirAbas(){
    this.router.navigateByUrl('/opcoes-menu/ficha-usuario')
  }

}


