import { promise } from 'protractor';
import { BancoService } from './../banco.service';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-testar-db',
  templateUrl: './testar-db.page.html',
  styleUrls: ['./testar-db.page.scss'],
})
export class TestarDBPage{
  result : any;
  constructor(private BancoService: BancoService) {}

  post()
  {
    alert('post');
    this.BancoService.createAccount('Testessss',57)
    .then((response)=>{
      this.result = response;
    }
    )
    .catch((response)=>{
      this.result = response;
    });
  }

  get()
  {
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

  put()
  {

  }

  delete()
  {
    
  }
}

