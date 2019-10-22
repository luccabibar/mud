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

  public contato1: FormGroup;
  public contato2: FormGroup;
  private desativado: boolean=true;
  nome1 = this.dadosService.getCont1_nome();
  num1 = this.dadosService.getCont1_num();
  nome2 = this.dadosService.getCont2_nome();
  num2 = this.dadosService.getCont2_num();

  constructor(public bancoService: BancoService, public nav : NavController,public dadosService: DadosService,public alertController: AlertController, public router: Router, public formBuilder: FormBuilder) { 
    this.contato1 = formBuilder.group({
      nome1: [ this.nome1 , Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern('[ A-Za-zÀ-ú ]*')])],
      num1: [this.num1, Validators.compose([Validators.required, Validators.minLength(15), Validators.maxLength(15)])]
    });
    this.contato2 = formBuilder.group({
      nome2: [ this.nome1 , Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern('[ A-Za-zÀ-ú ]*')])],
      num2: [this.num2, Validators.compose([Validators.required, Validators.minLength(15), Validators.maxLength(15)])]
    });
  } //validações

  ngOnInit() { //pega os nomes e numeros dos contatos
    this.nome1 = this.dadosService.getCont1_nome();
    this.num1 = this.dadosService.getCont1_num();
    this.nome2 = this.dadosService.getCont2_nome();
    this.num2 = this.dadosService.getCont2_num();
  }

  async salvarContatos() //salva os contatos
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
                //passou pela verificação de senha, agora será feita a alteração em si
                  let nome1 = (<HTMLInputElement>document.getElementById("43")).value;
                  let num1 = (<HTMLInputElement>document.getElementById("44")).value;
                  let nome2 = (<HTMLInputElement>document.getElementById("45")).value;
                  let num2 = (<HTMLInputElement>document.getElementById("46")).value;

                  this.bancoService.updateGenerico("UPDATE contato SET nome='"+nome1+"',telefone='"+num1+"' WHERE telefone='"+this.dadosService.getCont1_num()+"';")
                  .then(async(response)=>{
                
                  })
                  .catch(async(response)=>{
                    const alert = await this.alertController.create({
                      header: 'Erro',
                      subHeader: nome1,
                      message: 'Erro ao salvar alterações. Tente novamente',
                      buttons:  [
                        {
                          text: 'OK',
                        }
                      ],
                      });
    
                      await alert.present();
                  })
                  this.bancoService.updateGenerico("UPDATE contato SET nome='"+nome2+"',telefone='"+num2+"' WHERE telefone='"+this.dadosService.getCont2_num()+"';")
                  .then(async(response)=>{
                    this.nav.navigateForward('/tabs/perfil-user');
                  })
                  .catch(async(response)=>{
                    const alert = await this.alertController.create({
                      header: 'Erro',
                      subHeader: nome1,
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

  sair()
  {
    this.router.navigateByUrl('/tabs/perfil-user');
  }

  ativa()
  {
    if(this.contato1.valid && this.contato2.valid)
    {
      this.desativado = false;
    }
    else
    {
      this.desativado = true;
    }
  }
}
