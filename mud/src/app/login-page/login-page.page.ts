import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, Renderer, ViewChild, Input} from '@angular/core';
import { NavController, AlertController, IonInput} from '@ionic/angular';
import { BancoService } from './../banco.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage {


  @ViewChild('enha')  ino: IonInput;
  @ViewChild('mail')  onu: IonInput;
  senh: string;
  emai: string;

  public submitAttempt: boolean = false;

 

  constructor(private nav: NavController,public formBuilder: FormBuilder, private BancoService: BancoService, public alertController: AlertController, private router: Router) { }

  public loginForm:FormGroup = new FormGroup({
    'email' : new FormControl(null, [Validators.required, Validators.email]),
    'senha' : new FormControl(null, [Validators.required, Validators.minLength(2)])
  })

  foca(oque: string)
  {
    if(oque == "senha")
    {
      this.senh = "";
      setTimeout(() => {
      this.ino.setFocus();
      }, 400);
    }
    else
    {
      this.emai = "";
      this.senh = "";
      setTimeout(() => {
      this.onu.setFocus();
      }, 400);
    }
  }

  login()
  {
    let email = (<HTMLInputElement>document.getElementById("1")).value;
    let senha = (<HTMLInputElement>document.getElementById("2")).value;
    this.BancoService.selectGenerico("SELECT * FROM usuario WHERE email='"+email+"';")
    .then(async(response)=>{
      if(response[0].senha == senha)
      {
          const alert = await this.alertController.create({
          header: 'Confirmação',
          subHeader: 'Sucesso!',
          message: JSON.stringify(response),
          buttons: ['OK']
        });

        await alert.present();
        this.router.navigateByUrl('/tabs/tab2');
        return;
      } 

      else if(response[0].senha != senha)
      {

          const alert = await this.alertController.create({
          header: 'Confirmação',
          subHeader: 'Erro!',
          message: 'A senha está incorreta',
          buttons:[
            {
              text: 'OK',
              handler: () => { this.foca("senha") }
            }
          ],
        });
        await alert.present();
      }
    })

    .catch(async(response)=>{

      const alert = await this.alertController.create({
        header: 'Confirmação',
        subHeader: 'Erro!',
        message: 'A conta não existe',
        buttons:  [
          {
            text: 'OK',
            handler: () => { this.foca("email") }
          }
        ],
      });
  
      await alert.present();
       })
}

  direcCadast()
  {
      this.nav.navigateForward('cadastro');
  }

}
