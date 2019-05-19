import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(
    private callNumber: CallNumber,
    private router:Router
  ) { }

  callNow(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  abrirAbas(){
    this.router.navigateByUrl('/opcoes-menu/ficha-usuario')
  }

}


