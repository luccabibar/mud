import { Component, OnInit } from '@angular/core';
import { NavController, AlertController} from '@ionic/angular';
import { BancoService } from './../banco.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage {


  public submitAttempt: boolean = false;

  constructor(private nav: NavController,public formBuilder: FormBuilder, private BancoService: BancoService, public alertController: AlertController) { }

  public loginForm:FormGroup = new FormGroup({
    'email' : new FormControl(null, [Validators.required, Validators.email]),
    'senha' : new FormControl(null, [Validators.required, Validators.minLength(2)])
  })

  
  login()
  {
    let email = (<HTMLInputElement>document.getElementById("1")).value;
    let senha = (<HTMLInputElement>document.getElementById("2")).value;
    this.BancoService.selectGenerico("SELECT * FROM usuario WHERE email='"+email+"' AND senha='"+senha+"';")
    .then(async(response)=>{
        const alert = await this.alertController.create({
          header: 'Confirmação',
          subHeader: 'Sucesso!',
          message: JSON.stringify(response),
          buttons: ['OK']
        });
        
        await alert.present();
      }
    )
    .catch(async(response)=>{

      const alert = await this.alertController.create({
        header: 'Confirmação',
        subHeader: 'Erro!',
        message: JSON.stringify(response),
        buttons: ['OK']
      });
  
      await alert.present();
    })
  }

  direcCadast()
  {
      this.nav.navigateForward('cadastro');
  }

}
