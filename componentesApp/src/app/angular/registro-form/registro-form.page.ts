import { Component, OnInit } from '@angular/core';
// Importações necessárias para formulários
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Importação do arquivo de validação de cpf
import { CpfValidator } from '../../validators/cpf-validator';
import { ComparaValidator } from '../../validators/compara-validator';

// Importção para trabalhar com datas.
import * as moment from 'moment';


/*
* Para funcionar os formulários, precisamos importar (adicionar)
* o módulo ReactiveFormsModule no arquivo home.module.ts
*/

@Component({
  selector: 'app-registro-form',
  templateUrl: './registro-form.page.html',
  styleUrls: ['./registro-form.page.scss'],
})
export class RegistroFormPage implements OnInit {

  public formCadastro: FormGroup;

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
    dataNascimento: [
      { tipo: 'required', mensagem: 'O campo Data de Nascimento é obrigatório.' },
      { tipo: 'pattern', mensagem: 'O formato deve ser: 00/00/0000.' }
    ],
    dataCadastro: [
      { tipo: 'required', mensagem: 'O campo Data de Cadastro é obrigatório.' },
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
    ]
  };


  constructor(public formBuilder: FormBuilder) {
    // Monta o formulário
    this.formCadastro = formBuilder.group({
      // Declara os campos do formulário.
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: ['', Validators.compose([Validators.required, CpfValidator.cpfValido])],
      dataNascimento: ['', Validators.compose([Validators.required, Validators.pattern(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)])],
      dataCadastro: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(8), Validators.required])],
      confirmaSenha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(8), Validators.required])]
    }, {
        validator: ComparaValidator('senha', 'confirmaSenha')
      });
  }

  ngOnInit() {
  }

  public exibirForm() {
    console.log(this.formCadastro);

    // Pega apenas a data de cadastro do Formulário.
    let dataCadastro = this.formCadastro.value.dataCadastro;

    // Exibir a data em EN-US
    console.log('EN-US: ', moment(dataCadastro).format('YYYY-MM-DD'));
    // Exibir a data em PT-BR
    console.log('PT-BR: ', moment(dataCadastro).format('DD/MM/YYYY'));


    // Pega apenas a data de nascimento do Formulário.
    let dataNascimento = this.formCadastro.value.dataNascimento;

    // Converter a data em EN-US
    console.log('EN-US: ', moment(dataNascimento, "DD/MM/YYYY").format('YYYY-MM-DD'));

  }

}
