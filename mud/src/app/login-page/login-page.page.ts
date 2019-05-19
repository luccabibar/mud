import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { BancoService } from './../banco.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage {


  public submitAttempt: boolean = false;

  constructor(private nav: NavController) { }

  public loginForm:FormGroup = new FormGroup({
    'email' : new FormControl(null, [Validators.required, Validators.email]),
    'senha' : new FormControl(null, [Validators.required, Validators.minLength(2)])
  })
  

  direcCadast()
  {
      this.nav.navigateForward('cadastro');
  }

}
