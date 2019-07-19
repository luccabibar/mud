import { Component, OnInit } from '@angular/core';

// Importações necessárias para formulários
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/*
* Para funcionar os formulários, precisamos importar (adicionar)
* o módulo ReactiveFormsModule no arquivo home.module.ts
*/

@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})
export class FormsPage implements OnInit {

  // Cria os formulários
  public formLogin: FormGroup;
  public email;

  constructor(public formBuilder: FormBuilder) {

    /*
    * FormBuilder -> cria/molda um formulário facilitando seu gerenciamento.
    *
    * FormGroup -> Agrupa todos os controladores(campos) dentro do seu formulário.
    *
    * Validators -> Valida os dados em tempo real dos controladores(campos).
    * A lista com todos os tipos de validação podem ser visto no site: https://angular.io/api/forms/Validators
    */

    // Monta o formulário
    this.formLogin = formBuilder.group({
      // Declara os campos do formulário.
      email: ['email@padrao.com', Validators.email],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(8), Validators.required])]
    });

  }

  ngOnInit() {
  }

  public login() {
    if (this.formLogin.valid) {
      console.log(this.formLogin.value);
      this.email = this.formLogin.value.email;
      alert("Formulário salvo e válido!");
    } else {
      alert("formulário INVÁLIDO");
    }
  }

}
