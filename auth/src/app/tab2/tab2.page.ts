import { BancoService } from './../banco.service';
import { Component } from '@angular/core';
import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
import { BoundDirectivePropertyAst } from '@angular/compiler';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  zbarOptions:any;
  scannedResult:any;
 
  constructor(
    private zbar: ZBar,
    private BD: BancoService
  ) {
 
    this.zbarOptions = {
      flash: 'off',
      drawSight: false
    }
 
  }
  valida(result : any)
  {
    let verifica = this.BD.updateGenerico("UPDATE sessao SET status = TRUE, cpf_cliente = " + "50952454858" + " WHERE hash = " + result).then((response)=>{
      
    })
  }
  scanCode(){
    this.zbar.scan(this.zbarOptions)
   .then(result => {
      console.log(result); // Scanned code
      this.scannedResult = result;
   })
   .catch(error => {
      alert(error); // Error message
   });
  }
}
