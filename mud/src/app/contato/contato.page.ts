import { Component, OnInit } from '@angular/core';
import { BancoService } from '../banco.service';
import { NavController, AlertController } from '@ionic/angular';
import { DadosService } from '../dados.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {


  nome1 = this.dadosService.getCont1_nome();
  num1 = this.dadosService.getCont1_num();
  nome2 = this.dadosService.getCont2_nome();
  num2 = this.dadosService.getCont2_num();

  constructor(public bancoService: BancoService, public nav : NavController,public dadosService: DadosService,public alertController: AlertController, public router: Router, public formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
