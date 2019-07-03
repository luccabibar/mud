import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController, AlertController } from '@ionic/angular';
import { BancoService } from '../banco.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-relatorio-semanal',
  templateUrl: './relatorio-semanal.page.html',
  styleUrls: ['./relatorio-semanal.page.scss'],
})

export class RelatorioSemanalPage implements OnInit {
  @ViewChild(IonSlides) IonSlides: IonSlides;
  public slide2form: FormGroup;
  public slide3form: FormGroup;
  public slide4form: FormGroup;
  public slide5form: FormGroup;

  constructor(public navCtrl: NavController, private BD: BancoService,public formBuilder: FormBuilder,private AlertController: AlertController) { 
    this.slide2form = formBuilder.group({
    
    });

    this.slide3form = formBuilder.group({
    
    });

    this.slide4form = formBuilder.group({
    
    });

    this.slide5form = formBuilder.group({
    
    });
  }
  
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
