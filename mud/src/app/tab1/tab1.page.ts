import { NavController, IonInput } from '@ionic/angular';
import { Component, ViewChild, Input} from '@angular/core';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(public nav : NavController,public dadosService: DadosService){}

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
}
