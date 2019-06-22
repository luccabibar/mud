import { BancoService } from './../servicos/banco.service';
import { AlertController } from '@ionic/angular';
import { CpfValidator } from './../validators/cpf-validator';
import { Component, OnInit } from '@angular/core';
import { IUsuario } from '../interfaces/IUsuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComparaValidator } from './../validators/compara-validator';
import { async } from '@angular/core/testing';

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
      { tipo: 'minlength', mensagem: 'O celular deve ter pelo menos 11 caracteres.' },
      { tipo: 'maxlength', mensagem: 'O celular deve ter no máximo 11 caractéres.' },
    ],
    crp: [
      { tipo: 'required', mensagem: 'É obrigatório inserir o CRP' },

    ]
  };

  constructor(public formBuilder: FormBuilder, private alertController: AlertController, private bd: BancoService) {
    this.formCadastro = formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: ['', Validators.compose([Validators.required, CpfValidator.cpfValido])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      celular: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
      crp: ['', Validators.compose([Validators.required])],
      senha: ['', Validators.compose([Validators.required])],
      confirmaSenha: ['', Validators.compose([Validators.required])],
      dt_nasc: ['', Validators.compose([Validators.required])],
      sexo: ['']
    }, {
        validator: ComparaValidator('senha', 'confirmaSenha')
      })
  }

  ngOnInit() {

  }

  public async salvar() {
    if (!this.formCadastro.valid) {
      this.presentAlert();
    } else if (this.formCadastro.valid && !this.existente) {
      this.user = this.formCadastro.value;
      /*this.user.nome = this.formCadastro.value.nome;
      this.user.cpf = this.formCadastro.get('cpf').value;
      this.user.email = this.formCadastro.get('email').value;
      this.user.celular = this.formCadastro.get('celular').value;
      this.user.crp = this.formCadastro.get('crp').value;
      this.user.senha = this.formCadastro.get('senha').value;
      this.user.dt_nasc = this.formCadastro.get('dt_nasc').value;*/
      let sql = `INSERT INTO usuario(nome,cpf,email,celular,crp,senha,dt_nasc,profissional,created_at,key) 
      VALUES('${this.user.nome}',
              '${this.user.cpf}',
              '${this.user.email}',
              '${this.user.celular}',
              '${this.user.crp}',
              '${this.user.senha}',
              '${this.user.dt_nasc}',
              'true',
               '2019-06-22',
               '1');`;
      this.bd.insertGenerico(sql).then(async resposta => {
        console.log(resposta);
      }).catch(async resposta => {
        console.log("Erro: ", resposta)
      });
    }

  }

  public async validaCPF(evento) {
    let cpf = evento.target.value

    if (this.formCadastro.get('cpf').valid) {

      this.bd.selectGenerico("SELECT * FROM usuario WHERE cpf='" + cpf + "';").then(async (resposta) => {
        console.log(resposta)
        if (resposta[0].cpf == cpf) {
          const alert = await this.alertController.create({
            header: 'ERRO!!',
            subHeader: 'Cadastro existente!',
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
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ERRO!!',
      subHeader: 'Erro ao salvar',
      message: 'Existem campos inválidos ou vazios',
      buttons: ['OK']
    });

    await alert.present();
  }

}
