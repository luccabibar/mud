import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { BancoService } from "../banco.service";
import { DadosService } from "../dados.service";

import { AlertController } from '@ionic/angular';
import { BoundDirectivePropertyAst } from '@angular/compiler';
import { validateConfig } from '@angular/router/src/config';
import { alertController } from '@ionic/core';

@Component({
  selector: 'app-sessoes',
  templateUrl: './sessoes.page.html',
  styleUrls: ['./sessoes.page.scss'],
})
export class SessoesPage implements OnInit {

  constructor(private bancoService: BancoService,private dadosService: DadosService,private barcodeScanner: BarcodeScanner, private alertController: AlertController) 
  {
  }

  dado: any;

  updateSessao(hash)
  {
    this.bancoService.updateGenerico("UPDATE sessao set usuario_id="+this.dadosService.getId()+",status=1,updated_at=now() WHERE hash='"+hash+"';")
    .then(async(response)=>{
      const alert = await this.alertController.create({
        header: 'Sucesso!',
        message: 'Sessão Iniciada com sucesso!',
        buttons:  [
          {
            text: 'OK',
          }
        ],
        });

        await alert.present();
     })
    .catch(async(response)=>{
        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Erro ao iniciar sessão com o código lido',
          buttons:  [
            {
              text: 'OK',
            }
          ],
          });

          await alert.present();
       })
  }

  /**
   * procura pela exsitecia de uma sssao no banco a partir de um hash
   *  
   * @param hash o hash a ser buscado
   * @returns a existencia da sessao no bacno
   */
  buscaSessao(hash)
  {
    return new Promise((resolve, reject) => {
      let sql = " SELECT hash FROM sessao WHERE hash = '" + hash + "' AND status = 0;";

      this.bancoService.selectGenerico(sql).then(response => {
        
        if (response[0].hash !== null) {
          
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
   * scanFoda
   * 
   * liga a camera pra ler o qrcode, e dps valida e ativa a sessao no banco
   */
  async startSessao(){
    
    //options
    let opts = {
      preferFrontCamera : true,
      showFlipCameraButton : true,
      showTorchButton : true,
      torchOn: false,
      saveHistory: false,
      prompt : "Escaneie o codigo QR", // Android
      resultDisplayDuration: 500,
      formats : "QR_CODE",
      orientation : "portrait",
      disableAnimations : true,
      disableSuccessBeep: true
    };

    //leitura do codigo
    this.barcodeScanner.scan(opts)
    //sucesso
    .then(result => {
      this.dado = result.text;
      this.updateSessao(this.dado);
    })
    //erro
    .catch(ex => {
       
    });
    /*
    //if erro, retorna
    if(this.hash == "return"){

      return;
    }

    //validacao
    if(!(await this.buscaSessao(this.hash))){
      
      return;
    }
    
    this.updateSessao(this.hash, this.dados.getDados("id"));*/
    
  }

  

  ngOnInit() 
  {
    
  }

}
