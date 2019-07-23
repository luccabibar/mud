import { BancoService } from './../servicos/banco.service';
import { AlertController } from '@ionic/angular';
import { CpfValidator } from './../validators/cpf-validator';
import { Component, OnInit } from '@angular/core';
import { IUsuario } from '../interfaces/IUsuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComparaValidator } from './../validators/compara-validator';
import { Router } from '@angular/router';
import { DadosService } from './../servicos/dados.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  public user: IUsuario;
  public formCadastro: FormGroup;
  public existente = false;

  mensagens_validacao = {
    nome: [
      { tipo: 'required', mensagem: 'O campo Nome é obrigatório.' },
      { tipo: 'minlength', mensagem: 'O nome deve ter pelo menos 3 caracteres.' },
    ],
    cpf: [
      { tipo: 'required', mensagem: 'O campo CPF é obrigatório.' },
      { tipo: 'invalido', mensagem: 'CPF Inválido.' },
    ],
    email: [
      { tipo: 'required', mensagem: 'O campo E-mail é obrigatório.' },
      { tipo: 'email', mensagem: 'E-mail Inválido.' },
    ],
    dt_nasc: [
      { tipo: 'required', mensagem: 'O campo Data de Nascimento é obrigatório.' },
    ],
    senha: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres.' },
      { tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 8 caractéres.' }
    ],
    confirmaSenha: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres.' },
      { tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 8 caractéres.' },
      { tipo: 'comparacao', mensagem: 'Deve ser igual a senha.' }
    ],
    celular: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      { tipo: 'minlength', mensagem: 'O celular deve ter pelo menos 15 caracteres.' },
      { tipo: 'maxlength', mensagem: 'O celular deve ter no máximo 15 caractéres.' },
    ],
    crp: [
      { tipo: 'required', mensagem: 'É obrigatório inserir o CRP' },
      { tipo: 'minlength', mensagem: 'O CRP deve ter 9 caracteres.' },
      { tipo: 'maxlength', mensagem: 'O CRP deve ter 9 caracteres.' },

    ]
  };

  constructor(
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private bd: BancoService,
    private router: Router,
    private ds: DadosService
  ) {

    this.user = this.ds.getDados("user");

    if (!this.user) {
      this.user = {
        id_usuario: 0,
        nome: '',
        cpf: '',
        email: '',
        celular: '',
        profissional: true,
        crp: '',
        senha: '',
        key: '',
        dt_nasc: '',
        sexo: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
      }
    }


    this.formCadastro = formBuilder.group({
      nome: [this.user.nome, Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: [this.user.cpf, Validators.compose([Validators.required, CpfValidator.cpfValido])],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
      celular: [this.user.celular, Validators.compose([Validators.required, Validators.minLength(15), Validators.maxLength(15)])],
      crp: [this.user.crp, Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9)])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmaSenha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      dt_nasc: [this.user.dt_nasc, Validators.compose([Validators.required])],
      sexo: [this.user.sexo]
    }, {
        validator: ComparaValidator('senha', 'confirmaSenha')
      });

    this.controleSenha();
  }
  ngOnInit() {
    this.controleSenha();
    
  }

  private controleSenha() {
    if (this.user.nome) {
      this.formCadastro.controls.senha.setValidators(null);
      this.formCadastro.controls.senha.updateValueAndValidity();
      this.formCadastro.controls.confirmaSenha.setValidators(null);
      this.formCadastro.controls.confirmaSenha.updateValueAndValidity();
    }
  }

  public async salvar() {

    if (this.formCadastro.valid) {
      if (!this.existente && this.user.id_usuario == 0) {
        this.user = this.formCadastro.value;

        this.bd.cadProf(this.user).then(async resposta => {
          console.log(resposta);
          const alert = await this.alertController.create({
            message: 'Cadastro Efetuado com sucesso!',
            buttons: ['OK']
          });
          await alert.present();
          this.router.navigateByUrl('/login');
          this.formCadastro.reset()
        }).catch(async resposta => {
          const alert = await this.alertController.create({
            message: 'ERRO NO CADASTROOOOO!',
            buttons: ['OK']
          });
          console.log("Erro: ", resposta)
          await alert.present();
        });
      } else if (this.user.id_usuario != 0) {

        this.user = this.formCadastro.value;
        let sql = `UPDATE usuario 
        SET  nome=   '${this.user.nome}',
             cpf=    '${this.user.cpf}',
             celular='${this.user.celular}',
             crp=    '${this.user.crp}',
             senha=  '${this.user.senha}',
             dt_nasc='${this.user.dt_nasc}',
             updated_at= CURRENT_DATE
        WHERE email ='${this.user.email}'
          ;`;

        this.bd.updateGenerico(sql).then(async resposta => {
          console.log(resposta);
          const alert = await this.alertController.create({
            message: 'Alteração Efetuada com sucesso!',
            buttons: ['OK']
          });
          await alert.present();
          // aqui deve atualizar os dados do registro quando ele voltar pro menu
          // this.user = this.ds.getDados("user");
          this.router.navigateByUrl('/home');
        }).catch(async resposta => {
          const alert = await this.alertController.create({
            message: 'ERRO NA ALTERAÇÃO',
            buttons: ['OK']
          });
          console.log("Erro: ", resposta)
          await alert.present();
        });


      }
    } else if (!this.formCadastro.valid) {
      this.presentAlert();
    }
  }

  // validação no bd de campos unicos para cada usuario

  public async validaCPF(evento) {
    let cpf = evento.target.value

    if (this.formCadastro.get('cpf').valid && !this.user.nome) {

      this.bd.selectGenerico("SELECT * FROM usuario WHERE cpf='" + cpf + "';").then(async (resposta) => {
        console.log(resposta)
        if (resposta[0].cpf == cpf) {
          const alert = await this.alertController.create({
            header: 'ERRO!!',
            subHeader: 'CPF existente!',
            message: 'Você ja possui cadastro em nosso sistema.',
            buttons: ['OK']
          });
          this.existente = true;
          await alert.present();

        } else {
          this.existente = false
        }
      }).catch(async (resposta) => {
        this.existente = false;
      })
    }

  }

  public async validaEmail(evento) {
    let email = evento.target.value

    if (this.formCadastro.get('email').valid && !this.user.nome) {

      this.bd.selectGenerico("SELECT * FROM usuario WHERE email='" + email + "';").then(async (resposta) => {
        console.log(resposta)
        if (resposta[0].email == email) {
          const alert = await this.alertController.create({
            header: 'ERRO!!',
            subHeader: 'EMAIL ja cadastrado!',
            message: 'Você ja possui cadastro em nosso sistema.',
            buttons: ['OK']
          });
          this.existente = true;
          await alert.present();

        } else {
          this.existente = false
        }
      }).catch(async (resposta) => {
        this.existente = false;
      })
    }

  }

  public async validaCelular(evento) {
    let celular = evento.target.value

    if (this.formCadastro.get('celular').valid && !this.user.nome) {

      this.bd.selectGenerico("SELECT * FROM usuario WHERE celular='" + celular + "';").then(async (resposta) => {
        console.log(resposta)
        if (resposta[0].celular == celular) {
          const alert = await this.alertController.create({
            header: 'ERRO!!',
            subHeader: 'CELULAR ja cadastrado!',
            message: 'Você ja possui cadastro em nosso sistema.',
            buttons: ['OK']
          });
          this.existente = true;
          await alert.present();

        } else {
          this.existente = false
        }
      }).catch(async (resposta) => {
        this.existente = false;
      })
    }

  }

  public async validaCRP(evento) {
    let crp = evento.target.value

    if (this.formCadastro.get('crp').valid && !this.user.nome) {

      this.bd.selectGenerico("SELECT * FROM usuario WHERE crp='" + crp + "';").then(async (resposta) => {
        console.log(resposta)
        if (resposta[0].crp == crp) {
          const alert = await this.alertController.create({
            header: 'ERRO!!',
            subHeader: 'CRP ja cadastrado!',
            message: 'Falsificação do CRP pode acarretar em processos judiciais, conforme o artigo 299 do Código Penal! ',
            buttons: ['OK']
          });
          this.existente = true;
          await alert.present();


        } else {
          this.existente = false
        }
      }).catch(async (resposta) => {
        this.existente = false;
      })
    }

  }

  // metodos auxiliares 
  async presentAlert() {

    const alert = await this.alertController.create({
      header: 'ERRO!!',
      subHeader: 'Erro ao salvar',
      message: 'Existem campos inválidos ou vazios',
      buttons: ['OK']
    });

    await alert.present();
  }

  async sairCad() {
    const alert = await this.alertController.create({
      header: 'Registro',
      message: 'Deseja sair?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            if (!this.user.nome) {
              this.router.navigateByUrl('/login');
            } else {
              this.router.navigateByUrl('/home');
            }
            this.formCadastro.reset()
          }
        }
      ]

    });
    await alert.present();
  }


}
