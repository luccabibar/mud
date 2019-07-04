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
  public cont = 0;

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
    this.IonSlides.lockSwipes(false);
    this.IonSlides.slideTo(2);
    this.IonSlides.lockSwipes(true);
  }

  fezAtvd()
  {
    this.cont++;
    if(this.cont==1)
    {
      document.getElementById("fezatv").style.display='unset';
    }
    if(this.cont==2)
    {
      document.getElementById("fezatv").style.display='none';
      this.cont = 0;
    }
  }

  duracAtv()
  {
    let temp = (<HTMLInputElement>document.getElementById("temp")).value;
    if(temp == "0")
    {
      document.getElementById("lblTemp").innerHTML = '- de 30 mins';
    }
    else if(temp == "200")
    {
      document.getElementById("lblTemp").innerHTML = '30 - 60 mins';
    }
    else if(temp == "400")
    {
      document.getElementById("lblTemp").innerHTML = '1 - 2 hrs';
    }
    else if(temp == "600")
    {
      document.getElementById("lblTemp").innerHTML = '2 - 3 hrs';
    }
    else if(temp == "800")
    {
      document.getElementById("lblTemp").innerHTML = '+ de 3 hrs';
    }
  }


  
  sono()
  {

  }
}
