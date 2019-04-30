import { Component, OnInit } from '@angular/core';
import { BancoService } from './../banco.service';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { promise } from 'protractor';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.page.html',
  styleUrls: ['./user-list-page.page.scss'],
})
export class UserListPagePage {
  result : any;
  constructor(private BancoService: BancoService) { }

  get(){
    alert('get');
    this.BancoService.mostra()
    .then((response)=>{
      this.result = JSON.stringify(response);
    }
    )
    .catch((response)=>{
      this.result = JSON.stringify(response);
    });
  }
}
