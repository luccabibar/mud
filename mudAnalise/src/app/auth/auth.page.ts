import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';

import { BancoService } from "../servicos/banco.service"
import QRious from "qrious"

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  private sessionDados: Object;
  private cancel: boolean;

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * gera um hash de caracteres alfanumericos de tamanho determinado.
   * parece pouco, mas o numero de possibilidades eh de 62^N
   * 
   * @param tam o tamaho do hash
   * @returns uma string aleatoria de length = tam 
   */
  gerarhash(tam){
    let chars: String = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
    let text: String = "";
    for (let c = 0; c < tam; c++) {
      text += chars[Math.floor(Math.random() * (chars.length - 1))];
      
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
    console.log(target);
    
    //gera codigo e joga ele num elem
    let qr = new QRious({
      element: target,
      foreground: 'blue',
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
        console.log(response);
        
        resolve(true);

      }).catch((ex) => {  
        if(ex.error.text == "sucesso"){
          resolve(true);
        
        }else{
          resolve(false);

        }

      });
      
  });
}

  /**
   * procura por uma sessao pra ver se ela existe.
   * retorna o id do user caso exista, caso contrario, 0
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
          resolve(response[0].usuario_id);
       
        } else {
          resolve(0);
       
        }

      }).catch(ex => {
        resolve(0); 
      
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
    let userId:any = 0;
    do{
      //espera um teco e dps procura pela sessao ate achar
      await this.sleep(2 * 1000);
      userId = await this.checkSessao(hash);
      console.log(this.cancel);
      
    }while(!userId && !this.cancel);
    
    //ativa permissao, e o timer
    this.sessionDados = {
      status : 1,
      hash : hash,
      idUser : userId
    };
    //TODO: impelentar timer

  }

  constructor(private router: Router, private db:BancoService) {  
    
  }

  ngOnInit() {
    this.iniciaSessao();
    this.cancel = false;

  }

  back(){
    let navDados:NavigationExtras = {
      state: {
        dados: this.sessionDados
      }
    };

    this.cancel = true;
    console.log(this.cancel);
    
    this.router.navigate(["/home"], navDados);

  }

}
