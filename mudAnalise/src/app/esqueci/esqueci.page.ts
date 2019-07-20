import { Component, OnInit } from '@angular/core';

// Primeira Etapa
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsuario } from '../interfaces/IUsuario';
import { AlertController } from '@ionic/angular';
import { BancoService } from '../servicos/banco.service';
import { DadosService } from '../servicos/dados.service';

@Component({
  selector: 'app-esqueci',
  templateUrl: './esqueci.page.html',
  styleUrls: ['./esqueci.page.scss'],
})
export class EsqueciPage implements OnInit {
  public user: IUsuario;
  public formEsqueci: FormGroup;
  public existente = false;


  mensagens_validacao = {
    email: [
      { tipo: 'required', mensagem: 'O campo E-mail é obrigatório.' },
      { tipo: 'email', mensagem: 'E-mail Inválido.' },
    ],
  };
  constructor(
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private bd: BancoService,
    private router: Router,
    private dados: DadosService
  ) { 
    this.formEsqueci = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    })
    
  }

  ngOnInit() {
  }

  public async validaEmail(evento) {
    let email = evento.target.value

    if (this.formEsqueci.get('email').valid) {
      this.bd.selectGenerico("SELECT * FROM usuario WHERE email='" + email + "';").then(async (resposta) => {
      }).catch(async (resposta) => {
        this.existente = true;
        const alert = await this.alertController.create({
          header: 'Erro ao recuperar senha',
          subHeader: 'E-mail inválido',
          message: 'Certifique se o e-mail preenchido corresponde a uma conta do MudProfissional',
          buttons: ['OK']
        });
        await alert.present();
      })
    }
  }

  public async sendEmail(){
    console.log("it works fine...");
  }
}
