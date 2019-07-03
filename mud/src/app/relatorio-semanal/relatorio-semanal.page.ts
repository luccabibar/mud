import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-relatorio-semanal',
  templateUrl: './relatorio-semanal.page.html',
  styleUrls: ['./relatorio-semanal.page.scss'],
})

export class RelatorioSemanalPage implements OnInit {
  @ViewChild(IonSlides) IonSlides: IonSlides;

  constructor() { }

  ngOnInit() {
    this.IonSlides.lockSwipes(false);
  }

  alimentacao()
  {
    this.IonSlides.lockSwipes(false);
    this.IonSlides.slideTo(1);
    this.IonSlides.lockSwipes(true);
  }
  
  bem_estar()
  {

  }

  atividade_fisica()
  {

  }

  sono()
  {

  }
}
