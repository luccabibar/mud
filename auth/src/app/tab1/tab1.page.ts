import { Component } from '@angular/core';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { viewAttached } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  
  view = <HTMLElement>document.getElementsByTagName('ion-app')[0];

  constructor(private qr: QRScanner) {
    this.qr.prepare();

  }

  sleep(ms){
    let start = Date.now();
    let now = start;
    while(now - start < ms){
      now = Date.now();
    }
  }

  scan(){
    let ret = "erro poar";

    //abre camera
    let scanSub = this.qr.scan().subscribe(text => {
      ret = text;
    });
    this.qr.show();
    this.view.style.display = "none";
    
    this.sleep(10 * 1000);

    //esconde camera
    this.qr.hide();
    scanSub.unsubscribe();
    this.view.style.display = 'block';

    document.getElementById("rst").innerHTML = ret;
  }

}
