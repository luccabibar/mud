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



  relatsem()
  {
    this.nav.navigateForward('relatorio-semanal');
  }
}

