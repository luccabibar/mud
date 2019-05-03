import { BancoService } from './../banco.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(public banco: BancoService, public navCtrl: NavController){}
  openCreateAccount() {
    this.navCtrl.navigateRoot('/testar-db');
  }
 
  openLogin() {
    this.navCtrl.navigateRoot('LoginPage');
  }
 
  openListUsers() {
    this.navCtrl.navigateForward('/user-list-page');
  }
}



