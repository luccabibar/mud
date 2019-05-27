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

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  constructor(private db: BancoService){

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
   * @param hash hash gerado aleatoriamente com id do user
   */
  geraQr(hash){
    let target = document.getElementById('qr-img');
    
    //gera codigo e joga ele num elem
    let qr = new QRious({
      element: target,
      value: hash
    });
    
  }
  
  /**
   * gera um objeto sessao no banco de acordo com os dados
   * que ja foram gerados
   * 
   * @param id id do usuario 
   * @param hash hash gerado aleatoriamente com o id do user
   */
  geraSessao(id, hash){
    let sql = "INSERT INTO public.sessao VALUES (" + 
                "default, " +
                "'" + hash + "', " +
                "NULL, " +
                id + ", " +
                "TRUE, " +
                "NOW(), " +
                "NULL, " +
                "NULL " +
              ");";

    this.db.insertGenerico(sql).then((response) => {
      //console.log(response);

    }).catch((ex) => {
      //console.log(ex);

    });
  }

  /**
   * procura por uma sessao pra ver se ela existe.
   * retorna true caso exista, caso contrario, false
   * 
   * @param hash hash gerado aleatoriamente com id do user
   * @returns existencia da sessao
   */
  checkSessao(hash){
    let sql = "SELECT usuario_id FROM sessao WHERE hash='" + hash + "';";
    this.db.selectGenerico(sql).then(response => {
      console.log("response: ", response);
      if(response[0].usuario_id != null){
        return true;

      }
      
    }).catch(ex => {
      console.log("exception: ", ex);
      
    });
    console.log("deu nao");
    
    return false;
  }
  
  /**
   * inicia o processo de sessao, criando um hash pra id da sessao,
   * cira um qrcode com ela e cria um objeto sessao no banco,
   * depois espera por confirmacao que a sessao comecou
   */
  async iniciaSessao(){
    let id = 1;
    let hash = id + "-" + this.gerarhash(20);
    
    //gera qr
    this.geraQr(hash);
    
    //cria a session no banco
    this.geraSessao(id, hash); 
    
    //espera por confirmacao
    let conf = false;
    do{
      //espera um teco e dps procura pela sessao ate achar
      await this.sleep(2 * 1000);
      conf = this.checkSessao(hash);

    }while(!conf);
  }
}
