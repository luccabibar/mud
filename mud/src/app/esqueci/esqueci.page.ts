import { Component, OnInit } from '@angular/core';

// Primeira Etapa
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BancoService } from './../banco.service';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-esqueci',
  templateUrl: './esqueci.page.html',
  styleUrls: ['./esqueci.page.scss'],
})
export class EsqueciPage implements OnInit {
  public formEsqueci: FormGroup;
  public disableButton = false;


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
  public async sendEmail() { //envia o email

    let email = this.formEsqueci.value.email;
    console.log(email);

    if (this.formEsqueci.get('email').valid) {
      this.disableButton = true;
      this.bd.esqueciSenha("SELECT * FROM usuario WHERE email='" + email + "';").then(async (resposta) => {
        const alert = await this.alertController.create({
          header: 'E-mail enviado com sucesso',
          message: 'Verifique seu e-mail para recuperar sua senha',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigateByUrl("/login-page");

      }).catch(async (resposta) => {
        console.log("erro: ", resposta);

        const alert = await this.alertController.create({
          header: 'Erro no envio de e-mail',
          message: "Verifique o e-mail informado.",
          buttons: ['OK']
        });
        await alert.present();
        this.disableButton = false;
      })
    }

  }
}
