import { Component } from '@angular/core';
import { BancoService } from '../banco.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor (private db: BancoService){

  }

  apei(){
    var result = [];
    this.db.selectGenerico("select * from usuario;").then((response) => {
      for (let i = 0; i != (<Array<Object>>response).length; i++) {
        result[i] = response[i];
        
      }
      
    });
    
    console.log(result);
    
  }
}
