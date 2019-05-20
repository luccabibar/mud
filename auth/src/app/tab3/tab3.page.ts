import { Component } from '@angular/core';
import QRious from "qrious"

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  gerarhash(tam){
    let chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
    let text = "";
    for (let c = 0; c < tam; c++) {
      text += chars[Math.floor(Math.random() * 61)];
      
    }

    return text;
  }
  
  iniciaSessao(){
    
    //id do profissional. por fins demonstrativos, o numero ta aleatoria
    let text = Math.floor(Math.random() * 255) + "";
    text += "-" + this.gerarhash(20);

    let target = document.getElementById('qr-img');
    
    let qr = new QRious({
      element: target,
      value: text
    });
  }
}
