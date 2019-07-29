import { IUsuario } from './../interfaces/IUsuario';
import { BancoService } from './../servicos/banco.service';
import { AlertController } from '@ionic/angular';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComparaValidator } from './../validators/compara-validator';
import { Router } from '@angular/router';
import { DadosService } from './../servicos/dados.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.page.html',
  styleUrls: ['./alterar-senha.page.scss'],
})
export class AlterarSenhaPage implements OnInit {
  public formCadastro: FormGroup;
  //@ViewChild('senhaAtual') myInput ;
  public existente = false;
  public user: IUsuario;

  mensagens_validacao = {
    senhaAtual: [
      { tipo: 'required', mensagem: 'É obrigatório digitar senha atual.' }
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
  };

  constructor(
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private bd: BancoService,
    private router: Router,
    private ds: DadosService
  ) {
    this.user = this.ds.getDados("user");
    this.formCadastro = formBuilder.group({
      senhaAtual: ['', Validators.required],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmaSenha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    }, {
        validator: ComparaValidator('senha', 'confirmaSenha')
      });


  }

  ngOnInit() {

  }

  public async salvar() {
    if (this.formCadastro.valid && (this.user.senha == this.formCadastro.value.senhaAtual)) {
      this.desejaAlterar();
    } else if ((this.formCadastro.valid && (this.user.senha != this.formCadastro.value.senhaAtual))) {
      const alert = await this.alertController.create({
        message: 'Senha Atual inválida',
        buttons: ['OK']
      });
      this.formCadastro.value.senhaAtual = null;
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        message: 'Formulário Inválido! Preencha corretamente todos os campos!',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  public async desejaAlterar() {
    const alert = await this.alertController.create({
      header: 'Alterar Senha',
      message: 'Deseja realmente alterar sua senha?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: não deseja alterar senha');
            return false;
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.user.senha = this.formCadastro.value.senha;
            let sql = `UPDATE usuario 
           SET  senha=   '${this.user.senha}',
             updated_at= CURRENT_DATE
        WHERE email ='${this.user.email}'
          ;`;
            this.bd.updateGenerico(sql).then(async resposta => {
              console.log(resposta);
              const alert = await this.alertController.create({
                message: 'Alteração de Senha Efetuada com sucesso!',
                buttons: ['OK']
              });
              await alert.present();
              // aqui deve atualizar os dados do registro quando ele voltar pro menu
              this.ds.setDados("user", this.user);
              this.router.navigateByUrl('/home');
            }).catch(async resposta => {
              const alert = await this.alertController.create({
                message: 'ERRO NA ALTERAÇÃO DE SENHA',
                buttons: ['OK']
              });
              console.log("Erro: ", resposta)
              await alert.present();
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
