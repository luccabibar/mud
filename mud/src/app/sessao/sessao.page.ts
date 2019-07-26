import { Component, OnInit } from '@angular/core';

import { BancoService } from "../banco.service";
import { DadosService } from "../dados.service";

import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
import { AlertController } from '@ionic/angular';
import { BoundDirectivePropertyAst } from '@angular/compiler';

@Component({
  selector: 'app-sessao',
  templateUrl: './sessao.page.html',
  styleUrls: ['./sessao.page.scss'],
})
export class SessaoPage implements OnInit {

  dados;

  checksession()
  {
    let sessao = this.dados.getDados("sessao");
    if(!sessao || !sessao.ativo){
      //nao existe sessao
      document.getElementById("notsessao").style.visibility = "visible";
    } 
    else{
      //ja existe sessao
      document.getElementById("notsessao").style.visibility = "visible";
    }
  }

  constructor(db: BancoService, dados: DadosService, qrReader: ZBar) 
  {  
    this.dados = dados;
  }

  ngOnInit() 
  {
    this.checksession();
  }

}
