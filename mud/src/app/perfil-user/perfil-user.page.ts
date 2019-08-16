
import { NavController, IonInput, AlertController } from '@ionic/angular';
import { Component, ViewChild, Input} from '@angular/core';
import { DadosService } from '../dados.service';

import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

import { BancoService } from '../banco.service';


@Component({
  selector: 'app-perfil-user',
  templateUrl: 'perfil-user.html',
  styleUrls: ['perfil-user.page.scss']
})
export class PerfilUserPage {

  constructor(public bancoService: BancoService, public nav : NavController,public dadosService: DadosService,public alertController: AlertController, public router: Router){

  }

  @ViewChild('deus')  ino: IonInput;

  nome = this.dadosService.getNome();
  email = this.dadosService.getEmail();
  cpf = this.dadosService.getCpf();
  celular = this.dadosService.getCelular();
  dtnasc = this.dadosService.getDataNasc();
  private desativado: boolean=true;
  aa()
  {
    setTimeout(() => {
      this.ino.setFocus();
  }, 400);
  }

  relatsem()
  {
      this.nav.navigateForward('relatorio-semanal');
  }

  pagsessao()
  {
      this.nav.navigateForward('sessoes');
  }

  async editarSintomas()
  {
    
  }

  async salvarPerfil()
  {
    const alert = await this.alertController.create({
    header: "Confirmação",
    subHeader: "Confirmar alteração",
    message: "Deseja mesmo alterar seu perfil com as informações preenchidas?",
    inputs: [
      {
        name: 'senha',
        placeholder: 'Senha',
        type: 'password'
      },
      {
        name: 'senha2',
        placeholder: 'Redigite',
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
        text: 'Alterar',
        handler: data => {
          if(data.senha == data.senha2)
          {
            // senhas batem, então conferir no banco de dados se o usuário digitou a senha certa.
            this.bancoService.verificaSenha(this.dadosService.getId().toString(),data.senha)
            .then(async(response)=>{
              if(response[0].senha == data.senha)
              {
                //passou pela verificação de senha, agora será feita a auteração em si
                  let nome = (<HTMLInputElement>document.getElementById("6")).value;
                  let email = (<HTMLInputElement>document.getElementById("7")).value;
                  let data_nasc = (<HTMLInputElement>document.getElementById("3")).value;
                  let celular = (<HTMLInputElement>document.getElementById("4")).value;
                  let cpf = (<HTMLInputElement>document.getElementById("5")).value;

                  this.bancoService.alteraUsuario(this.dadosService.getId().toString(),nome,email.toString(),data_nasc.toString(),celular,cpf)
                  .then(async(response)=>{
                    const alert = await this.alertController.create({
                      header: 'Confirmação',
                      subHeader: 'Sucesso!',
                      message: 'Alteração Realizada com sucesso!',
                      buttons:  [
                        {
                          text: 'OK',
                        }
                      ],
                      });
                      alert.present();
                  })
                  .catch(async(response)=>{
                    const alert = await this.alertController.create({
                      header: 'Erro',
                      subHeader: email,
                      message: 'Erro ao salvar alterações. Tente novamente',
                      buttons:  [
                        {
                          text: 'OK',
                        }
                      ],
                      });
    
                      await alert.present();
                  })
                }
                else
                {
                  const alert = await this.alertController.create({
                  header: 'Erro',
                  message: 'As senhas não batem. Tente novamente.',
                  buttons:  [
                    {
                      text: 'OK',
                    }
                  ],
                  });

                  await alert.present();
                }
            })
              .catch(async(response)=>{
                const alert = await this.alertController.create({
                  header: 'Erro',
                  message: 'Senha incorreta! Tente novamente!.',
                  buttons:  [
                    {
                      text: 'OK',
                    }       ],
                 });
                await alert.present();
               })
          }
          else
          {
            this.alertController.create({
              header: 'Erro',
              message: 'As senhas não batem. Tente novamente.',
              buttons: ['Ok']
            }).then(alert => {
              alert.present();
            });
          }
          //se clicar em alterar tem que dar o loading com sucesso ou falha na alteração
        }
      }
    ]
  });
    
    await alert.present();
  }

  async alterarSenha()
  {
    const alert = await this.alertController.create({
      header: "Alterar Senha",
      subHeader: "Confirmar alteração",
      message: "Deseja mesmo alterar sua senha?",
      inputs: [
        {
          name: 'senhaA',
          placeholder: 'Senha Antiga',
          type: 'password'
        },
        {
          name: 'senhaN',
          placeholder: 'Nova Senha',
          type: 'password'
        },
        {
          name: 'senhaN2',
          placeholder: 'Redigite a nova senha',
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
          text: 'Alterar',
          handler: data => {
            this.bancoService.verificaSenha(this.dadosService.getId().toString(),data.senhaA)
            .then(async(response)=>{
              if(response[0].senha == data.senhaA)
              {
                if(data.senhaN == data.senhaN2)
                {
                  this.bancoService.alteraSenha(this.dadosService.getId().toString(),data.senhaN)
                  .then(async(response)=>{
                    const alert = await this.alertController.create({
                      header: 'Confirmação',
                      subHeader: 'Sucesso!',
                      message: 'Alteração Realizada com sucesso!',
                      buttons:  [
                        {
                          text: 'OK',
                        }
                      ],
                      });
                      alert.present();
                  })
                  .catch(async(response)=>{
                    const alert = await this.alertController.create({
                      header: 'Erro!',
                      message: 'Erro ao alterar senha. Tente novamente.',
                      buttons:  [
                        {
                          text: 'OK',
                        }
                      ],
                      });
                      alert.present();
                  })

                    
                }
                else
                {
                  const alert = await this.alertController.create({
                    header: 'Erro',
                    message: 'As senhas novas não batem. Tente novamente.',
                    buttons:  [
                      {
                        text: 'OK',
                      }
                    ],
                    });
  
                    await alert.present();
                }
                //passou pela verificação de senha, agora será feita a auteração em si
              }
            })
              .catch(async(response)=>{
                const alert = await this.alertController.create({
                  header: 'Erro',
                  message: 'Senha antiga incorreta. Tente novamente.',
                  buttons:  [
                    {
                      text: 'OK',
                    }
                  ],
                  });

                  await alert.present();
               })
          }
        }
      ]
    });
      
    await alert.present();
  }

  async sair()
  {
    const alert = await this.alertController.create({
    header: "Fazer Logoff",
    message: "Deseja mesmo sair de sua conta?",
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancelar',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Sair',
        handler: data => {
          this.dadosService.limpaDados();
          this.nav.navigateForward('login-page');
        }
      }
    ]
  });
    
    await alert.present();
  }

  ativa()
  {
    this.desativado = false;
  }
}

