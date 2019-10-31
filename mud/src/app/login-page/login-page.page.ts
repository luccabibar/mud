import { FCM } from '@ionic-native/fcm/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, Renderer, ViewChild, Input} from '@angular/core';
import { NavController, AlertController, IonInput} from '@ionic/angular';
import { BancoService } from './../banco.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DadosService } from '../dados.service';

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
  id: number;

  public submitAttempt: boolean = false;

  constructor(private dadosService: DadosService,private nav: NavController,public formBuilder: FormBuilder, private BancoService: BancoService, public alertController: AlertController, private router: Router, private ScreenOrientation: ScreenOrientation, private fcm:FCM) { 
    
  }

  ngOnInit()
  {
    this.lockScreenOrientation();
  }

  public loginForm:FormGroup = new FormGroup({
    'email' : new FormControl(null, [Validators.required, Validators.email]),
    'senha' : new FormControl(null, [Validators.required, Validators.minLength(2)])
  })

  async lockScreenOrientation()
  {
    
    try{
      this.ScreenOrientation.lock(this.ScreenOrientation.ORIENTATIONS.PORTRAIT);
    }
    catch(error){
      console.error(error);
    }
  }

  
  foca(oque: string) //foca na senha ou no email se estao errados
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

  login() //realiza o login
  {
    let email = (<HTMLInputElement>document.getElementById("1")).value;
    let senha = (<HTMLInputElement>document.getElementById("2")).value;
    this.BancoService.selectGenerico("SELECT * FROM usuario WHERE email='"+email+"' AND profissional=false;")
    .then(async(response)=>{

      if(response[0].senha == senha && response[0].profissional == 'f')
      {
         
            this.emai = "";
            this.senh = "";
            this.router.navigateByUrl('/tabs/tab2'); 

        // Deu certo, então salva os dados do Usuário Logado dentro do DadosService
        this.dadosService.setId(Number(response[0].id_usuario));
        this.dadosService.setNome(String(response[0].nome));
        this.dadosService.setCpf(String(response[0].cpf));
        this.dadosService.setEmail(String(response[0].email));
        this.dadosService.setCelular(String(response[0].celular));
        this.dadosService.setProfissional(Boolean(response[0].profissional));
        this.dadosService.setCrp(String(response[0].crp));
        this.dadosService.setDataNasc(String(response[0].dt_nasc));
        this.BancoService.selectGenerico("SELECT * FROM contato WHERE id_usuario='"+this.dadosService.getId()+"';")
        .then(async(response)=>{
          this.dadosService.setCont1_nome(String(response[0].nome));
          this.dadosService.setCont2_nome(String(response[1].nome));
          this.dadosService.setCont1_num(String(response[0].telefone));
          this.dadosService.setCont2_num(String(response[1].telefone));
        })

        this.fcm.getToken().then(token => {
          console.log(token);
          this.BancoService.selectGenerico("SELECT * FROM notificacao WHERE id_user="+response[0].id_usuario+";")
          .then(async(response)=>{
            this.BancoService.updateGenerico("UPDATE notificacao SET token='"+token+"' WHERE id_user="+response[0].id_usuario+";");
          })
          .catch(async(response)=>{
            this.BancoService.insertGenerico("INSERT INTO notificacao VALUES("+ response[0].id_usuario +","+"'"+token+"')" );
          });
        })

        return;
      } 
      else if(response[0].senha != senha)
      {
          const alert = await this.alertController.create({
          header: 'Senha incorreta',
          message: 'Digite a senha correta.',
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
        header: 'Email incorreto',
        message: 'Essa conta não existe!',
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
  //Direciona para a página cadastro
  direcCadast() 
  {
      this.nav.navigateForward('cadastro');
  }
  //Abre o guia do usuário
  guia()
  {
    this.nav.navigateForward('guia');
  }

}

