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
   * substitui o elemento do qr code por um limpo novo
   */
  limpaQr() {
    //joga fora o elem
    let target = document.getElementById('qr-img');
    let parent = target.parentElement;
    parent.removeChild(target);

    //cria o elem novo
    let clear = document.createElement('canvas');
    clear.id = 'qr-img';

    //bota ele no view
    parent.appendChild(clear);
    
  }
  
  /**
   * gera um objeto sessao no banco de acordo com os dados
   * que ja foram gerados
   * a funcao nao consegue retornar simplesmente true ou false
   * ela PRECISA retornar uma promessa. typescript why
   * 
   * @param id id do usuario 
   * @param hash hash gerado aleatoriamente com o id do user
   * @returns a promisse com o sucesso da sessao
   */
  geraSessao(id, hash){

    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO public.sessao VALUES (" + 
                  "default, " +
                  "'" + hash + "', " +
                  "NULL, " +
                  id + ", " +
                  "0, " +
                  "NOW(), " +
                  "NULL, " +
                  "NULL " +
                ");";

      this.db.insertGenerico(sql).then((response) => {
        resolve(true);

      }).catch((ex) => {
        resolve(false);

      });
      
  });
}

  /**
   * procura por uma sessao pra ver se ela existe.
   * retorna true caso exista, caso contrario, false
   * a funcao nao consegue retornar simplesmente true ou false
   * ela PRECISA retornar uma promessa. typescript why
   * 
   * @param hash hash gerado aleatoriamente com id do user
   * @returns promisse com existencia da sessao
   */
  checkSessao(hash) {
    //(╯°□°）╯︵ ┻━┻
    return new Promise((resolve, reject) => {
      let sql = "SELECT usuario_id FROM sessao WHERE hash='" + hash + "';";  

      this.db.selectGenerico(sql).then(response => {
        if(response[0].usuario_id !== null) {
          resolve(true);
       
        } else {
          resolve(false);
       
        }

      }).catch(ex => {
        resolve(false);
      
      });
    
    });
  
  }
  
  /**
   * inicia o processo de sessao, criando um hash pra id da sessao,
   * cira um qrcode com ela e cria um objeto sessao no banco,
   * depois espera por confirmacao que a sessao comecou,
   * pra entao buscar os dados da sessao do usuario
   */
  async iniciaSessao(){
    let id = 1;
    let hash = id + "-" + this.gerarhash(20);
    
    //gera qr
    this.geraQr(hash);
    
    //cria a session no banco
    let success = await this.geraSessao(id, hash);
    //if deu errado, limpa tudo e prepara pra nova sessao
    if(!success){
      this.limpaQr();
      alert("houve um erro inesperado. tente novamente");
      return;

    }

    //espera por confirmacao
    let conf:any = false;
    do{
      //espera um teco e dps procura pela sessao ate achar
      await this.sleep(2 * 1000);
      conf = await this.checkSessao(hash);
      
    }while(!conf);
    
    
  }
  
  //ativa permissao, e o timer

  //TODO: impelentar timer
}
