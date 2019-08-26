import { Component, OnInit } from '@angular/core';

// Primeira Etapa
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsuario } from '../interfaces/IUsuario';
import { AlertController } from '@ionic/angular';
import { BancoService } from '../servicos/banco.service';
import { DadosService } from '../servicos/dados.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: IUsuario;
  public formLogin: FormGroup;

  mensagens_validacao = {
    email: [
      { tipo: 'required', mensagem: 'O campo E-mail é obrigatório.' },
      { tipo: 'email', mensagem: 'E-mail Inválido.' },
    ],
    senha: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
    ],
  };

  constructor(
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private bd: BancoService,
    private router: Router,
    private ds: DadosService
  ) {
    this.formLogin = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    })
  }
  ngOnInit() {
  }

  public async login() {

    let email = this.formLogin.value.email
    if (this.formLogin.valid) {

      this.bd.selectGenerico("SELECT * FROM usuario WHERE email='" + email + "';").then(async (resposta) => {
        console.log(resposta)
        if (resposta[0].senha == this.formLogin.value.senha) {
          if (resposta[0].profissional == 't') {
            this.ds.setDados("user", resposta[0]);
            this.router.navigate(["/home"]);
          } else {
            const alert = await this.alertController.create({
              header: 'Acesso Negado!',
              subHeader: 'Aplicativo Inválido',
              message: 'Se você tem certeza de seu cadastro, procure o aplicativo Mud com ícone verde na sua loja de aplicativos',
              buttons: ['OK']
            });
            await alert.present();
          }
        } else {
          const alert = await this.alertController.create({
            header: 'ERRO!!',
            subHeader: 'Dados inválidos!',
            message: 'Verifique se usuário/senha estão corretos',
            buttons: ['OK']
          });
          await alert.present();
        }
      }).catch(async (resposta) => {
        const alert = await this.alertController.create({
          header: 'ERRO!!',
          subHeader: 'Dados inválidos!',
          message: 'Verifique se usuário/senha estão corretos ou se há conexão com wi-fi',
          buttons: ['OK']
        });
        await alert.present();
      })
    }

  }


}


