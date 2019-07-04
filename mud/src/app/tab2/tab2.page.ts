import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, Renderer, ViewChild, Input} from '@angular/core';
import { NavController, AlertController, IonInput} from '@ionic/angular';
import { BancoService } from './../banco.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  
  constructor(private nav: NavController, public alertController: AlertController) {}

  dataInicio = "TesteInicio";
  dataFinal = "TestFinal";

  pegarUltimoRelatorio()
  {
    
  }

  async relatsem()
  {
    this.pegarUltimoRelatorio();
    const alert = await this.alertController.create({
    header: "Relatório Semanal",
    subHeader: "Confirmar Data",
    message: "A data do último relatório enviado foi de:<br><br><b>"+this.dataInicio+"</b><br><br>até:<br><br><b>"+this.dataFinal+"</b><br>",
    inputs: [
      {
        name: 'username',
        placeholder: 'Username'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancelar',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirmar',
        handler: data => {
          this.nav.navigateForward('relatorio-semanal');
        }
      }
    ]
  });
    
    await alert.present();
  }
}

