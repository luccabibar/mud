import { BancoService } from './../banco.service';
import { Component } from '@angular/core';
import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
import { AlertController } from '@ionic/angular';
import { BoundDirectivePropertyAst } from '@angular/compiler';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  zbarOptions:any;
  scannedResult:any;
  resposta : any;
  constructor(
    private zbar: ZBar,
    private BD: BancoService,
    public alertController: AlertController
  ) {
 
    this.zbarOptions = {
      flash: 'off',
      drawSight: false
    }
 
  }
  onClick()
  {
    this.valida("POWER")
  }
  async alert(mensagem : string) {
      const alert = await this.alertController.create({
      header: 'Aviso',
      subHeader: 'Confirmação da conexão',
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();  
  }
  valida(result : any)
  {
    //TODO: mudar esse '2' pro id do usuario mesmo pliz
    this.BD.selectGenerico("UPDATE sessao SET status = 1, usuario_id = 2 WHERE hash = '" + result + "'; SELECT status FROM sessao WHERE hash = '" + result + "';").then((response)=>{
      this.resposta = response[0].status;
    }).catch((response)=>{
      this.resposta = JSON.stringify(response);
    });
    if(this.resposta == 1)
      this.alert("Conexão estabelecida. Agora, o especialista está habilitado para acompanhar as estatísticas geradas através dos questionários. Não se esqueça que a qualquer momento você pode excluir essa conexão e consequentemente os seus dados voltarão a serem restritos");
    else
      this.alert("blá : " + this.resposta);
  }
  
  scanCode(){
    this.zbar.scan(this.zbarOptions)
   .then(result => {
      console.log(result); // Scanned code
      this.scannedResult = result;
      this.valida(result);
   })
   .catch(error => {
      alert(error); // Error message
   });
  }
}
