import { Component, OnInit } from '@angular/core';

import { BancoService } from "../banco.service";
import { DadosService } from "../dados.service";

import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
import { AlertController } from '@ionic/angular';
import { BoundDirectivePropertyAst } from '@angular/compiler';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-sessao',
  templateUrl: './sessao.page.html',
  styleUrls: ['./sessao.page.scss'],
})
export class SessaoPage implements OnInit {

  dados;
  db:BancoService;
  zbarOptions: ZBarOptions;
  qr: ZBar;
  hash;

  /**
   * procura pela exsitecia de uma sssao no banco a partir de um hash
   *  
   * @param hash o hash a ser buscado
   * @returns a existencia da sessao no bacno
   */
  buscaSessao(hash)
  {
    let sql = " SELECT * FROM sessao WHERE hash = '" + hash + "' AND status = 0;";
    this.db.selectGenerico(sql)
    .then(result => {

    })
  }

  /**
   * scanFoda
   * 
   * liga a camera pra ler o qrcode, e dps valida e ativa a sessao no banco
   */
  scanFoda(){
    //leitura do codigo
    this.qr.scan(this.zbarOptions)
    //sucesso
    .then(result => {

      this.hash = result;
    })
    //erro
   .catch(error => {
     
      alert(error);
      this.hash = 1414124;
    });

    //if erro, retorna
    if(this.hash == 1414124){

      return;
    }

    //validacao
    this.buscaSessao(this.hash);

  }

  constructor(db: BancoService, dados: DadosService, qr: ZBar) 
  {  
    this.db = db;
    this.dados = dados;
    this.qr = qr;
    this.zbarOptions = {
      text_title: "scanner",
      text_instructions: "aponte sua camera para o QR-code",
      camera: "back",
      flash: "off",
      drawSight: true
    }
  }

  ngOnInit() 
  {
    
  }

}
