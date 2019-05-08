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

  //ctrl+c ctrl+v
  scan(){

    let rst = "";

    this.qr.prepare().then((status: QRScannerStatus) => {
      
      // camera permission was granted
      if (status.authorized) {
      
        // start scanning
        let scanSub = this.qr.scan().subscribe((text: string) => {
          rst = text;

          this.qr.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
        });

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
