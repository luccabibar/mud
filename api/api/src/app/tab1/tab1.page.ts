import { promise } from 'protractor';
import { NavController, ToastController } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';
import { BancoService } from './../banco.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  result : any;
  constructor(private BancoService: BancoService) {}
  public form = [
    { val: 'Dificuldade para Respirar', id: 1 },
    { val: 'Ritmo Cardíaco Acelerado / Taquicardia', id: 2 },
    { val: 'Sensações de Asfixia', id: 3 },
    { val: 'Sudorese', id: 4 },
    { val: 'Tremores / Abalos', id: 5 },
    { val: 'Naúsea / Indisposição Abdominal', id: 6 },
    { val: 'Dor / Desconforto Torácico', id: 7 },
    { val: 'Ondas de Calor / Frio', id: 8 },
    { val: 'Anestesia / Formigamento', id: 9 },
    { val: 'Sensações de Irrealidade', id: 10 },
    { val: 'Instabilidade / Tontura / Desmaio', id: 11 },
    { val: 'Medo de Morrer', id: 12 },
    { val: 'Medo de Perder o Controle / Enlouquecer', id: 13 },
  ];

  inserirUsuario()
  {
  let data = (<HTMLInputElement>document.getElementById("1")).value;
  let comentarios = (<HTMLInputElement>document.getElementById("2")).value;
  this.BancoService.insertGenerico("INSERT INTO teste(nome,idade) VALUES('"+data+"','"+comentarios+"');")
  .then((response)=>{
    this.result = response;
  }
  )
  .catch((response)=>{
    this.result = response;
  });
}


}
