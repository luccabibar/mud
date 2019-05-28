import { Component } from '@angular/core';
import { BancoService } from '../banco.service';
import { SingletonService } from '../singleton.service';
import { defineBase } from '@angular/core/src/render3';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor (private db:BancoService, private sgt:SingletonService){
    
  }

  loadStuff(){
    console.log(this.sgt);
    
    //checka a permissao
    if (this.sgt.session.status != 1){
      return;
    }
    
    //carrega as coisas
    //this.db.selectGenerico("select * from logs where id_usuario=" + this.sgt.session.status + ";")

    //a tabela de logs nem existe ainda, entaoooo... nao da pra testa :/
    //fica pra prox
  }
  
}
