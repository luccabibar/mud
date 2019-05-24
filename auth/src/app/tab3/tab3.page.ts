import { Component } from '@angular/core';
import { BancoService } from "../banco.service"

import QRious from "qrious"
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private db: BancoService){

  }
  
  sleep(ms){
    let start = Date.now();
    let now = Date.now();
    while(now - start < ms){
      now = Date.now()
    }
  }

  /**
   * gera um hash de caracteres alfanumericos de tamanho determinado.
   * parece pouco, mas o numero de possibilidades eh de 62^N
   * 
   * @param tam o tamaho do hash
   * @returns uma string aleatoria de length = tam 
   */
  gerarhash(tam){
    let chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
    let text = "";
    for (let c = 0; c < tam; c++) {
      text += chars[Math.floor(Math.random() * 61)];
      
    }

    return text;
  }
  
  /**
   * gera codigo qr com base num id e num hash 
   * e joga ele num elemento da pagina
   * 
   * @param id id do usuario 
   * @param hash hash gerado aleatoriamente
   */
  geraQr(id, hash){
    let text = id + "-" + hash;
    let target = document.getElementById('qr-img');
    
    //gera codigo e joga ele num elem
    let qr = new QRious({
      element: target,
      value: text
    });
    
  }
  
  iniciaSessao(){
    let id = 1;
    let hash = this.gerarhash(20);

    //gera qr
    this.geraQr(id, hash);

    //cria a session no banco
    let sql = "INSERT INTO public.sessao VALUES (" + 
                "default, " +
                "'" + id + "-" + hash + "', " +
                id + ", " +
                "NULL, " +
                "TRUE, " +
                "NOW(), " +
                "NULL, " +
                "NULL " +
              ");";
    this.db.insertGenerico(sql).then((response) => {
      console.log(response);

    }).catch((ex) => {
      console.log(ex);

    });

    /*this.sleep(1 * 1000)    
    this.db.selectGenerico("SELECT * FROM public.sessao WHERE hash=" + id + "-" + hash).then((response) => {
      console.log(response);

    });*/  

  }
}
