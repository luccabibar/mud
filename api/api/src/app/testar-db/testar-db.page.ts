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


  inserirUsuario()
  {
    let nome = (<HTMLInputElement>document.getElementById("1")).value;
    let idade = (<HTMLInputElement>document.getElementById("2")).value;
    this.BancoService.insertGenerico("INSERT INTO teste(nome,idade) VALUES('"+nome+"','"+idade+"');")
    .then((response)=>{
      this.result = response;
    }
    )
    .catch((response)=>{
      this.result = response;
    });
  }

  mostrarUsuarios()
  {
    alert("Get");
    this.BancoService.mostraUsuarios()
    .then((response)=>{
      this.result = JSON.stringify(response);
    }
    )
    .catch((response)=>{
      this.result = JSON.stringify(response);
    })
  }
}

