import { Component } from '@angular/core';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  constructor(private qr: QRScanner) { 

  }

  sleep(ms){
    let start = Date.now();
    let now = start;
    while(now - start < ms){
      now = Date.now();
    }
  }

  //ctrl+c ctrl+v
  scan(){

    let rst = "koe";
    
    this.qr.prepare().then((status: QRScannerStatus) => {
      
      //permissao da camera
      if (status.authorized) {
        
        //esconde view
        let view = document.getElementsByTagName("ion-app")[0];
    
        //comeca scan
        let scanSub = this.qr.scan().subscribe((text: string) => {
          //leu algo
          rst = text; 
          
        });
        this.qr.show();
        view.style.display = "none";

        this.qr.hide();
        
        view[0].style.display = "block";
        this.sleep(7 * 1000);
        
        scanSub.unsubscribe();
        
      } else if (status.denied) {
        rst = "vc negou a permissao koe vei"

      } else {
        rst = "libera a permissao ae pow";

      }
    })
    .catch((e: any) => rst = "erro: " + e); 

    document.getElementById("rst").innerHTML = rst;      

  }


}
