import { Component, OnInit } from '@angular/core';
import { BancoService } from '../banco.service';
import { NavController, AlertController } from '@ionic/angular';
import { DadosService } from '../dados.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {

  public contato: FormGroup;

  private desativado: boolean=true;
  nome1 = this.dadosService.getCont1_nome();
  num1 = this.dadosService.getCont1_num();
  nome2 = this.dadosService.getCont2_nome();
  num2 = this.dadosService.getCont2_num();

  constructor(public bancoService: BancoService, public nav : NavController,public dadosService: DadosService,public alertController: AlertController, public router: Router, public formBuilder: FormBuilder) { 
    this.contato = formBuilder.group({
      nome1: [ this.nome1 , Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern('[ A-Za-zÀ-ú ]*')])],
      num1: [this.num1, Validators.compose([Validators.required])],
      nome2 : [this.nome2, Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern('[ A-Za-zÀ-ú ]*')])],
      num2 : [this.num2, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }


  ativa()
  {
    if(this.contato.valid)
    {
      this.desativado = false;
    }
    else
    {
      this.desativado = true;
    }
  }
}
