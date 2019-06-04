import { NavController, IonInput } from '@ionic/angular';
import { Component, ViewChild, Input} from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(public nav : NavController){}

  @ViewChild('deus')  ino: IonInput;

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
