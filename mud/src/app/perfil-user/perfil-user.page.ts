import { NavController, IonInput, AlertController } from '@ionic/angular';
import { Component, ViewChild, Input} from '@angular/core';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-perfil-user',
  templateUrl: 'perfil-user.html',
  styleUrls: ['perfil-user.page.scss']
})
export class PerfilUserPage {
  constructor(public nav : NavController,public dadosService: DadosService,public alertController: AlertController){}

  @ViewChild('deus')  ino: IonInput;

  nome = this.dadosService.getNome();
  email = this.dadosService.getEmail();
  cpf = this.dadosService.getCpf();
  celular = this.dadosService.getCelular();
  dtnasc = this.dadosService.getDataNasc();
  aa()
  {
    setTimeout(() => {
      this.ino.setFocus();
  }, 400);
  }

  relatsem()
  {
      this.nav.navigateForward('relatorio-semanal');
  }

  async editarSintomas()
  {
    
  }

  async salvarPerfil()
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
          //se clicar em alterar tem que dar o loading com sucesso ou falha na alteração
        }
      }
    ]
  });
    
    await alert.present();
  }

  async sair()
  {
    const alert = await this.alertController.create({
    header: "Fazer Logoff",
    message: "Deseja mesmo sair de sua conta?",
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancelar',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Sair',
        handler: data => {
          this.dadosService.limpaDados();
          this.nav.navigateForward('login-page');
        }
      }
    ]
  });
    
    await alert.present();
  }
}
